import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Sprites/Buttons/Button';
import { Sprite} from '../../../../Engine/Sprite';

import {BattleShip, AdmirableLogoType} from '../Images';
import { Text } from '../../../../Engine/Sprites/Text';
import p5sound = require('p5/lib/addons/p5.sound');

export class LayoutLayer extends Layer {

  private button!: Button;
  private but2!: Button;
  private battleShip!: Sprite;
  private admirableLogo!: Sprite;
  private easeing: number = 0.05;
  private angle: number = 0;

  public setup(): void {
    // this.zIndex = -50;
    this.button = new Button('Demo Scene', 0, 0, 256, 64);
    this.button.text.color = 'rgb(0,255,255)';
    this.button.text.size = 32;
    this.button.background = 'rgb(0,255,255)';

    this.button.on('click', (e) => {
      console.log('main button');
      // this.button.text.text = 'changed';
      this.Engine.Router.navigate('demo');
      // this.Engine.Screen.setScene(menu);
    });

    this.but2 = new Button('Table', 0, 0, 64, 64);
    this.but2.background = 'orange';
    this.but2.on('click', (e) => {
      this.Engine.Router.navigate('components');
    });

    this.button.x = (this.Engine.Screen.dimensions.width / 2) - (this.button.width / 2);
    this.button.y = (this.Engine.Screen.dimensions.height / 2) - (this.button.height / 2);

    this.but2.x = this.button.x - 32;
    this.but2.y = this.button.y - 32;

    this.battleShip = Sprite.fromFile(BattleShip);

    this.battleShip.on('click', () => {
      console.log(`I'm a battle ship!`);
    });

    this.battleShip.y = this.Engine.Screen.dimensions.height - this.battleShip.graphics.height + 10;

    this.admirableLogo = Sprite.fromFile(AdmirableLogoType);
    this.admirableLogo.x = (this.Engine.Screen.dimensions.width / 2) - (this.admirableLogo.graphics.width / 2);
    this.admirableLogo.y = -1 * (this.admirableLogo.graphics.height);

  }

  public beforeAttach(): Promise<any> {
    // this.but2.zIndex = -50;
    // this.but2.zIndex = 99;
    return Promise.all([
      this.addSprite(this.admirableLogo),
      this.addSprite(this.battleShip),
      this.addSprite(this.button),
      this.addSprite(this.but2),
    ]);
  }

  public update(): void {
    // Animate the logo.
    // tslint:disable-next-line: max-line-length
    const deltaY =  this.Engine.p5.round((this.Engine.Screen.dimensions.height / 3) - (this.admirableLogo.graphics.height / 2) - this.admirableLogo.y);
    this.admirableLogo.y += deltaY * this.easeing;

    // this.battleShip.x += this.battleShip.x * this.Engine.p5.cos(1);
    this.battleShip.y =  this.battleShip.y + this.Engine.p5.sin(this.angle) / 2;

    this.angle = (this.angle + this.Engine.p5.TWO_PI / 60) % this.Engine.p5.TWO_PI;

    this.battleShip.graphics.rotate(Math.PI);
  }
}
