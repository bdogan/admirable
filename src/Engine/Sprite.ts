import { ISprite } from './ISprite';
import { Graphics, Image } from 'p5';
import { EventEmitter } from 'events';
import { Global } from './Global';
import { Screen } from '../Engine/Screen';
import p5 = require('p5');

export class Sprite extends EventEmitter implements ISprite {

  public static fromObject(x: number, y: number, graphics: Graphics): Sprite {
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

  private screen: Screen;
  public get p(): p5 {
    return this.screen.p;
  }

  constructor() {
    super();
    this.screen = Global.Screen as Screen;
  }

}
