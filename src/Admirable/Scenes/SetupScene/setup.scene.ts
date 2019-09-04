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

    // Random ships
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(0, 20) * 40;
      const y = Phaser.Math.Between(0, 8) * 40;
      const width = Phaser.Math.Between(2, 4);
      const axis = Phaser.Math.Between(0, 1);
      const ship = new Ship(this, !axis ? 1 : width, axis ? 1 : width);
      ship._setPosition(x, y);
    }

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
