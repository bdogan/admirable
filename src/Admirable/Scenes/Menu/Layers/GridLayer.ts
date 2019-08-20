import { Layer } from '../../../../Engine/Layer';
import { ISprite } from '../../../../Engine/ISprite';
import { Graphics } from 'p5';
import { transcode } from 'buffer';

export class GridLayer extends Layer {

  // private static instance: GridLayer;

  // static get getInstance(): GridLayer {
  //   if (!GridLayer.instance) {
  //     GridLayer.instance = new GridLayer();
  //   }
  //   return GridLayer.instance;
  // }

  private angle: number = 0;

  private gridSprite: ISprite;
  private gridGraphics: Graphics;
  private gridOptions: any = {
    animate: true,
    frequency: 50,
    shiftY: -150,
  };

  public constructor(animate: boolean = true, frequency: number = 50, shiftY: number = -150) {
    // parent call
    super();

    // Grid Options
    this.gridOptions.animate = animate;
    this.gridOptions.frequency = frequency;
    this.gridOptions.shiftY = shiftY;
    // Create grid sprite
    this.gridGraphics = this.createGraphics(this.screen.dimensions.width, this.screen.dimensions.height);
    this.gridSprite = {
      graphics: this.gridGraphics,
      x: 0,
      y: 0,
    };

    // Add sprite to registry
    this.addSprite(this.gridSprite);
  }

  public update(): void {
    this.gridGraphics.background(0, 25);
    this.gridGraphics.stroke(0, 255, 255, 50);

    this.perspectiveGrid(this.angle);
    // can't use this.gridGraphics.deltaTime here.
    this.angle = this.angle + (this.p.deltaTime / 100000);
  }

  /**
   * Creates horizontal lines with given angle.
   * @param angle angle at a specific time.
   */
  private perspectiveGrid(angle: number) {
    const width = this.screen.dimensions.width;
    const da = this.gridGraphics.TWO_PI / width;

    for (let i = 0; i < width / 4; i++) {
      const x1 = (i * 4),
            y1 = 0,
            x2 = x1,
            y2 = this.gridOptions.shiftY + this.gridGraphics.tan(angle) * this.gridOptions.frequency;

      // Debug graphic;
      // this.gridGraphics.line(x1, y1, x2, y2);

      // Perspectve lines
      this.gridGraphics.line(0, y2, width, y2);

      angle = (angle + da) % this.gridGraphics.HALF_PI;
    }
  }

}
