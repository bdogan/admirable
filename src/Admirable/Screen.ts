import p5 from 'p5';

export class Screen {

  /**
   * p5 Lib
   */
  private p5Instance: p5;

  /**
   * Width
   */
  private width: number;

  /**
   * Height
   */
  private height: number;

  /**
   * Unit pixel
   */
  private gridSize: { x: number, y: number } = {
    x: 32,
    y: 32,
  };

  /**
   * Pixel per grid
   */
  private pixelPerGrid: number;

  /**
   * @param devicePixel Device Pixel Ratio
   */
  constructor(width: number, height: number, pixelPerGrid: number = .2) {
    this.width = width;
    this.height = height;
    this.pixelPerGrid = pixelPerGrid;

    /**
     * p5 builder
     */
    this.p5Instance = new p5((p: p5) => {
      p.setup = () => this.setup(p);
      p.draw = () => this.draw(p);
    });

  }

  public setup(p: p5) {
    console.log(this.toDevicePixelX(this.width), this.toDevicePixelY(this.height));
    p.createCanvas(this.toDevicePixelX(this.width), this.toDevicePixelY(this.height));
  }

  public draw(p: p5) {
    p.background(0);
    p.fill(255);
    p.rect(100, 100, 50, 50);
  }

  /**
   * Converts given number to device pixel
   * @param val Number
   */
  public toDevicePixelX(val: number): number {
    return this.pixelPerGrid * this.gridSize.x * val;
  }

  public toDevicePixelY(val: number): number {
    return this.pixelPerGrid * this.gridSize.y * val;
  }

}
