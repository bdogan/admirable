import { BoardConfig } from '../../board.config';
import { Notification } from '../UI/Notification';
import { transmission } from '../Transmission';
import { gameState, Turn } from '../GameState';
import { player } from '../Player';
import { Cursor } from '../UI/Cursor';

interface IPoint {x: number; y: number; }
interface IOnHit {hit: boolean; point: IPoint; }

export class Enemy extends Phaser.GameObjects.Zone {

  public static define(scene: Phaser.Scene, x: number, y: number, width: number, height: number): Enemy {
    const zone = new Enemy(scene, x, y, width, height);
    return zone;
  }

  // Collection of the previously hitted grid area's.
  private hittedArea: IPoint[] = [];

  // Graphic object to show hitted areas on the scren.
  private hitArea: Phaser.GameObjects.Graphics;

  // Hitting object.
  private hitBox: Phaser.Geom.Rectangle;

  private offset: number = this.scene.sys.canvas.width / 2;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);
    this.hitArea = new Phaser.GameObjects.Graphics(scene);
    this.hitBox = new Phaser.Geom.Rectangle(0, 0, BoardConfig.gridSize, BoardConfig.gridSize);

    scene.add.existing(this.hitArea);
    this.setOrigin(0);

    this.registerEvents();
  }

  public _clear() {
    // this.destroy();
    // this.hitArea.clear();
    // transmission.off('enemy.hit');
    // transmission.off('player.onHit');
    // this.off('pointerdown');
    // this.hittedArea = [];

    // The 4 row below is doesn't work as intended.
    // transmission.removeListener('enemy.hit');
    // transmission.removeListener('player.onHit');
    // transmission.removeAllListeners('enemy.hit');
    // transmission.removeAllListeners('player.onHit');
    // and this works but using this removes all listeners.
    transmission.removeAllListeners();
    this.hitArea.clear();
    this.hittedArea = [];
    this.scene.children.remove(this);
  }

  private registerEvents(): void {
    this.setInteractive();

    this.on('pointerdown', (p: Phaser.Input.Pointer) => {
      if (gameState.turn !== Turn.player) {
        Notification.create('It\'s not your Turn.', 900);
        return;
      }

      const hitPoint = { x: this.snap(p.x), y: this.snap(p.y) } as IPoint;

      // Determinate if the area hitted before.
      const isHittedBefore = this.hittedArea.some((h) => h.x === hitPoint.x && h.y === hitPoint.y);

      if (isHittedBefore) {
        Notification.create('You\'ve already hitted that area.', 350);
        return;
      }

      this.hittedArea.push(hitPoint);

      // Player hitted the enemy zone.
      transmission.transmit({ type: 'enemy.hit', data: hitPoint });
    });

    // Enemy zone emits the hit.
    transmission.on('enemy.hit', (data: IPoint) => {
      this.hitBox.setPosition(data.x - this.offset, data.y);

      // Enemy checks the hit.
      const hit = this.hitControl();

      // Enemy sends the hit result back to the player.
      transmission.transmit({ type: 'player.onHit', data: {hit, point: data} as IOnHit });

      // Draw hitted area according to hit result.
      this.hitArea.fillStyle(hit ? 0xFF0000 : 0x000000, 1);
      this.hitArea.fillRectShape(this.hitBox);

      // If hit happened shake the enemy's screen.
      if (hit) {
        this.scene.cameras.main.shake(200, 0.02, true);
      }

      // If miss, change the turn at the both sides.
      if (!hit) {
        transmission.sync({type: 'game.changeTurn'});
      }
    });

    // Player's onHit method to draw rectangle according to hit result.
    transmission.on('player.onHit', (data: IOnHit) => {
      this.hitBox.setPosition(data.point.x, data.point.y);
      this.hitArea.fillStyle(data.hit ? 0xFF0000 : 0x000000, 1);
      this.hitArea.fillRectShape(this.hitBox);

      if (data.hit) {
        this.scene.cameras.main.shake(200, 0.01, true);
      }

    });

    this.enemyCursor();
  }

  private hitControl(): boolean {
    // console.log('called once');
    const ship = player.dock.ships.find((_ship) => Phaser.Geom.Rectangle.Overlaps(_ship.getBounds(), this.hitBox));

    let hit = false;

    if (ship) {
      ship.life--;
      hit = true;
      transmission.emit('score.update');

      // Sends the player's score to the enemy.
      // transmission.transmit({type: 'enemy.score', data: {life: player.life}});
      // Notification.create(player.life.toString(), 200);
    }

    return hit;
  }

  /**
   * Shows enemy cursor on the scene.
   */
  private enemyCursor(): void {
    // Create an uninteractive cursor for the enemy.
    const cursor = Cursor.attach(this.scene, false);

    // Set cursor style.
    cursor.shape.setStrokeStyle(3, 0xFF0000, 1);

    // Store the last valid X and Y.
    let last_x = 0, last_y = 0;

    this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      const _x = this.snap(p.x), _y = this.snap(p.y);

      // No need to transmit the pointer position if there is no change.
      const isChanged = !!((last_x - _x) || (last_y - _y));
      if ( !isChanged ) {
        return;
      }

      last_x = _x;
      last_y = _y;

      // Send the pointer position to the otherside of the wire.
      transmission.transmit({ type: 'enemy.cursor', data: { x: _x, y: _y } as IPoint });
    });

    // Change cursor's position.
    transmission.on('enemy.cursor', (d: IPoint) => {
      // Translate the x value to be valid according to enemy.
      const _x = (d.x + this.offset) % (this.offset * 2);
      cursor._setPosition(_x, d.y);
    });
  }

  private snap(v: number): number {
    return Math.floor(v / BoardConfig.gridSize) * BoardConfig.gridSize;
  }

  //   const succes = ['🤗', '🤩', '😲', '😂', '🤣'];
  //   const failure = ['🤔',  '🤨', '😒', '😓', '😔', '😕'];

  //   const emoji = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  //   Notification.create(this.scene, emoji(hit ? succes : failure), 160, {backgroundColor: 'transparent', fontSize: '64px'});

  // }

}
