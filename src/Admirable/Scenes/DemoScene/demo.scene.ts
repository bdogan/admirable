import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Table } from '../../Objects/UI/Table';
import { Peer } from '../../Objects/P2P/Peer';
import { Sender } from '../../Objects/P2P/Sender';
import { Link } from '../../Objects/Link';

const connection = Link.getInstance();

@AdmirableScene({
  key: 'demo'
})
export class DemoScene extends Phaser.Scene {

  public create() {
    //

    const k = new Button(this, 'host', 64, 64, 120, 48);
    this.add.existing(k);
    k.on(MouseEvent.onClick, () => {
      connection.host('TEST98');
    });

    const m = new Button(this, 'join', 240, 64, 120, 48);
    this.add.existing(m);

    m.on(MouseEvent.onClick, () => {
      connection.join('TEST98');
    });

    const t = new Button(this, 'send', 360, 64, 120, 48);
    this.add.existing(t);
    t.on(MouseEvent.onClick, () => {
      connection.connection.send({a: 'b'});
    });

    const l =  new Button(this, 'change scene', 360, 400, 120, 48);
    this.add.existing(l);
    l.on(MouseEvent.onClick, () => {
      this.scene.start('setup');
    });
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
