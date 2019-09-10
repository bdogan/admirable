import { AdmirableScene } from '../admirable.scene';
import { Ship } from '../../Objects/Ship';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { BoardConfig } from '../../board.config';
import { Notification } from '../../Objects/UI/Notification';

@AdmirableScene({
  key: 'setup'
})

export class SetupScene extends Phaser.Scene {

  public init(): void {
    console.log('SetupScene initialized.');
  }

  public create(): void {
    Ship.registerSceneEvents(this);
    this.showGrid();

    // Random ships
    for (let i = 0; i < 6; i++) {

      const length = Phaser.Math.Between(2, 4);
      const vertical = !!Phaser.Math.Between(0, 1);

      const x = Phaser.Math.Between(0, 20) * BoardConfig.gridSize;
      const y = Phaser.Math.Between(0, 8) * BoardConfig.gridSize;
      const ship = new Ship(this, length, vertical, true);
      ship._setPosition(x, y, true, false);
    }

    // Deploy Button
    const bw = 160, bh = 64, bx = (this.sys.canvas.width) - (bw / 2) - 16, by = (this.sys.canvas.height) - (bh / 2) - 16;
    const button = new Button(this, 'DEPLOY', bx, by, bw, bh);
    button.text.setFontSize(32);

    button.on(MouseEvent.onClick, (e: any) => {
      if (!Ship.isPlacementValid(this)) {
        Notification.create(this, 'Placement is not valid');
        return;
      }

      const ships = (this.children.list.filter((child) => child instanceof Ship) as Ship[]).map((ship) => {
        return { x: ship.x, y: ship.y, extent: ship.extent, orthogonal: ship.orthogonal };
      });

      this.scene.start('game', { ships });
    });

    this.add.existing(button);
  }

  private showGrid() {
    const grid = this.add.graphics();

    const gap = BoardConfig.gridSize;
    const width = this.sys.canvas.width / 2;
    const height = this.sys.canvas.height;

    grid.lineStyle(1, 0x00A8E8, 0.25);

    // Draw vertical lines through half of the x-axis.
    for (let x = 0, column = (width / gap); x < column; x++) {
      const dX = (x * gap);
      grid.lineBetween(dX, 0, dX, width);
    }

    // Draw horizontal lines through y-axis.
    for (let y = 0, row = (height / gap); y < row; y++) {
      const dY = (y * gap);
      grid.lineBetween(0, dY, width, dY);
    }
    // midline
    grid.lineStyle(1, 0x00A8E8, 1);
    grid.lineBetween(width, 0, width, height);

    grid.strokePath();
  }
}
