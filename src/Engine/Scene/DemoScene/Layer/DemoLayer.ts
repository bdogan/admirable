import { Layer } from '../../../Layer';
import { Sprite } from '../../../Sprite';

export class DemoLayer extends Layer {

  public setup(): void {
    const im = this.createGraphics(20, 20);
    im.background(50);
    // tslint:disable-next-line: max-line-length
    const sprt = new Sprite(Math.floor(Math.random() * this.screen.dimensions.width), Math.floor(Math.random() * this.screen.dimensions.height), im);
    this.addSprite(sprt);
  }

  public update(): void {
    this.sprites[0].x = ((this.sprites[0].x + 1) % this.screen.dimensions.width);
    this.sprites[0].y = ((this.sprites[0].y + 1) % this.screen.dimensions.height);
  }

}
