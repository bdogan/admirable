import p5 from 'p5';
import { Scene } from './Scene';

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
   * Screen scene
   */
  private scene: Scene;

  /**
   * Unit pixel
   */
  private gridSize: { x: number, y: number } = {
    x: 8,
    y: 8,
  };

  /**
   * Unit pixel multipler
   */
  private gridSizeMultipler: { x: number, y: number } = {
    x: 1 * 0.8,
    y: 0.93 * 0.8,
  };

  /**
   * Pixel per grid
   */
  private pixelPerGrid: number;

  /**
   * @param devicePixel Device Pixel Ratio
   */
  constructor(width: number, height: number, pixelPerGrid: number = 3) {
    this.width = width;
    this.height = height;
    this.pixelPerGrid = pixelPerGrid;

    // Create empty scene
    this.scene = new Scene([]);

    /**
     * p5 builder
     */
    this.p5Instance = new p5((p: p5) => {
      p.setup = () => this.setup(p);
      p.draw = () => this.draw(p);
    });
  }

  public dimensions(): { width: number, height: number } {
    return { width: this.width, height: this.height };
  }

  /**
   * Set scene
   * @param scene Scene
   */
  public setScene(scene: Scene) {
    this.scene = scene;
  }

  public setup(p: p5) {
    console.info(`Screen generated at ${this.width} x ${this.height} tiles.`);
    p.createCanvas(this.toDevicePixelX(this.width), this.toDevicePixelY(this.height));
    p.background(0);
    p.frameRate(30);
  }

  public draw(p: p5) {
    // For each layer
    let tiles, tile, pixels, pixel, xOffsetOuter, yOffsetOuter, xOffsetInner, yOffsetInner;
    this.scene.layers.forEach((l) => {
      // Generate tiles
      tiles = l.generateTiles();
      // Scan screen
      for (let i = 0; i < this.width * this.height; i++) {
        tile = tiles[i];
        if (!tile) {
          continue;
        }
        pixels = tile.pixels;
        xOffsetOuter = this.toDevicePixelX(i % this.width);
        yOffsetOuter = this.toDevicePixelY(Math.floor(i / this.width));
        for (let a = 0; a < this.gridSize.x * this.gridSize.y; a++) {
          pixel = pixels[a];
          if (!pixel) {
            continue;
          }
          xOffsetInner = this.toDevicePixelX(a % this.gridSize.x);
          yOffsetInner = this.toDevicePixelY(Math.floor(a / this.gridSize.x));
          p.fill(pixel.toRGBAString());
          p.rect(xOffsetOuter + xOffsetInner, yOffsetOuter + yOffsetInner,
            this.toDevicePixelX(this.gridSize.x), this.toDevicePixelY(this.gridSize.y));
        }
      }
    });
  }

  /**
   * Converts given number to device pixel
   * @param val Number
   */
  public toDevicePixelX(val: number): number {
    return this.pixelPerGrid * this.gridSize.x * val * this.gridSizeMultipler.x;
  }

  public toDevicePixelY(val: number): number {
    return this.pixelPerGrid * this.gridSize.y * val * this.gridSizeMultipler.y;
  }

}
