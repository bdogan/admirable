import { Layer } from '../../../Layer';
import { Sprite } from '../../../Sprite';
import { Graphics } from 'p5';

export class DemoLayer extends Layer {

  private box!: Sprite;

  public setup() {
    // Create box
    this.box = Sprite.New(Math.floor(Math.random() * this.Engine.Screen.dimensions.width),
      Math.floor(Math.random() * this.Engine.Screen.dimensions.height), this.Engine.p5.createGraphics(20, 20));
    (this.box.graphics as Graphics).background(50);
  }

  public beforeAttach(): Promise<any> {
    return this.addSprite(this.box);
  }

  public update() {
    this.sprites[0].x = ((this.sprites[0].x + 1) % this.Engine.Screen.dimensions.width);
    this.sprites[0].y = ((this.sprites[0].y + 1) % this.Engine.Screen.dimensions.height);
  }

}
