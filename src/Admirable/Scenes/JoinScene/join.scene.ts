import { AdmirableScene } from '../admirable.scene';
import { Transmission } from '../../Objects/Transmission';

const transmission = Transmission.getInstance();

@AdmirableScene({
  key: 'join'
})
export class JoinScene extends Phaser.Scene {
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

    // Join remote client
    transmission.join(data.remoteId);

    this.status.text = 'Trying connect to: ' + data.remoteId;

    // Peer open event
    transmission.connection.on('open', (c: any) => {
      console.log(c);
      this.status.text = 'Connected to: ' + transmission.remoteId;

      // If a connection already opened
      transmission.connection.on('open', () => {
        transmission.connection.send({text: 'Connected already.'});
        setTimeout(() => {
          transmission.connection.close();
        }, 500);
      });

      // Change scene after 3 minutes
      setTimeout(() => {
        this.scene.start('setup');
      }, 1000);
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
