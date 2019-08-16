import { ILayer } from './ILayer';
import { Graphics } from 'p5';
import { Scene } from './Scene';
import { Screen } from './Screen';
import p5 = require('p5');

export class Layer implements ILayer {

  public sprites: Array<{ x: number; y: number; graphics: Graphics; }> = [];

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
  public draw(): void {

  }

  public addSprite(sprite: { x: number; y: number; graphics: Graphics; }) {
    this.sprites.push(sprite);
  }

  public createGraphics(w: number, h: number): Graphics {
    return this.screen.p.createGraphics(w, h);
  }

}
