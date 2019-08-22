import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Buttons/Button';
import { Text } from '../../../../Engine/Sprites/Text/Text';
import { DemoScene } from '../../../../Engine/Scene/DemoScene/DemoScene';
import { MenuScene } from '../Menu';
// import { demoS } from '../../../../main';
import { menu, demoS } from '../../../../main';

import { Button as Butt } from '../../../../Engine/Sprites/Button/Button';

import { Sprite} from '../../../../Engine/Sprite';
import { AdmiralLogo } from '../Images';

export class LayoutLayer extends Layer {

  private button: Button;
  private logo: Text;
  private easeing: number = 0.05;

  constructor() {
    super();

    const but = new Butt('tester', 16, 16, 256, 64);
    this.addSprite(but);

    but.on('mousePressed', (e) => {
      but.background = 'red';
      // console.log(but.background);
    });

    this.button = this.createButton(0, 0, 256, 64);

    this.button.background = 'red';

    this.button.on('mousePressed', (e) => {
      console.log('main button');
      this.screen.setScene(menu);
    });

    this.addSprite(this.button);
    this.button.x = (this.screen.dimensions.width / 2) - (this.button.width / 2);
    this.button.y = (this.screen.dimensions.height / 2) - (this.button.height / 2);

    // Logo
    this.logo = this.createText('Admirable', 64, 256);
    this.logo.color = this.p.color(0, 255, 255, 255);
    this.logo.x = (this.screen.dimensions.width / 2) - (this.logo.width / 2);
    this.logo.y = -1 * (this.logo.height);
    this.addSprite(this.logo);

    const admiralLogo = this.imageToSprite(AdmiralLogo);

    this.addSprite(admiralLogo);
  }

  public setup(): void {
    this.logo.y = -1 * (this.logo.height);
  }

  public  update(): void {
    // Animate the logo.
    const deltaY =  this.p.round((this.screen.dimensions.height / 3) - (this.logo.height / 2) - this.logo.y);
    // this.logo.y = this.logo.y + 1 * (this.p.deltaTime / 10);
    this.logo.y += deltaY * this.easeing; // * ( this.p.deltaTime / 10);
  }

}
