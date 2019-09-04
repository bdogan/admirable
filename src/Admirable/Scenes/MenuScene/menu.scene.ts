import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
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

  public preload() {
    this.load.image('logo', logoImg);
    this.load.image('battleship', battleshipImg);
  }

  public init(): void {
    console.log('MenuScene initialized');
  }

  public create(): void {
    this.grid = this.add.graphics();
    this.imgBattleShip = this.add.image(0, this.sys.game.canvas.height + 20, 'battleship');
    this.imgBattleShip.setOrigin(0, 1);

    this.imgLogo = this.add.image(0, 0, 'logo');
    this.imgLogo.setPosition(this.sys.canvas.width / 2 , -this.imgLogo.height);
    this.gridGraphics = this.add.graphics();

    this.tweens.add({
      targets: this.imgBattleShip,
      y: this.sys.game.canvas.height + 50,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,
      loop: -1
    });

    this.tweens.add({
      targets: [this.imgLogo],
      y: {
        getStart: () => 0,
        getEnd: () => this.sys.canvas.height / 4
      },
      alpha: {
        getStart: () => 0,
        getEnd: () => 1
      },
      ease: 'Expo.easeOut',
      duration: 2000
    });

    const startButton =  new Button(this, 'START', 960 / 2, 480 / 2);

    this.add.existing(startButton);

    startButton.on(MouseEvent.onClick, (e: any) => {
      this.scene.start('demo');
    });

  }

  public update(time: number): void {
    this.drawHorizon(time);
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
