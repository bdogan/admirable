import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Buttons/Button';
import { Sprite} from '../../../../Engine/Sprite';
// import { Text } from '../../../../Engine/Sprites/Text/Text';
// import { DemoScene } from '../../../../Engine/Scene/DemoScene/DemoScene';
// import { MenuScene } from '../Menu';
// import { demoS } from '../../../../main';
// import { menu, demoS } from '../../../../main';

// import { Button as Butt } from '../../../../Engine/Sprites/Button/Button';

import {AdmirableLogo, AdmirableLogoType} from '../Images';

export class LayoutLayer extends Layer {

  private button: Button;
  private logo!: Sprite;
  private easeing: number = 0.05;
  private admirableLogo!: Sprite;

  constructor() {
    super();

    Sprite.fromFile(AdmirableLogo).then((l) => this.admirableLogo = l);

    this.admirableLogo.x = 0;

    this.admirableLogo.y = this.Engine.Screen.dimensions.height - this.admirableLogo.graphics.height;

    this.addSprite(this.admirableLogo);

    // const but = new Butt('tester', 16, 16, 256, 64);
    // this.addSprite(but);

    // but.on('mousePressed', (e) => {
    //   but.background = 'red';
    //   // console.log(but.background);
    // });

    this.button = new Button(0, 0, 256, 64);

    this.button.background = 'red';

    this.button.on('mousePressed', (e) => {
      console.log('main button');
      // this.Engine.Screen.setScene(menu);
    });

    this.addSprite(this.button);
    this.button.x = (this.Engine.Screen.dimensions.width / 2) - (this.button.width / 2);
    this.button.y = (this.Engine.Screen.dimensions.height / 2) - (this.button.height / 2);

    // Logo
    /*
    this.logo = this.createText('Admirable', 64, 256);
    this.logo.color = this.Engine.p5.color(0, 255, 255, 255);
    this.logo.x = (this.Engine.Screen.dimensions.width / 2) - (this.logo.width / 2);
    this.logo.y = -1 * (this.logo.height);
    this.addSprite(this.logo);
     */

    Sprite.fromFile(AdmirableLogoType)
      .then((l) => {
        this.logo = l;
        this.logo.x = (this.Engine.Screen.dimensions.width / 2) - (this.logo.graphics.width / 2);
        this.logo.y = -1 * (this.logo.graphics.height);
        this.addSprite(this.logo);
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
  }
}
