import { AdmirableScene } from '../admirable.scene';
import { BoardConfig } from '../../board.config';
import { Dock } from '../../Objects/Ship';
import { Cursor } from '../../Objects/UI/Cursor';
import { Enemy } from '../../Objects/Enemy';
import { Notification } from '../../Objects/UI/Notification';
import { Transmission } from '../../Objects/Transmission';
import { player } from '../../Objects/Player';
import { gameState, Turn } from '../../Objects/GameState';
const notNowCursor = require('../../../Assets/Cursors/not-now.png');
const alrightThenCursor = require('../../../Assets/Cursors/alright-then.png');

const transmission = Transmission.getInstance();

@AdmirableScene({
  key: 'game'
})

export class GameScene extends Phaser.Scene {

  private lifeLabel!: Phaser.GameObjects.Text;
  private indicator!: Phaser.GameObjects.Rectangle;

  public init(data: any): void {
    // const flag = gameState.turn === Turn.player;
    // console.log(flag);
    // this.input.setDefaultCursor('url("' + flag ? alrightThenCursor : notNowCursor + '") 11 11, pointer');

    this.lifeLabel = new Phaser.GameObjects.Text(this, 13, this.sys.canvas.height - 60, '', {
      fontFamily: 'Munro',
      fontSize: '20px',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 3,
    });
    this.lifeLabel.setText(`Score: ${gameState.playerScore} - ${gameState.enemyScore}\nLife: ${player.life.toString()}`);

    console.log('GameScene initialized.');
    console.log('passed data: ', data);
  }

  public create(data: any): void {

    player.scene = this;
    player.dock.build(data.exported);

    const ew = this.sys.canvas.width / 2, eh = this.sys.canvas.height;
    const enemy = Enemy.define(this, ew, 0, ew, eh);
    this.showGrid();
    Cursor.attach(this);
    this.showScore();

    transmission.once('game.end', () => {
      // prevent any input for enemy zone.
      enemy.input.enabled = false;

      // set ready statuses false for setup
      gameState.isEnemyReady = false;
      gameState.isPlayerReady = false;

      // determinate if the player lose the game.
      const lose: boolean = player.life === 0;

      Notification.create(lose ? 'YOU LOSE' : 'YOU WIN', 1000);

      // if the player lost increase the local enemy score by one. Or increase the player score by one.
      if (lose) {
        gameState.enemyScore++;
      } else {
        gameState.playerScore++;
      }

      // Redirect players to the setup scene to preparing for another game.
      setTimeout(() => {
        // clear the enemy zone and remove all transmission events.
        enemy._clear();
        this.scene.stop();
        this.scene.start('setup');
      }, 1000);

    });

    if (gameState.turn === Turn.player) {
      Notification.create('You\'re going first.', 800);
    } else {
      Notification.create('You\'re going second.', 800);
    }

    transmission.on('game.changeTurn', () => {
      if (gameState.turn === Turn.player) {
        Notification.create('Maybe Next Time?', 800);
        gameState.turn = Turn.enemy;
        this.input.setDefaultCursor('url("' + notNowCursor + '") 11 11, pointer');
      } else {
        Notification.create('It\'s Your Time To Shine!', 800);
        gameState.turn = Turn.player;
        this.input.setDefaultCursor('url("' + alrightThenCursor + '") 11 11, pointer');
      }

      this.changeTurnIndicator();

    });

    this.initTurnIndicator();

    this.add.existing(this.lifeLabel);
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
      this.lifeLabel.setText(`Score: ${gameState.playerScore} - ${gameState.enemyScore} \n Life: ${player.life.toString()}`);

      if (player.life === 0) {
        transmission.sync({type: 'game.end'});
      }

    });

  }

  private initTurnIndicator() {
    const strokeWeight = 8;
    // this.indicator = this.add.rectangle(strokeWeight / 2, strokeWeight / 2, (this.sys.canvas.width / 2) - strokeWeight / 2, this.sys.canvas.height - strokeWeight).setOrigin(0);
    this.indicator = this.add.rectangle(strokeWeight / 2, strokeWeight / 2, (this.sys.canvas.width) - strokeWeight, this.sys.canvas.height - strokeWeight).setOrigin(0);
    this.indicator.setStrokeStyle(strokeWeight);

    // call once to determinate.
    this.changeTurnIndicator();

    this.tweens.add({
      targets: this.indicator,
      duration: 280,
      yoyo: true,
      repeat: -1,
      ease: 'Sine',
      alpha: {
        getStart: () => 1,
        getEnd: () => 0.4,
      },
    });
  }

  private changeTurnIndicator() {
    const flag = gameState.turn === Turn.player;
    this.indicator.strokeColor = flag ? 0x00FF00 : 0xFF0000;
    // this.indicator.setX(flag ? 4 : (this.sys.canvas.width / 2));
  }

}
