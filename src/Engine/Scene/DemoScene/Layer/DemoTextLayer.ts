import { Text } from './../../../Sprites/Text/Text';
import { Layer } from '../../../Layer';

export class DemoTextLayer extends Layer {

  public setup() {
    const text = new Text('Awesome Graphics Engine\nBased on p5.js', 30,
      this.Engine.Screen.dimensions.width, this.Engine.Screen.dimensions.height);
    text.background = 'rgba(0,0,0,.2)';
    this.addSprite(text);
  }

}
