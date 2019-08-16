import p5, { Graphics } from 'p5';
import { Scene } from './Scene';

export class Screen {

  /**
   * p5 Lib
   */
  public p: p5;

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
  private scene!: Scene;

  /**
   * Background
   */
  private background: any;

  /**
   * Framerate
   */
  private frameRate: number;

  /**
   * Dimensions
   */
  public get dimensions(): { width: number, height: number } {
    return { width: this.width, height: this.height };
  }

  /**
   * @param devicePixel Device Pixel Ratio
   */
  constructor(width: number, height: number, frameRate: number = 25, background: any = 255) {
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.background = background;

    /**
     * p5 builder
     */
    this.p = new p5((p: p5) => {
      p.setup = () => this.setup(p);
      p.draw = () => this.draw(p);
    });
  }

  /**
   * Set scene
   * @param scene Scene
   */
  public setScene(scene: Scene) {
    scene.screen = this;
    scene.setup();
    this.scene = scene;
  }

  public setup(p: p5) {
    console.info(`Screen canvas generated at ${this.width} x ${this.height} dimensions.`);
    p.createCanvas(this.width, this.height);
    p.background(this.background);
    p.frameRate(this.frameRate);
  }

  public draw(p: p5) {
    p.background(this.background);
    // Draw scene
    this.scene.draw();
    // Attach layers
    this.scene.layers
      .forEach((l) => l.sprites
        .forEach((s) => p.image(s.graphics as Graphics, s.x, s.y, s.graphics.width, s.graphics.height)));

  }

}
