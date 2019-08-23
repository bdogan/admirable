import { Layer } from '../../../../Engine/Layer';
import { Graphics } from 'p5';
import { Sprite } from '../../../../Engine/Sprite';
import { promises } from 'fs';

export class GridLayer extends Layer {

  private angle: number = 0;

  private gridSprite!: Sprite;
  private gridGraphics!: Graphics;
  private gridOptions: any = {
    animate: true,
    frequency: 50,
    shiftY: -150,
  };

  public beforeAttach(): Promise<any> {
    return this.addSprite(this.gridSprite);
  }

  public setup() {
        // Create grid sprite
        // tslint:disable-next-line: max-line-length
        this.gridGraphics = this.Engine.p5.createGraphics(this.Engine.Screen.dimensions.width, this.Engine.Screen.dimensions.height);
        this.gridSprite =  Sprite.New(0, 0, this.gridGraphics);
  }

  public update(): void {
    this.gridGraphics.background(0, 25);
    this.gridGraphics.stroke(0, 255, 255, 50);

    this.perspectiveGrid(this.angle);

    this.angle = (this.angle
      + (this.gridGraphics.TWO_PI / this.Engine.Screen.dimensions.width)
      * (this.Engine.p5.deltaTime / (1000 / 2)))
      % this.gridGraphics.TWO_PI;
  }

  /**
   * Creates horizontal lines with given angle.
   * @param angle angle at a specific time.
   */
  private perspectiveGrid(angle: number) {
    const width = this.Engine.Screen.dimensions.width;
    // const height = this.Engine.Screen.dimensions.height;
    const da = this.gridGraphics.TWO_PI / width;

    for (let i = 0; i < width / 4; i++) {
      const x1 = (i * 4),
            y1 = 0,
            x2 = x1,
            // tslint:disable-next-line: max-line-length
            // y2 = this.Engine.p5.min(this.gridOptions.shiftY + this.gridGraphics.tan(angle) * this.gridOptions.frequency, height);
            y2 = this.gridOptions.shiftY + this.gridGraphics.tan(angle) * this.gridOptions.frequency;

      // Debug graphic;
      // this.gridGraphics.line(x1, y1, x2, y2);

      // Perspective lines
      this.gridGraphics.line(0, y2, width, y2);

      angle = (angle + da) % this.gridGraphics.HALF_PI;
    }
  }

}
