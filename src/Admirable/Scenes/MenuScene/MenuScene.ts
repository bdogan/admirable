import { Button } from '../../Objects/Button';

export class MenuScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;
  private t: number = 0;
  constructor() {
    super({
      key: 'MenuScene',
    });
  }

  public init(): void {
    console.log('MenuScene initialized');
  }

  public create(): void {

    this.grid = this.add.graphics();
    // this.grid.lineStyle(0x000000, 1);
    // this.drawHorizon(1);

    const startButton = new Button(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2);
    startButton.onClick = (e) => {
      console.log(e);
      this.scene.start('GameScene');
    };

  }

  public update(time: number, delta: number) {
    // console.log(time, delta);
    this.drawHorizon(time);
    // this.t = this.t + 1 / 100 * (delta / 1000);
  }

  public drawHorizon(a: number) {

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
