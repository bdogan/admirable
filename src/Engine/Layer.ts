import { BaseObj } from './BaseObj';
import { Sprite } from './Sprite';

// Promise resolved
const r = Promise.resolve();

/**
 * Layer
 */
export class Layer extends BaseObj {

  /**
   * Layer Sprites
   */
  private pSprites: Sprite[] = [];
  public get sprites(): Sprite[] {
    return this.pSprites;
  }

  /**
   * Adds a new sprite
   * @param sprite Sprite
   */
  public addSprite(sprite: Sprite): Promise<Sprite> {
    sprite.setup();
    return sprite.attach()
      .then(() => this.pSprites.push(sprite))
      .then(() => sprite);
  }

  /**
   * Remove a sprite
   * @param sprite Sprite
   */
  public removeSprite(sprite: Sprite): Promise<any> {
    const index = this.pSprites.indexOf(sprite);
    if (index === -1) {
      return Promise.resolve(sprite);
    }
    return sprite.detach()
      .then(() => this.pSprites.splice(index, 1))
      .then(() => sprite.destroy());
  }

  /**
   * Destroy
   */
  public destroy() {
    delete(this.pSprites);
  }

  /**
   * Detach
   */
  public detach(): Promise<any> {
    return Promise.all(this.pSprites.map((s) => this.removeSprite(s)))
      .then(() => (this.beforeDetach() || r))
      .then(() => this.destroy());
  }

  /**
   * Attach
   */
  public attach(): Promise<Layer> {
    return Promise.all(this.pSprites.map((s) => s.attach()))
      .then(() => (this.beforeAttach() || r))
      .then(() => this);
  }

  /**
   * Update
   */
  public doUpdate(): Promise<Layer> {
    return Promise.all(this.pSprites.map((s) => s.doUpdate()))
      .then(() => (this.update() || r))
      .then(() => this);
  }

  /**
   * Hooks
   */
  public setup() { return; }
  public beforeAttach(): Promise<any> | any { return; }
  public beforeDetach(): Promise<any> | any { return; }
  public update(): Promise<any> | any { return; }

}
