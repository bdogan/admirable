import { AdmirableScene } from '../admirable.scene';
import { BoardConfig } from '../../board.config';
import { Ship } from '../../Objects/Ship';

@AdmirableScene({
  key: 'game'
})
export class GameScene extends Phaser.Scene {

  public init(data: any): void {
    console.log('GameScene initialized.');
    console.log('passed data: ', data);
  }

  public create(data: any): void {
    this.showGrid();

    data.ships.forEach((s: Ship) => {
      // console.log(ship);
      const ship = new Ship(this, s.extent, s.orthogonal);
      ship._setPosition(s.x, s.y);
      this.add.existing(ship);
    });

    const hitBox = this.add.graphics({
      fillStyle: {
        color: 0xCCCCCC
      }
    });

    this.input.on('pointerdown', (pointer: any) => {
      const ships = this.children.list.filter((child) => child instanceof Ship) as Ship[];

      let  x = pointer.x, y = pointer.y;
      // Floor is better than round in this situation.
      x = Math.floor(x / BoardConfig.gridSize) * BoardConfig.gridSize;
      y = Math.floor(y / BoardConfig.gridSize) * BoardConfig.gridSize;

      const hitArea = new Phaser.Geom.Rectangle(x, y, 32, 32);
      const hit = ships.some((ship) => Phaser.Geom.Rectangle.Overlaps(ship.getBounds(), hitArea));

      hitBox.fillStyle(hit ? 0xFF0000 : 0xCCCCCC, 1);

      hitBox.fillRectShape(hitArea);
      console.log(pointer);
    });

  }

  private showGrid() {

    const grid = this.add.graphics();

    const gap = BoardConfig.gridSize;
    const width = this.sys.canvas.width ;
    const height = this.sys.canvas.height;

    grid.lineStyle(1, 0x00A8E8, 0.25);

    // Draw vertical lines through x-axis.
    for (let x = 0, column = (width / gap); x < column; x++) {
      const dX = (x * gap);
      grid.lineBetween(dX, 0, dX, width);
    }

    // Draw horizontal lines through y-axis.
    for (let y = 0, row = (height / gap); y < row; y++) {
      const dY = (y * gap);
      grid.lineBetween(0, dY, width, dY);
    }

    // Draw middle line;
    grid.lineStyle(1, 0x00A8E8, 1);
    grid.lineBetween(width / 2, 0, width / 2, height);

    grid.strokePath();
  }
}
