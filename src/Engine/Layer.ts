import { ILayer } from './ILayer';
import { Graphics } from 'p5';
import { Scene } from './Scene';
import { Screen } from './Screen';
import p5 = require('p5');
import { ISprite } from './ISprite';
import { Char } from './Sprites/Text';

export class Layer implements ILayer {

  public sprites: ISprite[] = [];

  public scene!: Scene;

  public get screen(): Screen {
    return this.scene.screen;
  }

  public get p(): p5 {
    return this.screen.p;
  }

  // tslint:disable-next-line: no-empty
  public setup(): void {

  }

  // tslint:disable-next-line: no-empty
  public update(): void {

  }

  public addSprite(sprite: ISprite) {
    this.sprites.push(sprite);
  }

  public createGraphics(w: number, h: number): Graphics {
    return this.screen.p.createGraphics(w, h);
  }

  public createChar(char: string | number, size: number, color?: any, background?: any): ISprite {
    return new Char(char, size, color, background);
  }

  public setSpritePosition(sprite: ISprite, x: number, y: number) {
    sprite.x = x;
    sprite.y = y;
  }

}
