import { Graphics, Image } from 'p5';
import { BaseObj } from './BaseObj';

export class Sprite extends BaseObj {

  public static fromObject(x: number, y: number, graphics: Graphics | Image): Sprite {
    const sprite = new Sprite();
    sprite.x = x;
    sprite.y = y;
    sprite.graphics = graphics;
    return sprite;
  }

  public x: number = 0;
  public y: number = 0;
  public graphics!: Graphics | Image;
  public zIndex?: number;

}
