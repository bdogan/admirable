import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Buttons/Button';
import { Sprite} from '../../../../Engine/Sprite';

import {BattleShip, AdmirableLogoType} from '../Images';
import { Text } from '../../../../Engine/Sprites/Text';

export class LayoutLayer extends Layer {

  private button!: Button;
  private logo!: Text;
  private battleShip!: Sprite;
  private admirableLogo!: Sprite;
  private easeing: number = 0.05;
  private angle: number = 0;

  public setup(): void {
    console.log('setup');
    this.button = new Button(0, 0, 256, 64);

    this.button.background = 'red';

    this.button.on('click', (e) => {
      // console.log('main button');
      this.Engine.Router.navigate('demo');
      // this.Engine.Screen.setScene(menu);
    });

    this.button.x = (this.Engine.Screen.dimensions.width / 2) - (this.button.width / 2);
    this.button.y = (this.Engine.Screen.dimensions.height / 2) - (this.button.height / 2);

    // Sprite.fromFile(BattleShip).then((s) => {
    //   // console.log(s);
    //   this.sBattleShip = s;
    //   this.sBattleShip.x = -10;
    //   this.sBattleShip.y = this.Engine.Screen.dimensions.height - s.graphics.height + 10;
    //   this.addSprite(this.sBattleShip);
    // });

    this.battleShip = Sprite.fromFile(BattleShip);
    // this.battleShip.x = -10;
    this.battleShip.y = this.Engine.Screen.dimensions.height - this.battleShip.graphics.height + 10;

    this.admirableLogo = Sprite.fromFile(AdmirableLogoType);
    this.admirableLogo.x = (this.Engine.Screen.dimensions.width / 2) - (this.admirableLogo.graphics.width / 2);
    this.admirableLogo.y = -1 * (this.admirableLogo.graphics.height);
    // Sprite.fromFile(AdmirableLogoType).then((sprite) => {
    //   sprite.x = (this.Engine.Screen.dimensions.width / 2) - (sprite.graphics.width / 2);
    //   sprite.y = -1 * (sprite.graphics.height);
    //   this.sAdmirableLogo = sprite;
    //   this.addSprite(this.sAdmirableLogo);
    // });

  }

  public beforeAttach(): Promise<any> {
    // console.log(this.sAdmirableLogo);

    return Promise.all([
      this.addSprite(this.admirableLogo),
      this.addSprite(this.battleShip),
      this.addSprite(this.button),
    ]);
  }

  public  update(): void {
    // Animate the logo.
    // tslint:disable-next-line: max-line-length
    const deltaY =  this.Engine.p5.round((this.Engine.Screen.dimensions.height / 3) - (this.admirableLogo.graphics.height / 2) - this.admirableLogo.y);
    this.admirableLogo.y += deltaY * this.easeing;

    // this.battleShip.x += this.battleShip.x * this.Engine.p5.cos(1);
    this.battleShip.y +=  this.Engine.p5.sin(this.angle);

    this.angle = (this.angle + this.Engine.p5.TWO_PI / 30) % this.Engine.p5.TWO_PI;
  }
}
