import { AdmirableScene } from '../admirable.scene';
import { BoardConfig } from '../../board.config';
import { Dock } from '../../Objects/Ship';
import { Cursor } from '../../Objects/UI/Cursor';
import { Enemy } from '../../Objects/Enemy';
import { Notification } from '../../Objects/UI/Notification';
import { Transmission } from '../../Objects/Transmission';
import { player } from '../../Objects/Player';

const transmission = Transmission.getInstance();

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

    player.scene = this;
    player.dock.build(data.exported);

    const scoreLabel = new Phaser.GameObjects.Text(this, 10, this.sys.canvas.height - 25, 'Score: ' + player.life, {
      fontFamily: 'Munro',
      fontSize: '20px',
      color: '#FFFFFF'
    });

    this.add.existing(scoreLabel);

    const ew = this.sys.canvas.width / 2, eh = this.sys.canvas.height;
    Enemy.define(transmission, this, ew, 0, ew, eh);

    Cursor.attach(this);
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
