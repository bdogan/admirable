import { Text } from './../../../Sprites/Text/Text';
import { Layer } from '../../../Layer';
import { Button } from '../../../Buttons/Button';

export class DemoTextLayer extends Layer {

  private text!: Text;
  private button!: Button;

  public setup() {
    this.text = new Text('Awesome Graphics Engine\nBased on p5.js', 30,
      this.Engine.Screen.dimensions.width, this.Engine.Screen.dimensions.height);
    this.text.background = 'rgba(0,0,0,.2)';

    this.button = new Button(0, 0, 256, 64);
    this.button.x = (this.Engine.Screen.dimensions.width / 2) - (this.button.width / 2);
    this.button.y = (this.Engine.Screen.dimensions.height / 2) - (this.button.height / 2);
    this.button.background = 'green';
    this.button.on('click', (e) => {
      this.Engine.Router.navigate('main');
    });

  }

  public beforeAttach(): Promise<any> {
    return Promise.all([
      this.addSprite(this.text),
      this.addSprite(this.button),
    ]);
  }

}
