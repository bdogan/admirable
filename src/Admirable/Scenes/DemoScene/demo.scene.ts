import { AdmirableScene } from '../admirable.scene';
import { ButtonSprite } from '../../Sprites/Button/button.sprite';
import { Button, MouseEvent } from '../../Objects/UI/Button';

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  private button!: ButtonSprite;

  public create() {

    const button = new Button(this, 0, 0);

    this.add.existing(button);

    button.on(MouseEvent.onClick, (e: any) => {
      console.log('button clicked!');
    });

  }
}
