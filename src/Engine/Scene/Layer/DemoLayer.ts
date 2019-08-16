import { Layer } from '../../Layer';
import { Screen } from '../../Screen';
import { Graphics } from 'p5';

export class DemoLayer extends Layer {

  public setup(): void {

    const im = this.p.createGraphics(20, 20);
    im.background(50);
    this.addSprite({ x: Math.floor(Math.random() * this.screen.dimensions.width), y: Math.floor(Math.random() * this.screen.dimensions.height), graphics: im });
  }

  public update(): void {
    this.sprites[0].x = ((this.sprites[0].x + 1) % this.screen.dimensions.width);
    this.sprites[0].y = ((this.sprites[0].y + 1) % this.screen.dimensions.height);
  }

}
