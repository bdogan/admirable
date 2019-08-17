import { ILayer } from './ILayer';
import { Graphics } from 'p5';
import { Scene } from './Scene';
import { Screen } from './Screen';
import { ISprite } from './ISprite';
import { Text } from './Sprites/Text';
import p5 = require('p5');

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

  public createText(text: string, size: number, width: number, height?: number): Text {
    return new Text(text, size, width, height);
  }

  public setSpritePosition(sprite: ISprite, x: number, y: number) {
    sprite.x = x;
    sprite.y = y;
  }

}
