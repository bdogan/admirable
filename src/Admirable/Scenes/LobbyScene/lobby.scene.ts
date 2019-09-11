import { AdmirableScene } from '../admirable.scene';
import { Peer } from '../../Objects/P2P';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Input } from '../../Objects/UI/Input';
import { Link } from '../../Objects/P2P/Link';

@AdmirableScene({
  key: 'lobby'
})
export class LobbyScene extends Phaser.Scene {
  private peer: Peer | null = null;
  private connection: any | null = null;
  private localId: any;
  private remoteId: any;

  // Create
  public create() {
    /*
    Host Input
     */
    const input = new Input(this, 'test123', this.sys.canvas.width / 2 - 256 / 2, this.sys.canvas.height / 3.5, 256, 40);
    this.add.existing(input);

    /*
    Host button
     */
    const hostButton = new Button(this, 'Host', this.sys.canvas.width / 2, this.sys.canvas.height / 2);
    this.add.existing(hostButton);

    // Host button click event
    hostButton.on(MouseEvent.onClick, (e: any) => {
      // Create a peer
      this.peer = new Peer(input.text || null, {
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
          this.localId = this.peer.id;
        }

        console.log(this.localId);

        // const link = new Link(false, this.peer, this.localId);

        this.scene.start('room', { peer: this.peer, localId: this.localId, isHost: true });
      });

    });

    /*
    Join Input
     */
    // const joinInput = new Input(this, 'test123', this.sys.canvas.width / 2 - 256 / 2, this.sys.canvas.height / 2, 256, 40);
    // this.add.existing(joinInput);

    /*
    Join button
     */
    const joinButton = new Button(this, 'Join', this.sys.canvas.width / 2, this.sys.canvas.height / 1.5);
    this.add.existing(joinButton);

    // Join button click event
    joinButton.on(MouseEvent.onClick, (e: any) => {
      // Get remote peer id from prompt
      this.remoteId = input.text;

      // Create a peer
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
          this.localId  = this.peer.id;
        }
      });

      // const link = new Link(false, this.peer, this.localId, this.remoteId);

      this.scene.start('room', { peer: this.peer, localId: this.localId, remoteId: this.remoteId, isHost: false });
    });
  }
}
