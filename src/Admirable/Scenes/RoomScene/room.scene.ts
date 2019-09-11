import { AdmirableScene } from '../admirable.scene';
import { Peer } from '../../Objects/P2P';

@AdmirableScene({
  key: 'room'
})
export class RoomScene extends Phaser.Scene {
  private peer!: Peer;
  private connection: any;
  private localId: any;
  private remoteId: any;
  private isHost: boolean = true;
  private status!: Phaser.GameObjects.Text;

  public create(data: any): void {
    this.isHost = data.isHost;

    this.status = new Phaser.GameObjects.Text(this, 100, 100, '', {
      fontFamily: 'Munro',
      fontSize: '32px',
      color: '#FFFFFF',
    });

    this.add.existing(this.status);

    if (this.isHost) {
      this.host(data);
    } else {
      this.join(data);
    }

    this.input.on('pointermove', (e: any) => {
      if ((this.connection !== undefined) && (this.connection !== null)) {
        this.connection.send({ x: e.x, y: e.y, text: 'x: ' + e.x + ' y: ' + e.y });
      }
    });
  }

  private host(data: any) {
    this.peer = data.peer;
    this.localId = data.localId;

    this.status.text = 'Waiting partner...';

      // Peer connection event
    this.peer.on('connection', (c) => {
      c.on('data', (d) => {
        this.status.text = d.text;
        console.log(d);
      });

      if (this.connection) {
        c.on('open', () => {
          c.send({ text: 'Connected already.' });
          setTimeout(() => {
            c.close();
          }, 500);
        });
        return;
      }

      // Set global connection variable
      this.connection = c;
      this.status.text = 'Connected to: ' + this.connection.peer;

      const testData = {
        text: 'Hello from receiver'
      };

      setTimeout(() => {
        this.connection.send(testData);
      }, 3000);

    });

  }

  private join(data: any): void {
    this.peer = data.peer;
    this.localId = data.localId;
    this.remoteId = data.remoteId;

    // If there's a connection already close it
    if (this.connection) {
      this.connection.close();
    }

    // Connect to remote peer
    this.connection = this.peer.connect(this.remoteId, {
      reliable: false
    });

    // Link open event
    this.connection.on('open', () => {
      this.status.text =  'Connected to: ' + this.connection.peer;

      const testData = {
        text: 'Hello from sender'
      };

      setTimeout(() => {
        this.connection.send(testData);
      }, 3000);
    });

    this.connection.on('data', (d: { x: number, y: number, text: string }) => {
      this.status.text =  d.text;
      console.log(d);
    });

    // Peer close event
    this.peer.on('close', () => {
      this.connection = null;
      this.status.text = 'Link destroyed.';
    });

    // Peer error handler
    this.peer.on('error', (err) => {
      this.status.text = err;
    });
  }
}
