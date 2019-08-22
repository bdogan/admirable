import { AppEngine } from './Engine';
import { Graphics, Image, Element } from 'p5';
import { BaseObj } from './BaseObj';

// Promise resolved
const r = Promise.resolve();

/**
 * Sprite
 */
export class Sprite extends BaseObj {

  /**
   * Create new sprite from object
   * @param x number
   * @param y number
   * @param graphics Graphics | Image
   */
  public static New(x: number, y: number, graphics: Graphics | Image): Sprite {
    const sprite = new Sprite();
    sprite.x = x;
    sprite.y = y;
    sprite.graphics = graphics;
    return sprite;
  }

  /**
   * Create from file data
   * @param fileData any
   */
  public static fromFile(fileData: any, x: number = 0, y: number = 0): Promise<Sprite> {
    return new Promise((resolve) => setTimeout(() => {

      // Create image
      const image = AppEngine.p5.createImage(fileData.default.info.width, fileData.default.info.height);
      image.loadPixels();

      // Fill pixels
      for (let i = 0; i < fileData.default.pixels.data.length; i++) {
        image.pixels[i] = fileData.default.pixels.data[i];
      }

      // Update pixels
      image.updatePixels();

      // Create sprite
      return Sprite.New(x, y, image);

    }));
  }

  /**
   * Properties
   */
  public x: number = 0;
  public y: number = 0;
  public graphics!: Graphics | Image;
  public zIndex: number = 0;

  /**
   * Set sprite position
   * @param x number
   * @param y number
   */
  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Destroy
   */
  public destroy() {
    delete(this.x); delete(this.y); delete(this.zIndex);
    if (!!this.graphics && this.graphics instanceof Element) {
      this.graphics.remove();
      delete(this.graphics);
    }
  }

  /**
   * Detach
   */
  public detach(): Promise<any> {
    return (this.beforeDetach() || r).then(() => this.destroy());
  }

  /**
   * Attach
   */
  public attach(): Promise<Sprite> {
    return (this.beforeAttach() || r).then(() => this);
  }

  /**
   * Update
   */
  public doUpdate(): Promise<Sprite> {
    return (this.update() || r).then(() => this);
  }

  /**
   * Hooks
   */
  public setup(): any { return; }
  public beforeAttach(): Promise<any> | any { return; }
  public beforeDetach(): Promise<any> | any { return; }
  public update(): Promise<any> | any { return; }

}
