import { BoardConfig } from '../../board.config';
import { Ship } from '../Ship';
import { Notification } from '../UI/Notification';
import { Transmission } from '../Transmission';

enum EnemyEvent {
  onHit = 'onhit',
}

export class Enemy extends Phaser.GameObjects.Zone {

  public static define(transmission: Transmission, scene: Phaser.Scene, x: number, y: number, width: number, height: number): Phaser.GameObjects.Zone {
    const zone = new Enemy(transmission, scene, x, y, width, height);
    return zone;
  }

  private transmission: Transmission;

  private hitArea: Phaser.GameObjects.Graphics;

  private hitBox: Phaser.Geom.Rectangle;

  constructor(transmission: Transmission, scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);
    this.transmission = transmission;
    this.hitArea = new Phaser.GameObjects.Graphics(scene);
    this.hitBox = new Phaser.Geom.Rectangle(0, 0, BoardConfig.gridSize, BoardConfig.gridSize);

    scene.add.existing(this.hitArea);
    this.setOrigin(0);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.setInteractive();

    this.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const _x = this.snap(p.x), _y =  this.snap(p.y);
      // this.hitBox.setPosition(_x, _y);
      // this.hitArea.fillStyle(0xFF0000, 1);
      // this.hitArea.fillRectShape(this.hitBox);

      this.transmission.transmit({type: 'enemy.hit', data: {x: _x, y: _y}});
    });

    this.transmission.on('enemy.hit', (d: {x: number, y: number}) => {
      this.hitBox.setPosition(d.x - this.scene.sys.canvas.width / 2, d.y);

      const h = this.hitControl();

      this.transmission.transmit({type: 'enemy.onHit', data: {hit: h, x: d.x, y: d.y}});

      this.hitArea.fillStyle(h ? 0xFF0000 : 0x000000, 1);
      this.hitArea.fillRectShape(this.hitBox);
      console.log(d, this.hitBox);
    });

    this.transmission.on('enemy.onHit', (data: {hit: boolean, x: number, y: number}) => {
      this.hitBox.setPosition(data.x, data.y);
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

      this.transmission.transmit({type: 'enemy.cursor', data: {x: _x, y: _y}});
    });

    this.transmission.on('enemy.cursor', (d: {x: number, y: number}) => {
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

  // private registerEvents(): void {
  //   this.setInteractive();
  //   this.on('pointerdown', (p: Phaser.Input.Pointer, x: number, y: number) => {

  //     // use relative x, y
  //     // this.hit(p.x, p.y);
  //   });

  // }

  // private hit(x: number, y: number): void {
  //   // console.log(x, y);

  //   x = Math.floor( x / BoardConfig.gridSize) * BoardConfig.gridSize;
  //   y = Math.floor( y / BoardConfig.gridSize) * BoardConfig.gridSize;

  //   const _hitArea = new Phaser.Geom.Rectangle(x, y, BoardConfig.gridSize, BoardConfig.gridSize);

  //   this.hitArea.fillStyle(0x00CCFF, 1);
  //   this.hitArea.fillRectShape(_hitArea);

  //   const hit =  this.hitControl(_hitArea);

  //   this.hitArea.fillStyle(!hit ? 0x000000 : 0xFF0000, 1);
  //   this.hitArea.fillRectShape(_hitArea);

  //   const succes = ['🤗', '🤩', '😲', '😂', '🤣'];
  //   const failure = ['🤔',  '🤨', '😒', '😓', '😔', '😕'];

  //   const emoji = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  //   Notification.create(this.scene, emoji(hit ? succes : failure), 160, {backgroundColor: 'transparent', fontSize: '64px'});

  // }

  // private hitControl(area: Phaser.Geom.Rectangle): boolean {

  //   const clone = Phaser.Geom.Rectangle.Clone(area);
  //   clone.x = area.x - this.scene.sys.canvas.width / 2;

  //   const ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];
  //   const flag = ships.some((ship) => Phaser.Geom.Rectangle.Overlaps(ship.getBounds(), clone));

  //   // console.log(flag);
  //   return flag;
  // }

}
