import { Text } from './../../../Sprites/Text/Text';
import { Layer } from '../../../Layer';

export class DemoTextLayer extends Layer {

  private text!: Text;

  public setup() {
    this.text = new Text('Awesome Graphics Engine\nBased on p5.js', 30,
      this.Engine.Screen.dimensions.width, this.Engine.Screen.dimensions.height);
    this.text.background = 'rgba(0,0,0,.2)';
  }

  public beforeAttach(): Promise<any> {
    return this.addSprite(this.text);
  }

}
