import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  public create() {

    const button = new Button(this, 960 / 2, 480 / 2);

    this.add.existing(button);

    button.on(MouseEvent.onClick, (e: any) => {
      // console.log('button clicked!');
      this.scene.start('setup');
    });
  }
}
