import { AdmirableScene } from '../admirable.scene';
import { BoardConfig } from '../../board.config';
import { Dock } from '../../Objects/Ship';
import { Cursor } from '../../Objects/UI/Cursor';
import { Enemy } from '../../Objects/Enemy';
import { Notification } from '../../Objects/UI/Notification';
import { Transmission } from '../../Objects/Transmission';
import { player } from '../../Objects/Player';
import { gameState, Turn } from '../../Objects/GameState';

const transmission = Transmission.getInstance();

@AdmirableScene({
  key: 'game'
})

export class GameScene extends Phaser.Scene {

  private scoreLabel!: Phaser.GameObjects.Text;

  public init(data: any): void {
    this.scoreLabel = new Phaser.GameObjects.Text(this, 10, this.sys.canvas.height - 25, 'Life: ' + player.life, {
      fontFamily: 'Munro',
      fontSize: '20px',
      color: '#FFFFFF'
    });

    this.add.existing(this.scoreLabel);

    console.log('GameScene initialized.');
    console.log('passed data: ', data);
  }

  public create(data: any): void {

    player.scene = this;
    player.dock.build(data.exported);

    const ew = this.sys.canvas.width / 2, eh = this.sys.canvas.height;
    const e = Enemy.define(this, ew, 0, ew, eh);

    this.showGrid();
    Cursor.attach(this);
    this.showScore();

    transmission.once('game.end', () => {
      Notification.create('Game Over! You\'ll be directed to setup.', 2000);
      setTimeout(() => {
        // this.scene.stop();
        e._clear();
        this.scene.stop();
        this.scene.start('setup');
      }, 2000);

      // transmission.off('game.end');
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

  private showScore() {
    transmission.on('score.update', () => {
      this.scoreLabel.setText('Life: ' + player.life.toString());

      if (player.life === 0) {
        transmission.sync({type: 'game.end'});
      }

    });

  }
}
