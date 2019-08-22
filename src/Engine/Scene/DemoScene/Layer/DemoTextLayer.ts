import { Layer } from '../../../Layer';

export class DemoTextLayer extends Layer {

  public beforeAttach() {
    const text = this.createText('Awesome Graphics Engine\nBased on p5.js', 30,
    this.Engine.Screen.dimensions.width, this.Engine.Screen.dimensions.height);
    text.background = 'rgba(0,0,0,.2)';
    this.addSprite(text);
  }

}
