import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Table } from '../../Objects/UI/Table';
import { Peer } from '../../Objects/P2P';
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
      connection.init('TEST98');
      connection.host();
      // connection.connection.send({type: 'host.ready'} as IPayload);
      this.scene.start('setup');
    });

    const m = new Button(this, 'join', 220, 64, 120, 48);
    this.add.existing(m);

    m.on(MouseEvent.onClick, () => {
      connection.init();
      connection.join('TEST98');
      // connection.connection.send({type: 'host.ready', data: {}} as IPayload);
      // connection.connection.send({type: 'peer.connected', data: {}} as IPayload);
      this.scene.start('setup');
    });

    const t = new Button(this, 'send', 380, 64, 120, 48);
    this.add.existing(t);
    t.on(MouseEvent.onClick, (p: any) => {
      // connection.connection.send({type: 'peer.ready', data: {x: p.x, y: p.y}} as IPayload);
    });

    const l = new Button(this, 'change scene', 360, 400, 280, 48);
    this.add.existing(l);
    l.on(MouseEvent.onClick, () => {
      this.scene.start('setup');
    });

    this.turnIndicator();

  }

  private turnIndicator() {
    let flag = false;
    const strokeWeight = 8;
    const indicator = this.add.rectangle(strokeWeight / 2, strokeWeight / 2, (this.sys.canvas.width / 2) - strokeWeight / 2, this.sys.canvas.height - strokeWeight).setOrigin(0);
    indicator.setStrokeStyle(strokeWeight);

    setInterval(()=>{
      indicator.strokeColor = flag ? 0x00FF00 : 0xFF0000;
      indicator.setX(flag ? strokeWeight / 2 : (this.sys.canvas.width / 2));
      flag = !flag;
    }, 560);

    this.tweens.add({
      targets: indicator,
      duration: 280,
      yoyo: true,
      repeat: -1,
      ease: 'Sine',
      alpha: {
        getStart: () => 1,
        getEnd: () => 0.4,
      },
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
