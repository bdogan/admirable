import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Buttons/Button';
import { Sprite} from '../../../../Engine/Sprite';

import {AdmirableLogo, AdmirableLogoType} from '../Images';
import { Text } from '../../../../Engine/Sprites/Text';

export class LayoutLayer extends Layer {

  private button: Button;
  private logo!: Text;
  private easeing: number = 0.05;
  private admirableLogo!: Sprite;
  private angle: number = 0;

  constructor() {
    super();

    // Sprite.fromFile(AdmirableLogo).then((l) => this.admirableLogo = l);

    // this.admirableLogo.x = 0;

    // this.admirableLogo.y = this.Engine.Screen.dimensions.height - this.admirableLogo.graphics.height;

    // this.addSprite(this.admirableLogo);

    const second = new Button(0, 0, 128, 32);
    second.background = 'orange';
    second.on('click', (e) => {
      console.log('second test');
    });
    this.addSprite(second);

    this.button = new Button(0, 0, 256, 64);

    this.button.background = 'red';

    this.button.on('click', (e) => {
      // console.log('main button');
      this.Engine.Router.navigate('demo');
      // this.Engine.Screen.setScene(menu);
    });

    this.addSprite(this.button);
    this.button.x = (this.Engine.Screen.dimensions.width / 2) - (this.button.width / 2);
    this.button.y = (this.Engine.Screen.dimensions.height / 2) - (this.button.height / 2);

    // Logo

    // this.logo = new Text('Admirable', 64, 256);
    this.logo = new Text('Admirable', 64, 256);
    this.logo.color = this.Engine.p5.color(0, 255, 255, 255);
    this.logo.x = (this.Engine.Screen.dimensions.width / 2) - (this.logo.graphics.width / 2);
    this.logo.y = -1 * (this.logo.graphics.height);
    this.addSprite(this.logo);

    Sprite.fromFile(AdmirableLogo).then((s) => {
      this.admirableLogo = s;
      this.admirableLogo.x = -10;
      this.admirableLogo.y = this.Engine.Screen.dimensions.height - s.graphics.height + 10;
      this.addSprite(this.admirableLogo);
    });

  }

  public setup(): void {
    this.logo.y = -1 * (this.logo.graphics.height);
  }

  public  update(): void {
    // Animate the logo.
    // tslint:disable-next-line: max-line-length
    const deltaY =  this.Engine.p5.round((this.Engine.Screen.dimensions.height / 3) - (this.logo.graphics.height / 2) - this.logo.y);
    // this.logo.y = this.logo.y + 1 * (this.Engine.p5.deltaTime / 10);
    this.logo.y += deltaY * this.easeing; // * ( this.Engine.p5.deltaTime / 10);

    this.admirableLogo.x = (this.admirableLogo.x + this.Engine.p5.cos(this.angle) / 4);
    this.admirableLogo.y = (this.admirableLogo.y + this.Engine.p5.sin(this.angle) / 2);
    this.angle = (this.angle + (this.Engine.p5.TWO_PI / 25) * (this.Engine.p5.deltaTime / 80)) % this.Engine.p5.TWO_PI;
    // console.log(this.angle);
  }
}
