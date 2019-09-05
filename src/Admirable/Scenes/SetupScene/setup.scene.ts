import { AdmirableScene } from '../admirable.scene';
import { Ship } from '../../Objects/Ship/ship.object';
import { Button } from '../../Objects/UI/Button';

@AdmirableScene({
  key: 'setup'
})
export class SetupScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;

  public  init(): void {
    console.log('SetupScene initialized.');
  }

  public create(): void {
    this.grid = this.add.graphics();
    this.drawGrid();

    // Random ships
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, 20) * 32;
      const y = Phaser.Math.Between(0, 8) * 32;
      const width = Phaser.Math.Between(2, 4);
      const axis = Phaser.Math.Between(0, 1);
      const ship = new Ship(this, !axis ? 1 : width, axis ? 1 : width);
      ship._setPosition(x, y);
    }

    // just run once after all of the ships created for the demo.
    this._checkOverlap();

    const bw = 160, bh = 60, bx = (this.sys.canvas.width) - (bw / 2) - 16, by = (this.sys.canvas.height) - (bh / 2) - 16;
    const button = new Button(this, 'DEPLOY', bx, by, bw, bh );
    button.text.setFontSize(32);
    this.add.existing(button);

  }

  private drawGrid() {
    const gap = 32;
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

  // Check collide on scene.
  private _checkOverlap(): void {
    const Ships = this.children.list.filter((child) => child instanceof Ship);

    Ships.forEach((ship) => {
      const _ships = Ships.filter((s) => s !== ship);

      for (const s of _ships as Ship[]) {
        const intersection = Phaser.Geom.Intersects.RectangleToRectangle(s.anchor, (ship as Ship).anchor);
        if (intersection) {
          (ship as Ship).allowedArea.fillColor = 0xFF0000;
          break;
        } else {
          (ship as Ship).allowedArea.fillColor = 0x00FF00;
        }
      }
    });
  }

}
