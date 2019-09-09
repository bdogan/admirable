import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Table } from '../../Objects/UI/Table';
import { Peer } from '../../P2P/Peer';
import { Sender } from '../../P2P/Sender';

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  // Create
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

    // Create new peer
    const peer = new Peer('test', {
      host: 'localhost',
      port: 9000,
      path: '/'
    });

    // Create new connection from peer
    const conn = peer.connect('test2');

    // Create a sender object
    const sender = new Sender(conn);

    // Define some data that will send
    const data = {
      hello: 'world'
    };

    // Send the data
    sender.send(data);
  }
}
