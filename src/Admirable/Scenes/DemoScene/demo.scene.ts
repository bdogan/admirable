import { AdmirableScene } from '../admirable.scene';
import { ButtonSprite } from '../../Sprites/Button/button.sprite';

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  private button!: ButtonSprite;

  public create() {
    this.button = new ButtonSprite(this, 100, 100, 100, 50, 50);
    this.add.existing(this.button);

  }
}
