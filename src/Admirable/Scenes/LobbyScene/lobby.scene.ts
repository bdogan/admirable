import { AdmirableScene } from '../admirable.scene';
import { Peer } from '../../P2P';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Input } from '../../Objects/UI/Input';

@AdmirableScene({
  key: 'lobby'
})
export class LobbyScene extends Phaser.Scene {
  private peer: Peer | null = null;
  private connection: any | null = null;
  private lastPeerId: any;
  private remotePeerId: any;

  // Create
  public create() {

    /*
    Input
     */
    const input = new Input(this, 'Test', this.sys.canvas.width / 2 - 256 / 2, this.sys.canvas.height / 2, 256, 40);
    this.add.existing(input);

    /*
    Host button
     */
    const hostButton = new Button(this, 'Host', this.sys.canvas.width / 2, this.sys.canvas.height / 3);
    this.add.existing(hostButton);

    // Host button click event
    hostButton.on(MouseEvent.onClick, (e: any) => {
      // Create a peer with random name
      this.peer = new Peer(null, {
        debug: 2,
        config: {
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            }
          ]
        }
      });

      // Peer open event
      this.peer.on('open', (id) => {
        if (this.peer !== null) {
          this.lastPeerId = this.peer.id;
        }

        input.setText(this.lastPeerId);
        console.log(this.lastPeerId);

        this.scene.start('room', { peer: this.peer, localId: this.lastPeerId, host: true });
      });

    });

    /*
    Join button
     */
    const joinButton = new Button(this, 'Join', this.sys.canvas.width / 2, this.sys.canvas.height / 1.5);
    this.add.existing(joinButton);

    // Join button click event
    joinButton.on(MouseEvent.onClick, (e: any) => {
      // Get remote peer id from prompt
      this.remotePeerId = input.text;

      // Create a peer with random name
      this.peer = new Peer(null, {
        debug: 2,
        config: {
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            }
          ]
        }
      });

      // Peer open event
      this.peer.on('open', (id) => {
        if (this.peer !== null) {
          this.lastPeerId  = this.peer.id;
        }
      });

      this.scene.start('room', {peer: this.peer, localId: this.lastPeerId, remoteId: this.remotePeerId, host: false});
    });
  }
}
