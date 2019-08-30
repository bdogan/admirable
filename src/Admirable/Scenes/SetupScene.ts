export class SetupScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: 'SetupScene',
    });
  }

  public  init(): void {
    console.log('SetupScene initialized.');
  }

  public create(): void {
    this.grid = this.add.graphics();
    this.drawGrid();

    const back = this.add.graphics({
      fillStyle: {color: 0xCCFF00},
      lineStyle: {color: 0xFF0000, width: 2},
    });

    // tslint:disable-next-line: max-line-length
    const txt = this.add.text(128 / 2, 24 / 2, 'TEST DÜĞME', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });

    const asd: Phaser.Types.Input.InputConfiguration = {
      hitArea : new Phaser.Geom.Rectangle(0, 0, 240, 24),
      hitAreaCallback: (e: any) => {console.log(e); },
      useHandCursor: true,
    };

    const shape = new Phaser.Geom.Rectangle(0, 0, 240, 40);
    back.fillRectShape(shape);
    back.setInteractive(shape, Phaser.Geom.Rectangle.Contains);
    back.on('pointerover', () => {console.log('hovered'); });

    this.add.container(0, 0, [back, txt]);

  }

  private drawGrid() {
    const gap = 40;
    const canvasWidth = this.sys.canvas.width / 2;
    const canvasHeight = this.sys.canvas.height;

    this.grid.lineStyle(1, 0x00A8E8, 0.25);

    // Draw vertical lines through x-axis.
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
