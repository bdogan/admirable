import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Buttons/Button';
import { Text } from '../../../../Engine/Sprites/Text/Text';
import { DemoScene } from '../../../../Engine/Scene/DemoScene/DemoScene';
import { MenuScene } from '../Menu';
// import { demoS } from '../../../../main';
import { menu, demoS } from '../../../../main';

export class LayoutLayer extends Layer {

  private button: Button;
  private logo: Text;
  private easeing: number = 0.05;

  constructor() {
    super();

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
