import { BoardConfig } from '../../board.config';
import { Ship } from '../Ship';
import { Notification } from '../UI/Notification';
import { transmission } from '../Transmission';
import { gameState } from '../GameState/gameState.object';

export class Enemy extends Phaser.GameObjects.Zone {

  public static define(scene: Phaser.Scene, x: number, y: number, width: number, height: number): Phaser.GameObjects.Zone {
    const zone = new Enemy(scene, x, y, width, height);
    return zone;
  }

  private hitArea: Phaser.GameObjects.Graphics;

  private hitBox: Phaser.Geom.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);
    this.hitArea = new Phaser.GameObjects.Graphics(scene);
    this.hitBox = new Phaser.Geom.Rectangle(0, 0, BoardConfig.gridSize, BoardConfig.gridSize);

    scene.add.existing(this.hitArea);
    this.setOrigin(0);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.setInteractive();

    this.on('pointerdown', (p: Phaser.Input.Pointer, x: number, y: number) => {

      if (!gameState.turn) {
        return;
      }

      const _x = this.snap(x), _y =  this.snap(y);
      transmission.transmit({type: 'enemy.hit', data: {x: _x, y: _y}});
    });

    transmission.on('enemy.hit', (d: {x: number, y: number}) => {
      console.log(gameState);
      this.hitBox.setPosition(d.x, d.y);

      const h = this.hitControl();

      transmission.transmit({type: 'enemy.onHit', data: {hit: h, x: d.x, y: d.y}});

      this.hitArea.fillStyle(h ? 0xFF0000 : 0x000000, 1);
      this.hitArea.fillRectShape(this.hitBox);

      if (!h) {
        // gameState.turn = false;
        // transmission.transmit({type: 'enemy.turn'});
      }

      // console.log(d, this.hitBox);
    });

    transmission.on('enemy.onHit', (data: {hit: boolean, x: number, y: number}) => {
      this.hitBox.setPosition(data.x + this.scene.sys.canvas.width / 2, data.y);
      this.hitArea.fillStyle(data.hit ? 0xFF0000 : 0x000000, 1);
      this.hitArea.fillRectShape(this.hitBox);
    });

    // digusting cursor:
    const k = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, BoardConfig.gridSize, BoardConfig.gridSize).setOrigin(0);
    k.setStrokeStyle(3, 0xFF0000, 1);
    this.scene.add.existing(k);
    let s_x = 0, s_y = 0;
    this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      const _x = this.snap(p.x), _y = this.snap(p.y);

      const isChanged = !!((s_x - _x) || (s_y - _y));

      if (!isChanged) {
        return;
      }

      s_x = _x;
      s_y = _y;

      transmission.transmit({type: 'enemy.cursor', data: {x: _x, y: _y}});
    });

    transmission.on('enemy.cursor', (d: {x: number, y: number}) => {
      let _x = d.x;
      const _y = d.y;
      if (d.x >= this.scene.sys.canvas.width / 2) {
        _x = d.x - this.scene.sys.canvas.width / 2;
      } else {
        _x = d.x +  this.scene.sys.canvas.width / 2;
      }

      k.setPosition(_x, _y);
    });

  }

  private hitControl(): boolean {
    const c = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];

    const hit = c.some((ship) => Phaser.Geom.Rectangle.Overlaps(ship.getBounds(), this.hitBox));

    return hit;
  }

  private snap(v: number): number {
    return Math.floor(v / BoardConfig.gridSize) * BoardConfig.gridSize;
  }

  //   const succes = ['🤗', '🤩', '😲', '😂', '🤣'];
  //   const failure = ['🤔',  '🤨', '😒', '😓', '😔', '😕'];

  //   const emoji = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  //   Notification.create(this.scene, emoji(hit ? succes : failure), 160, {backgroundColor: 'transparent', fontSize: '64px'});

}
