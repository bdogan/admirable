import p5, { Graphics, Renderer, Element } from 'p5';
import { Scene } from './Scene';
import { Global } from './Global';
import { Layer } from './Layer';
import { InfoLayer } from './Layer/InfoLayer';
import { EventEmitter } from 'events';
import { flatten, orderBy } from 'lodash';
import { ISprite } from './ISprite';

const activeEvents = [ 'mouseClicked', 'mousePressed', 'mouseReleased' ];

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
      // p.preload = ()=> this.preload(p);
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
    // clean layers array when scene set.
    scene.layers = [];

    scene.setup();

    this.scene = scene;
  }

  public getScene(): Scene {
    return this.scene;
  }

  public addLayer(layer: Layer) {
    layer.setup();
    this.pLayers.push(layer);
  }

  public isOverSprite(sprite: ISprite): boolean {
    return this.p.mouseX > sprite.x && this.p.mouseX < sprite.graphics.width + sprite.x &&
      this.p.mouseY > sprite.y && this.p.mouseY < sprite.graphics.height + sprite.y;
  }

  public setup(p: p5) {
    console.info(`Screen canvas generated at ${this.width} x ${this.height} dimensions.`);

    // Create root canvas
    this.pRootCanvas = p.createCanvas(this.width, this.height);

    // Attach listeners
    this.emit('ready.canvas', this.pRootCanvas);

    // Attach active events
    activeEvents.forEach((eventName) => {
      const eventHandler: (fxn: ((...args: any[]) => any) | boolean) => Element = (this.pRootCanvas as any)[eventName];
      eventHandler.call(this.pRootCanvas, (e) => {
        this.sprites
          .filter((s) => s instanceof EventEmitter && this.isAttachedSprite(s) && this.isOverSprite(s))
          .forEach((s) => (s as any).emit(eventName, e));
      });
      this.pRootCanvas.mouseMoved((e) => {
        this.emit('mouseMoved', e);
        this.sprites
          .filter((s) => s instanceof EventEmitter && this.isAttachedSprite(s))
          .forEach((s) => (s as any).emit(!this.isOverSprite(s) ? 'mouseOut' : 'mouseIn', e));
      });
    });

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
