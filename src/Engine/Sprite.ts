import { ISprite } from './ISprite';
import { Graphics, Image } from 'p5';
import { EventEmitter } from 'events';

export class Sprite extends EventEmitter implements ISprite {
  public x: number;
  public y: number;
  public graphics: Graphics | Image;
  public zIndex?: number;

  constructor(x: number, y: number, graphics: Graphics) {
    super();
    this.x = x;
    this.y = y;
    this.graphics = graphics;
  }
}
