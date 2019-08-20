import p5, { Graphics, Renderer } from 'p5';
import { Scene } from './Scene';
import { Global } from './Global';
import { Layer } from './Layer';
import { InfoLayer } from './Layer/InfoLayer';
import { EventEmitter } from 'events';
import { flatten, orderBy } from 'lodash';
import { ISprite } from './ISprite';

export class Screen extends EventEmitter {

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
   * Debug state
   */
  private debug: boolean = false;

  /**
   * Root canvas
   */
  private pRootCanvas!: Renderer;
  public get rootCanvas(): Renderer {
    return this.pRootCanvas;
  }

  /**
   * Layers
   */
  private pLayers: Layer[] = [];
  public get layers(): Layer[] {
    return (this.scene ? this.scene.layers : []).concat(this.pLayers);
  }

  /**
   * Sprites
   */
  public get sprites(): ISprite[] {
    return flatten(this.layers.map((l) => l.sprites));
  }

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
  constructor(width: number, height: number, debug: boolean = false, frameRate: number = 60, background: any = 255) {
    super();

    Global.Screen = this;

    // Set properties
    this.debug = debug || false;
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.background = background;

    // Create p5 Instance
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
   * Check sprite is attached
   * @param sprite ISprite
   */
  public isAttachedSprite(sprite: ISprite): boolean {
    return this.sprites.findIndex((s) => s === sprite) > -1;
  }

  /**
   * Set scene
   * @param scene Scene
   */
  public setScene(scene: Scene) {
    scene.screen = this;
    scene.setup();
    this.scene = scene;
    console.log(scene);
  }
  public getScene(): Scene {
    return this.scene;
  }

  public addLayer(layer: Layer) {
    layer.setup();
    this.pLayers.push(layer);
  }

  public setup(p: p5) {
    console.info(`Screen canvas generated at ${this.width} x ${this.height} dimensions.`);

    // Create root canvas
    this.pRootCanvas = p.createCanvas(this.width, this.height);

    // Attach listeners
    this.emit('ready.canvas', this.pRootCanvas);
    this.pRootCanvas.mouseClicked((e) => this.emit('click', e));
    this.pRootCanvas.mouseOver((e) => this.emit('hover', e));

    // Set canvas properties
    p.background(this.background);
    p.frameRate(this.frameRate);

    // Add info layer
    if (this.debug) {
      this.addLayer(new InfoLayer());
    }
  }

  public draw(p: p5) {
    p.background(this.background);

    // Scene update
    if (this.scene) {
      this.scene.update();
    }

    // Layers update
    this.pLayers.forEach((l) => l.update());

    // Attach sprites
    orderBy(this.sprites, 'zIndex')
        .filter((s) => !!s && !!s.graphics)
        .forEach((s) => p.image(s.graphics as Graphics, s.x, s.y, s.graphics.width, s.graphics.height));

  }

}
