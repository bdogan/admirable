import { AdmirableScene } from '../admirable.scene';
import { Peer } from '../../P2P';

@AdmirableScene({
  key: 'room'
})
export class RoomScene extends Phaser.Scene {
  private peer!: Peer;
  private connection: any;
  private localId: any;
  private remoteId: any;
  private isHost: boolean = true;

  public create(data: any): void {
    if (data.host) {
      this.host(data);
    }
    else {
      this.join(data);
    }
  }

  private host(data: any) {
    this.peer = data.peer;
    this.localId = data.localId;

    // Peer connection event
    this.peer.on('connection', (c) => {
      c.on('data', (d) => {
        console.log(d);
      });

      if (this.connection) {
        c.on('open', () => {
          c.send('Connected already.');
          setTimeout(() => {
            c.close();
          }, 500);
        });
        return;
      }

      // Set global connection variable
      this.connection = c;
      console.log('Connected to: ' + this.connection.peer);

      const testData = {
        world: 'hello'
      };

      setTimeout(() => {
        this.connection.send(testData);
      }, 1000);
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

    // Connection open event
    this.connection.on('open', () => {
      console.log('Connected to: ' + this.connection.peer);

      const testData = {
        hello: 'world'
      };

      this.connection.send(testData);
    });

    this.connection.on('data', (d: any) => {
      console.log(d);
    });

    // Peer close event
    this.peer.on('close', () => {
      this.connection = null;
      console.log('Connection destroyed.');
    });

    // Peer error handler
    this.peer.on('error', (err) => {
      console.log(err);
    });
  }
}
