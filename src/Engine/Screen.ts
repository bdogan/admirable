import p5, { Graphics, Renderer, Element } from 'p5';
import { Scene } from './Scene';
import { Layer } from './Layer';
import { InfoLayer } from './Layer/InfoLayer';
import { flatten, orderBy } from 'lodash';
import { BaseObj } from './BaseObj';
import { Sprite } from './Sprite';

const activeEvents = [ 'mouseClicked', 'mousePressed', 'mouseReleased' ];

export class Screen extends BaseObj {

  /**
   * Public Properties
   */
  public p5: p5;
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
  private scene?: Scene;

  /**
   * Layers
   */
  public get layers(): Layer[] {
    return (this.scene ? this.scene.layers : []).concat(this.Engine.Options.Debug ? [ new InfoLayer() ] : []);
  }

  /**
   * Sprites
   */
  public get sprites(): Sprite[] {
    return flatten(this.layers.map((l) => l.sprites));
  }

  /**
   * @param devicePixel Device Pixel Ratio
   */
  constructor(width: number, height: number, frameRate: number = 60, background: any = 255) {
    super();

    // Set private properties
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.background = background;

    // Listen p5 init state
    this.on('init.p5', (sketch) => this.onInitP5(sketch));

    // Create p5 Instance
    this.p5 = new p5((sketch) => this.emit('init.p5', sketch));
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
   * On init p5
   */
  private onInitP5(sketch: p5) {

    this.on('ready.canvas', this.onCanvasReady);

    // createCanvas only works in p5 instances setup function.
    sketch.setup = () => {
      this.RootCanvas = sketch.createCanvas(this.width, this.height);
      sketch.background(this.background);
      // console.log(this);

      this.emit('ready.canvas', this.RootCanvas);
    };
    // Create root canvas
    // this.p5 = sketch;
    // console.log(this.p5);
    // this.RootCanvas = this.p5.createCanvas(0, 0);
    // console.log(this.RootCanvas);
    // Set canvas properties
    // this.p5.background(this.background);
    // this.p5.frameRate(this.frameRate);
    // Info
    // this.Engine.Log('info', `Screen canvas generated at ${this.width} x ${this.height} dimensions.`);

    // Emit event
    // this.emit('ready.canvas', this.RootCanvas);

    // // Mouse clicked event
    // this.RootCanvas.mouseClicked((event) => {
    //   this.sprites
    //     .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
    //     .forEach((s) => s.emit('click', event));
    // });

    // // Mouse pressed
    // this.RootCanvas.mousePressed((event) => {
    //   this.sprites
    //     .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
    //     .forEach((s) => s.emit('mousedown', event));
    // });

    // // Mouse released
    // this.RootCanvas.mouseReleased((event) => {
    //   this.sprites
    //     .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
    //     .forEach((s) => s.emit('mouseup', event));
    // });

    // // Mouse over
    // this.RootCanvas.mouseMoved((event) => {
    //   this.sprites
    //     .filter((s) => this.isAttachedSprite(s))
    //     .forEach((s) => s.emit(this.isOverSprite(s) ? 'mouseover' : 'mouseout', event));
    // });

    // // Listen active scene old -> new
    // this.Engine.Router.onChange((activeRoute, oldRoute) => {

    //   // Variables
    //   let detachOldScene: Promise<void> | void;
    //   let attachNewScene: Promise<void> | void;

    //   // Check old scene
    //   if (!!this.Engine.Router.ActiveRoute) {
    //     detachOldScene = oldRoute.scene.beforeDetach();
    //   }

    //   // Attach new scene
    //   attachNewScene = activeRoute.scene.beforeAttach();

    //   // Start change process
    //   Promise.all([
    //     (detachOldScene && detachOldScene instanceof Promise ? detachOldScene : Promise.resolve(detachOldScene)),
    //     // tslint:disable-next-line: max-line-length
    //     (attachNewScene && attachNewScene instanceof Promise ? attachNewScene : Promise.resolve(attachNewScene)).then(() => {
    //       this.scene = activeRoute.scene;
    //       // tslint:disable-next-line: max-line-length
    //       this.Engine.Log('info', `Route switch ${(oldRoute || {}).route} -> ${(activeRoute || {}).route}`);
    //       return Promise.resolve();
    //     }),
    //   ])
    //     .then(() => this.Engine.Log('info', `Route ${(oldRoute || {}).route} detached!`));
    // });

  }

  private onCanvasReady() {
      // console.log(rc);
      console.log(this.Engine.Screen.p5);
      console.log(this);

      // Mouse clicked event
      this.RootCanvas.mouseClicked((event) => {
        this.sprites
          .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
          .forEach((s) => s.emit('click', event));
      });

    // Mouse pressed
      this.RootCanvas.mousePressed((event) => {
        this.sprites
          .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
          .forEach((s) => s.emit('mousedown', event));
      });

    // Mouse released
      this.RootCanvas.mouseReleased((event) => {
        this.sprites
          .filter((s) => this.isAttachedSprite(s) && this.isOverSprite(s))
          .forEach((s) => s.emit('mouseup', event));
      });

    // Mouse over
      this.RootCanvas.mouseMoved((event) => {
        this.sprites
          .filter((s) => this.isAttachedSprite(s))
          .forEach((s) => s.emit(this.isOverSprite(s) ? 'mouseover' : 'mouseout', event));
      });

  }

  private draw() {

    // Clear screen
    this.p5.background(this.background);

    // Scene update
    if (this.scene) {
      this.scene.update();
    }

    // Attach sprites
    orderBy(this.sprites, 'zIndex')
        .filter((s) => !!s && !!s.graphics)
        .forEach((s) => this.p5.image(s.graphics as Graphics, s.x, s.y, s.graphics.width, s.graphics.height));

  }

}
