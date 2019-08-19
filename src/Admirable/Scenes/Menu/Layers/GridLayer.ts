import { Layer } from '../../../../Engine/Layer';
import { ISprite } from '../../../../Engine/ISprite';
import { Graphics } from 'p5';

export class GridLayer extends Layer {

  private walk: number = 0;

  private gridSprite: ISprite;
  private gridGraphics: Graphics;
  private gridOptions: any = {
    animate: true,
    gridGap: 25,
    gridX: 0,
    gridY: 0,
  };

  public constructor(animate: boolean = true, gap: number = 25) {
    // parent call
    super();

    // Grid Options
    this.gridOptions.animate = animate;
    this.gridOptions.gridGap = gap;
    this.gridOptions.gridX = Math.ceil(this.screen.dimensions.width / this.gridOptions.gridGap);
    this.gridOptions.gridY = Math.ceil(this.screen.dimensions.height / this.gridOptions.gridGap);

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

  public setup(): void {
    this.walk = 0;
  }

  public update(): void {
    this.gridGraphics.background(0, 50);

    // Draw horizontal lines
    for (let x = 0; x < this.gridOptions.gridX; x++) {
      this.gridGraphics.stroke(0, 255, 255, 10);
      this.gridGraphics.line((x * this.gridOptions.gridGap), 0,
        (x * this.gridOptions.gridGap), this.gridGraphics.height);
    }

    // Draw vertical lines
    for (let y = 0; y < this.gridOptions.gridY; y++) {
      if (y < (this.gridOptions.gridY / 2)) {
        this.gridGraphics.stroke(0, 255, 255, y * ((200 / this.gridOptions.gridY) * 2));
      }

      this.gridGraphics.line(0, (y * this.gridOptions.gridGap) + this.walk,
        this.gridGraphics.width, (y * this.gridOptions.gridGap) + this.walk);
    }

    // Animate lines
    if (this.gridOptions.animate) {
      this.walk = (this.walk + 1) % this.gridOptions.gridGap;
    }
  }

}
