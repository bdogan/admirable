import p5, { Graphics, Renderer } from 'p5';
import { Scene } from './Scene';
import { Layer } from './Layer';
import { InfoLayer } from './Layer/InfoLayer';
import { flatten, orderBy } from 'lodash';
import { BaseObj } from './BaseObj';
import { Sprite } from './Sprite';
import { Button } from './Sprites/Buttons/Button';
import { MouseState } from './Enums';

// Promise resolver
const r = Promise.resolve();

/**
 * Screen
 */
export class Screen extends BaseObj {

  /**
   * Public Properties
   */
  public p5!: p5;
  public RootCanvas!: Renderer;
  public get dimensions(): { width: number, height: number } {
    return {
      height: this.height,
      width: this.width,
    };
  }

  /**
   * Private Properties
   */
  private width: number;
  private height: number;
  private background: any = 255;
  private frameRate: number = 60;

  /**
   * ActiveScene
   */
  private get scene(): Scene | undefined {
    return this.Engine && this.Engine.Router
      && this.Engine.Router.ActiveRoute ? this.Engine.Router.ActiveRoute.scene : undefined;
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
  public get sprites(): Sprite[] {
    return flatten(this.layers.map((l) => l.sprites));
  }

  constructor(width: number, height: number, frameRate: number = 60, background: any = 255) {
    super();
    // Set private properties
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.background = background;
  }

  /**
   * Add layer
   */
  public addLayer(layerType: typeof Layer): Promise<Layer> {
    const layer = new layerType();
    layer.setup();
    return layer.attach()
      .then(() => this.pLayers.push(layer))
      .then(() => layer);
  }

  /**
   * Check sprite is attached
   * @param sprite Sprite
   */
  public isAttachedSprite(sprite: Sprite): boolean {
    return this.sprites.findIndex((s) => s === sprite) > -1;
  }

  /**
   * Check sprite is over
   * @param sprite Sprite
   */
  public isOverSprite(sprite: Sprite): boolean {
    return this.p5.mouseX > sprite.x && this.p5.mouseX < sprite.graphics.width + sprite.x &&
      this.p5.mouseY > sprite.y && this.p5.mouseY < sprite.graphics.height + sprite.y;
  }

  /**
   * Run
   */
  public run() {

    // Create p5 Instance
    this.p5 = new p5((sketch) => {
      sketch.setup = () => this.setup();
      sketch.draw = () => this.draw();
    });

    // Add info layer
    if (this.Engine.Options.Debug) {
      this.addLayer(InfoLayer);
    }

  }

  /**
   * Setup
   */
  private setup() {

    // Create root canvas
    this.RootCanvas = this.p5.createCanvas(this.width, this.height);
    this.p5.background(this.background);
    this.emit('ready.canvas', this.RootCanvas);

    // Set framerate
    this.p5.frameRate(this.frameRate);
    // Set pixelDensity 1 for performance on canvas scale.
    this.p5.pixelDensity(1);

    // Info
    this.Engine.Log('info', `Screen canvas generated at ${this.width} x ${this.height} dimensions.`);

    // Mouse clicked event
    this.RootCanvas.mouseClicked((event) => {

      const target = this.eventTarget();

      if (target) {
        target!.emit(MouseState.CLICK, event);
      }

    });

    // Mouse pressed
    this.RootCanvas.mousePressed((event) => {
      this.sprites
        .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
        .forEach((s) => s.emit(MouseState.PRESSED, event));
    });

    // Mouse released
    this.RootCanvas.mouseReleased((event) => {
      this.sprites
        .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
        .forEach((s) => s.emit(MouseState.RELEASED, event));
    });

    // Mouse in / Mouse out
    this.RootCanvas.mouseMoved((event) => {
      // Make the cursor Pointer on a button.
      const cur = this.sprites.find((s) => s instanceof Button && this.isOverSprite(s));
      this.p5.cursor(cur ? 'pointer' : 'default');

      const target = this.eventTarget();

      this.sprites
        .filter((s) => this.isAttachedSprite(s))
        .forEach((s) => s.emit(this.isOverSprite(s) && s === target ? MouseState.OVER : MouseState.OUT, event));

    });

    this.RootCanvas.mouseWheel((event) => {
      const target = this.eventTarget();

      if (target) {
        target!.emit(MouseState.WHEEL, event);
      }
    });

    // Root canvas doesn't support mouseDragged natively, so we need to implement like this.
    this.Engine.p5.mouseDragged = (e) => {
      const target = this.eventTarget();

      if (target) {
        target!.emit(MouseState.DRAG, e);
      }
      return false;
    };

  }

  /**
   * Loop the array through backward and return the targeted sprite if found.
   * It's better to iterate the array backward because our fifo draw/update logic
   * and since **we're looking for the top/last targetable element in the canvas** at the
   * current mouse position it's likely to be found at the end of the array.
   *
   * @returns Sprite if is found or undefined if not found.
   */
  private eventTarget(): Sprite | undefined {
    // console.log(this.sprites);
    for (let i = this.sprites.length - 1; i > 0; i--) {
      if (this.isOverSprite(this.sprites[i])) {
        return this.sprites[i];
      }
    }
  }

  private draw() {

    // Clear screen
    this.p5.background(this.background);

    // Update scenes
    this.p5.noLoop();
    Promise.all([
      (this.scene ? this.scene.doUpdate() : r),
      Promise.all((this.pLayers.map((l) => l.doUpdate()))),
    ])
      .then(() => {
        // Attach sprites
        // orderBy(this.sprites, 'zIndex')
        this.sprites
          // .filter((s) => !!s && !!s.graphics)
          .forEach((s) => this.p5.image(s.graphics as Graphics, s.x, s.y, s.graphics.width, s.graphics.height));
        this.p5.loop();
      });

  }

}
