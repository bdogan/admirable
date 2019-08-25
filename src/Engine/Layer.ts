import { BaseObj } from './BaseObj';
import { Sprite } from './Sprite';
import _ from 'lodash';

// Promise resolved
const r = Promise.resolve();

/**
 * Layer
 */
export class Layer extends BaseObj {

  public zIndex: number = 0;
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
      .then(() => {
        /**
         * This will help us to sort our array in the ascending order
         * by the sprite's z-index value and the adding order automatically in setup time.
         * So in later we don't have to mind the ordering.
         *
         * position will return 0 if the array is empty, or can't find a smaller zIndexed sprite in the array.
         * ortherwise position will return the proper position for ordering by z-index and adding order.
         */
        const position = _.findLastIndex(this.pSprites, (s) => s.zIndex <= sprite.zIndex) + 1;
        this.pSprites.splice(position, 0, sprite);
      })
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
