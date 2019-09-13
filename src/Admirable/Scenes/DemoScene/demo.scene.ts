import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Table } from '../../Objects/UI/Table';
import { Peer } from '../../Objects/P2P/Peer';
import { Sender } from '../../Objects/P2P/Sender';
import { Transmission } from '../../Objects/Transmission';
import { IPayload } from '../../Objects/Transmission/transmission.object';

const connection = Transmission.getInstance();

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  // Create
  public create() {
    const k = new Button(this, 'host', 64, 64, 120, 48);
    this.add.existing(k);
    k.on(MouseEvent.onClick, () => {
      connection.host('TEST98');
      // connection.connection.send({type: 'host.ready'} as IPayload);
      this.scene.start('setup');
    });

    const m = new Button(this, 'join', 220, 64, 120, 48);
    this.add.existing(m);

    m.on(MouseEvent.onClick, () => {
      connection.join('TEST98');
      // connection.connection.send({type: 'host.ready', data: {}} as IPayload);
      // connection.connection.send({type: 'peer.conected', data: {}} as IPayload);
      this.scene.start('setup');
    });

    const t = new Button(this, 'send', 380, 64, 120, 48);
    this.add.existing(t);
    t.on(MouseEvent.onClick, (p: any) => {
      // connection.connection.send({type: 'peer.ready', data: {x: p.x, y: p.y}} as IPayload);
    });

    const l =  new Button(this, 'change scene', 360, 400, 280, 48);
    this.add.existing(l);
    l.on(MouseEvent.onClick, () => {
      this.scene.start('setup');
    });

    // connection.on('enemy.ready', (d: IPayload) => {
    //   console.log('enemy is ready with this info ', d);
    // });

  }

  /*
  public create() {

    const button = new Button(this, 'Button', 960 - 250, 480 / 2);

    this.add.existing(button);

    button.on(MouseEvent.onClick, (e: any) => {
      // console.log('button clicked!');
      this.scene.start('setup');
    });

    const  content = [
      [
        'Name',
        'Surname',
        'Points'
      ],
      [
        'Necati',
        'Yılmaz',
        '250'
      ],
      [
        'Mehmet',
        'Korkmaz',
        '220'
      ],
      [
        'Ayşe',
        'Bakmaz',
        '500'
      ],
      [
        'Emre',
        'Tutmaz',
        '800'
      ],
      [
        'Towney',
        'Whittock',
        '696'
      ],
      [
        'Car',
        'Smethurst',
        '491'
      ],
      [
        'Meaghan',
        'Coolahan',
        '311'
      ],
      [
        'Anni',
        'Castagnet',
        '342'
      ],
    ];

    const table = new Table(this, 10, 10, 300, 400, content);
    table.showHead = true;

    this.add.existing(table);

  }
*/
}
