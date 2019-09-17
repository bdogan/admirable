import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { BoardConfig } from '../../board.config';
import { Notification } from '../../Objects/UI/Notification';
import { Cursor } from '../../Objects/UI/Cursor';
import { Dock, IExport } from '../../Objects/Ship';
import { Transmission } from '../../Objects/Transmission';
import { IPayload } from '../../Objects/Transmission/transmission.object';
import { Player, player } from '../../Objects/Player';

const transmission = Transmission.getInstance();

const shipTopImg = require('../../Objects/Ship/Images/ship_top.png');
const shipMiddleImg = require('../../Objects/Ship/Images/ship_middle.png');
const shipBottomImg = require('../../Objects/Ship/Images/ship_bottom.png');

@AdmirableScene({
  key: 'setup'
})

export class SetupScene extends Phaser.Scene {

  private isEnemyReady: boolean = false;
  private readyClicked: boolean = false;

  private readyButton!: Button;

  public init(): void {
    console.log('SetupScene initialized.');

    transmission.on('enemy.ready', () => {
      Notification.create(this, 'Enemy is ready.');
      this.isEnemyReady = true;
      console.log(this.isEnemyReady);
      if (this.readyClicked) {
        this.readyButton.emit('player.ready');
      }
    });
  }

  public preload(): void {
    this.load.image('ship_top', shipTopImg);
    this.load.image('ship_middle', shipMiddleImg);
    this.load.image('ship_bottom', shipBottomImg);
  }

  public create(): void {
    this.showGrid();

    const startX = 550, startY = 100;
    const starterShips: IExport[] = [
      {x: startX + 4 * 32, y: startY + 0,      extent: 5, orthogonal: true},
      {x: startX + 0,      y: startY + 0,      extent: 4, orthogonal: true},
      {x: startX + 0,      y: startY + 5 * 32, extent: 4, orthogonal: true},
      {x: startX + 2 * 32, y: startY + 0,      extent: 3, orthogonal: true},
      {x: startX + 4 * 32, y: startY + 6 * 32, extent: 3, orthogonal: true},
      {x: startX + 2 * 32, y: startY + 4 * 32, extent: 2, orthogonal: true},
      {x: startX + 2 * 32, y: startY + 7 * 32, extent: 2, orthogonal: true},
    ];

    // set player's scene.
    player.scene = this;

    // Build player's ship with the starterShip array in setup mode.
    player.dock.build(starterShips, true);

    // Deploy Button
    const bw = 160, bh = 64, bx = (this.sys.canvas.width) - (bw / 2) - 16, by = (this.sys.canvas.height) - (bh / 2) - 16;

    this.readyButton = new Button(this, 'READY', bx, by, bw, bh);

    this.readyButton.text.setFontSize(32);

    this.readyButton.on('player.ready', () => {
      // const player = Player.getInstance(0, dock.ships.length);
      this.scene.start('game', {exported: player.dock.export()});
    });

    this.readyButton.on(MouseEvent.onClick, (e: any) => {

      if (!player.dock.isPlacementValid) {
        Notification.create(this, 'Placement is not valid!');
        return;
      }

      this.readyClicked = true;
      this.readyButton.disable();

      // transmission.transmit({type: 'enemy.ready'} as IPayload);

      // if (!this.isEnemyReady) {
      //   Notification.create(this, 'Enemy is not ready!');
      //   return;
      // }

      this.readyButton.emit('player.ready');
    });

    this.add.existing(this.readyButton);

    // Shuffle button.
    const shuffle =  new Button(this, 'Shuffle', bx, by - bh - 32, bw, bh);
    shuffle.text.setFontSize(32);

    shuffle.on(MouseEvent.onClick, () => {
      player.dock.randomizePlacement(true);
    });

    this.add.existing(shuffle);

    // Attach custom cursor to the scene.
    Cursor.attach(this);
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
