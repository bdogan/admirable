import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Table } from '../../Objects/UI/Table';
import { transmission } from '../../Objects/Transmission';
import { IPayload } from '../../Objects/Transmission/transmission.object';
import { gameState } from '../../Objects/GameState/gameState.object';

// const connection = Transmission.getInstance();

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  public create() {
    //

    const k = new Button(this, 'host', 64, 64, 120, 48);
    this.add.existing(k);
    k.on(MouseEvent.onClick, () => {
      // Host goes first.
      gameState.turn = true;
      transmission.host('TEST98');
      // this.scene.start('setup');
    });

    const m = new Button(this, 'join', 220, 64, 120, 48);
    this.add.existing(m);

    m.on(MouseEvent.onClick, () => {
      transmission.join('TEST98');
    });

    transmission.once('connection.established', () => {
      this.scene.start('setup');
    });
  }
}
