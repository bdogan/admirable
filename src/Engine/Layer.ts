import { ILayer } from './ILayer';
import { Graphics } from 'p5';
import { Scene } from './Scene';
import { Screen } from './Screen';
import { ISprite } from './ISprite';
import { Text } from './Sprites/Text';
import p5 = require('p5');
import { Global } from './Global';
import { Button } from './Buttons/Button';
import {Sprite} from './Sprite';

export class Layer implements ILayer {

  public sprites: ISprite[] = [];

  public scene?: Scene;

  public get screen(): Screen {
    return (Global.Screen as Screen);
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

  public addSprite<T>(sprite: ISprite): T {
    this.sprites.push(sprite);
    return (sprite as any) as T;
  }

  public createGraphics(w: number, h: number): Graphics {
    const graphic = this.screen.p.createGraphics(w, h);
    graphic.remove();
    return graphic;
  }

  public createText(text: string, size: number, width: number, height?: number): Text {
    return new Text(text, size, width, height);
  }

  public createButton(x: number, y: number, w: number, h: number) {
    return new Button(x, y, w, h);
  }

  public setSpritePosition(sprite: ISprite, x: number, y: number) {
    sprite.x = x;
    sprite.y = y;
  }

  public imageToSprite(source: any) {
    const image = this.p.createImage(source.default.info.width, source.default.info.height);

    image.loadPixels();

    for (let i = 0; i < source.default.pixels.data.length; i++) {
      image.pixels[i] = source.default.pixels.data[i];
    }

    image.updatePixels();

    const spr = Sprite.fromObject(0, this.screen.dimensions.height - image.height, image);

    return spr;
  }

}
