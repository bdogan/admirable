import { AdmirableScene } from '../admirable.scene';
import { Ship } from '../../Objects/Ship/ship.object';

@AdmirableScene({
  key: 'setup'
})
export class SetupScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;

  private ships: Ship[] = [];

  public  init(): void {
    console.log('SetupScene initialized.');
  }

  public create(): void {
    this.grid = this.add.graphics();
    this.drawGrid();

    const s1 = new Ship(this, 1, 3);

    const s2 = new Ship(this, 3, 1);

    const s3 = new Ship(this, 2, 1);

    this.ships = [s1, s2];

  }

  public update(): void {
    this.ships.forEach((ship) => {
      // ship.bounds
    });
  }

  private drawGrid() {
    const gap = 40;
    const canvasWidth = this.sys.canvas.width / 2;
    const canvasHeight = this.sys.canvas.height;

    this.grid.lineStyle(1, 0x00A8E8, 0.25);

    // Draw vertical lines through half of the x-axis.
    for (let x = 0, column = (canvasWidth / gap); x < column; x++) {
      const dX = (x * gap);
      this.grid.lineBetween(dX, 0, dX, canvasWidth);
    }

    // Draw horizontal lines through y-axis.
    for (let y = 0, row = (canvasHeight / gap); y < row; y++) {
      const dY = (y * gap);
      this.grid.lineBetween(0, dY, canvasWidth, dY);
    }
    // midline
    this.grid.lineStyle(1, 0x00A8E8, 1);
    this.grid.lineBetween(canvasWidth, 0, canvasWidth, canvasHeight);

    this.grid.strokePath();
  }

}
