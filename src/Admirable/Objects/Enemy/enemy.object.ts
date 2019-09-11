import { BoardConfig } from '../../board.config';
import { Ship } from '../Ship';
import { Notification } from '../UI/Notification';

export class Enemy extends Phaser.GameObjects.Zone {

  public static define(scene: Phaser.Scene, x: number, y: number, width: number, height: number): Phaser.GameObjects.Zone {
    const zone = new Enemy(scene, x, y, width, height);
    return zone;
  }

  private hitArea: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);

    this.hitArea = new Phaser.GameObjects.Graphics(scene);

    scene.add.existing(this.hitArea);
    this.setOrigin(0);

    this.registerEvents();
  }

  private registerEvents(): void {
    this.setInteractive();
    this.on('pointerdown', (p: Phaser.Input.Pointer, x: number, y: number) => {
      this.hit(p.x, p.y);
    });
  }

  private hit(x: number, y: number): void {
    console.log(x, y);

    x = Math.floor( x / BoardConfig.gridSize) * BoardConfig.gridSize;
    y = Math.floor( y / BoardConfig.gridSize) * BoardConfig.gridSize;

    const _hitArea = new Phaser.Geom.Rectangle(x, y, BoardConfig.gridSize, BoardConfig.gridSize);

    this.hitArea.fillStyle(0x00CCFF, 1);
    this.hitArea.fillRectShape(_hitArea);

    const hit =  this.hitControl(_hitArea);

    this.hitArea.fillStyle(!hit ? 0x000000 : 0xFF0000, 1);
    this.hitArea.fillRectShape(_hitArea);

    const succes = ['🤗', '🤩', '😲', '😂', '🤣'];
    const failure = ['🤔',  '🤨', '😒', '😓', '😔', '😕'];

    const emoji = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    Notification.create(this.scene, emoji(hit ? succes : failure), 160, {backgroundColor: 'transparent', fontSize: '64px'});

  }

  private hitControl(area: Phaser.Geom.Rectangle): boolean {

    const clone = Phaser.Geom.Rectangle.Clone(area);
    clone.x = area.x - this.scene.sys.canvas.width / 2;

    const ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];
    const flag = ships.some((ship) => Phaser.Geom.Rectangle.Overlaps(ship.getBounds(), clone));

    // console.log(flag);
    return flag;
  }

}
