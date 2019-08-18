import p5, { Graphics } from 'p5';
import { Scene } from './Scene';
import { Global } from './Global';
import { Glob } from 'glob';
import {Layer} from './Layer';
import {InfoLayer} from './Layer/InfoLayer';

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
   * Scene
   */
  private scene!: Scene;

  /**
   * Layers
   */
  private layers: Layer[] = [];

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
  constructor(width: number, height: number, frameRate: number = 60, background: any = 255) {
    Global.Screen = this;

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
   * Set Background given value
   * @param background
   */
  public setBackground(background: any) {
    this.background = background;
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

  public addLayer(layer: Layer) {
    layer.setup();
    this.layers.push(layer);
  }

  public setup(p: p5) {
    console.info(`Screen canvas generated at ${this.width} x ${this.height} dimensions.`);
    p.createCanvas(this.width, this.height);
    p.background(this.background);
    p.frameRate(this.frameRate);
    // Add info layer
    this.addLayer(new InfoLayer());
  }

  public draw(p: p5) {
    p.background(this.background);

    // Scene update
    this.scene.update();

    // Layers update
    this.layers.forEach((l) => l.update());

    // Attach layers
    this.scene.layers
      .forEach((l) => l.sprites
        .filter((s) => !!s && !!s.graphics)
        .forEach((s) => p.image(s.graphics as Graphics, s.x, s.y, s.graphics.width, s.graphics.height)));

    // Attach static layers
    this.layers.forEach((l) => l.sprites
      .filter((s) => !!s && !!s.graphics)
      .forEach((s) => p.image(s.graphics as Graphics, s.x, s.y, s.graphics.width, s.graphics.height)));

  }

}
