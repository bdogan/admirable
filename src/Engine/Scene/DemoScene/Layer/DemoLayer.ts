import { Layer } from '../../../Layer';
import { Sprite } from '../../../Sprite';

export class DemoLayer extends Layer {

  public setup() {
    const im = this.Engine.p5.createGraphics(20, 20);
    im.background(50);
    // tslint:disable-next-line: max-line-length
    const sprt = Sprite.New(Math.floor(Math.random() * this.Engine.Screen.dimensions.width), Math.floor(Math.random() * this.Engine.Screen.dimensions.height), im);
    this.addSprite(sprt);
  }

  public update() {
    this.sprites[0].x = ((this.sprites[0].x + 1) % this.Engine.Screen.dimensions.width);
    this.sprites[0].y = ((this.sprites[0].y + 1) % this.Engine.Screen.dimensions.height);
  }

}
