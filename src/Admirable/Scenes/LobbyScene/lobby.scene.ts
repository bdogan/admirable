import { AdmirableScene } from '../admirable.scene';
import { Peer } from '../../P2P/Peer';
import { Sender } from '../../P2P/Sender';
import { Receiver } from '../../P2P/Receiver';

@AdmirableScene({
  key: 'lobby'
})
export class LobbyScene extends Phaser.Scene {
  private name!: string;
  private peer: any;
  private connection: any;
  private receiver: any;
  private sender: any;

  public create() {
    this.name = 'test';
    // Create new peer
    this.peer = new Peer(this.name, {
      host: 'localhost',
      port: 9000,
      path: '/'
    });

    // Define player object
    const player = {
      type: 'player',
      name: this.name
    };

    // Define players array
    const players = [];

    // Add player object to players array
    players.push(player);

    // Set receiver
    this.receiver = new Receiver(this.peer);

    // Listen connection event
    this.receiver.on('connection', (conn: any) => {
        conn.on('data', (data: any) => {
            console.log(data);

            // Define enemy object
            const enemy = {
              type: 'enemy',
              name: data.name
            };

            // Add enemy object to players array
            players.push(enemy);
        });
    });
  }
}
