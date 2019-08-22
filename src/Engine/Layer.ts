import { BaseObj } from './BaseObj';
import p5, { Graphics } from 'p5';
import { Scene } from './Scene';
import { Screen } from './Screen';
import {Sprite} from './Sprite';
import { Text } from './Sprites/Text';
import { Button } from './Buttons/Button';


export class Layer extends BaseObj {

  public sprites: Sprite[] = [];

  public scene?: Scene;

  // tslint:disable-next-line: no-empty
  public setup(): void {

  }

  // tslint:disable-next-line: no-empty
  public update(): void {

  }

  public addSprite<T>(sprite: Sprite): T {
    this.sprites.push(sprite);
    return (sprite as any) as T;
  }

  public createGraphics(w: number, h: number): Graphics {
    const graphic = this.Engine.p5.createGraphics(w, h);
    graphic.remove();
    return graphic;
  }

  public createText(text: string, size: number, width: number, height?: number): Text {
    return new Text(text, size, width, height);
  }

  public createButton(x: number, y: number, w: number, h: number) {
    return new Button(x, y, w, h);
  }

  public setSpritePosition(sprite: Sprite, x: number, y: number) {
    sprite.x = x;
    sprite.y = y;
  }

  public imageToSprite(source: any) {
    const image = this.Engine.p5.createImage(source.default.info.width, source.default.info.height);

    image.loadPixels();

    for (let i = 0; i < source.default.pixels.data.length; i++) {
      image.pixels[i] = source.default.pixels.data[i];
    }

    image.updatePixels();

    const spr = Sprite.fromObject(0, 0, image);

    return spr;
  }

}
