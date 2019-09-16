import { AdmirableScene } from '../admirable.scene';
import { Transmission } from '../../Objects/Transmission';

const transmission = Transmission.getInstance();

@AdmirableScene({
  key: 'host'
})
export class HostScene extends Phaser.Scene {
  private status!: Phaser.GameObjects.Text;

  // Create
  public create(data: any): void {

    // Create a status text label
    this.status = new Phaser.GameObjects.Text(this, 100, 100, '', {
      fontFamily: 'Munro',
      fontSize: '32px',
      color: '#FFFFFF',
    });

    this.add.existing(this.status);

    // Placeholder text
    this.status.text = 'Waiting partner... Host: ' + transmission.localId;

    // Host client
    transmission.host();

    // Peer connection event
    transmission.peer.on('connection', (c: any) => {
    // If connected
    if (transmission.connection) {
      this.status.text = 'Connected to: ' + transmission.remoteId;

      // Change scene after 1 minutes
      setTimeout(() => {
        this.scene.start('setup');
      }, 1000);

      // Host data receiving event
      transmission.connection.on('data', (d: any) => {
        this.status.text = d.text;
        console.log(d);
      });
      }
    });

    // Peer error handler
    transmission.peer.on('error', (err) => {
      this.status.text = err;
      setTimeout(() => {
        this.scene.start('menu');
      }, 3000);
    });
  }
}
