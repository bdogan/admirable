import { Button } from '../../Objects/Button';
import { AdmirableScene } from '../admirable.scene';
const logoImg = require('./Images/admirable-logotype.png');
const battleshipImg = require('./Images/battleship.png');

@AdmirableScene({
  key: 'menu'
})
export class MenuScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;

  private imgBattleShip?: any;
  private battleShipAngle: number = 0;
  private imgLogo?: any;
  private easeRate: number = 0.10;
  private gridOptions: any = {
    animate: true,
    frequency: 50,
    shiftY: -150,
  };
  private gridGraphics!: any;
  private gridAngle: number = 0;

  constructor() {
    super({
      key: 'MenuScene',
    });
  }

  public preload() {
    this.load.image('logo', logoImg);
    this.load.image('battleship', battleshipImg);
  }

  public init(): void {
    console.log('MenuScene initialized');
  }

  public create(): void {
    this.grid = this.add.graphics();
    this.imgBattleShip = this.add.image(-8, this.sys.game.canvas.height, 'battleship');
    this.imgBattleShip.setOrigin(0, 1);

    this.imgLogo = this.add.image(0, 0, 'logo');
    this.imgLogo.x = this.sys.game.canvas.width / 2;
    this.imgLogo.y = -1 * this.imgLogo.height;

    this.gridGraphics = this.add.graphics();

    const button = new Button(this, 0, 0);
    button.onClick = () => {
      this.scene.start('GameScene');
    };
  }

  public update(time: number): void {
    this.drawHorizon(time);
    // const deltaY = Math.round((this.sys.game.canvas.height / 3) - (this.imgLogo.height / 2) - this.imgLogo.y);
    // this.imgLogo.y += deltaY * this.easeRate;

    // this.imgBattleShip.y = this.imgBattleShip.y + Math.sin(this.battleShipAngle) / 2;
    // this.battleShipAngle = (this.battleShipAngle + (Math.PI * 2) / 60) % (Math.PI * 2);
    // this.imgBattleShip.angle = Math.PI;

    // this.gridGraphics.lineStyle(2, 0x00FFFF, 1.0);
    // this.gridGraphics.fillStyle(0x000000, 1.0);
    // this.gridGraphics.fillRect(this.gridGraphics.width, this.gridGraphics.height);

    // this.perspectiveGrid(this.gridAngle);

    // this.gridAngle = (this.gridAngle
    // + ((Math.PI * 2) / this.sys.game.canvas.width)
    // % (Math.PI * 2));
  }

  private perspectiveGrid(angle: number): void {
    const width = this.sys.game.canvas.width;
    const da = (Math.PI * 2) / 2;

    for (let i = 0; i < width / 4; i++) {
      const x1 = (i * 4),
      y1 = 0,
        x2 = x1,
        y2 = this.gridOptions.shiftY + Math.tan(angle) * this.gridOptions.frequency;

      this.gridGraphics.lineStyle(2, 0x00FFFF, 1);
      this.gridGraphics.moveTo(0, y2);
      this.gridGraphics.beginPath();
      this.gridGraphics.lineTo(width, y2);
      this.gridGraphics.closePath();

      angle = (angle + da) % (Math.PI / 2);
    }
  }

  private drawHorizon(a: number) {

    let dt = a / 100000;
    const width   = this.sys.canvas.width,
          height  = this.sys.canvas.height;

    const TWO_PI = Phaser.Math.PI2;
    const dA = TWO_PI / width;

    this.grid.clear();

    this.grid.lineStyle(1, 0x00A8E8, 0.5);
    for (let line = 0, lines = height ; line < lines; line++) {

      const x1 = (line * 4), y1 = 0, x2 = x1, y2 = -200 + Math.tan(dt) * 50;
      this.grid.lineBetween(0, y2, width, y2);
      dt = (dt + dA);
    }

    this.grid.strokePath();

}

}
