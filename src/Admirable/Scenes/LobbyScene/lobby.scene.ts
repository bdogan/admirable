import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Transmission } from '../../Objects/Transmission';
import { Network } from '../../Objects/Network/network.object';
import { Notification } from '../../Objects/UI/Notification';
import { player } from '../../Objects/Player';
import { gameState, Turn } from '../../Objects/GameState';

const lobbyMusic = require('./Musics/admirable-lobby.ogg');

const transmission = Transmission.getInstance();
const network = Network.getInstance();

@AdmirableScene({
  key: 'lobby'
})
export class LobbyScene extends Phaser.Scene {

  private music: any;

  public preload(): void {
    this.load.audio('lobby_music', lobbyMusic);
  }

  public init() {
    player.scene = this;
  }

  // Create
  public create(data: any): void {

    // Add music to scene
    this.music = this.sound.add('lobby_music', {
      volume: .7,
      loop: true,
    });

    // Play music with condition
    if (!this.music.isPlaying) {
      this.music.play();
    }

    transmission.host();

    const onlineList: any[] = [];

    const usernameLabel = new Phaser.GameObjects.Text(this, 10, this.sys.canvas.height - 25, 'Username: ' + data.username, {
      fontFamily: 'Munro',
      fontSize: '20px',
      color: '#FFFFFF'
    });

    network.listPotentialEnemies(transmission.peer.id)
    .then((res) => {
        onlineList.push(...res);
        const buttons: Button[] = [];

        let a = 0;
        res.forEach((e) => {
            const button = new Button(this, `${e.username} - ${e.id}`, this.sys.canvas.width / 2, a * 50 + 50, 800, 50);

            button.on(MouseEvent.onDown, (i: any) => {
              transmission.join(e.id);
              this.scene.start('setup');
            });

            this.add.existing(button);
            buttons.push(button);

            a++;
        });

        this.add.existing(usernameLabel);
    })
    .then(() => {
        transmission.peer.on('connection', (c: any) => {
          // Notification.create('An Enemy Connected');

          // host goes first:
          gameState.turn = Turn.player;

          // Doesn't work here...
          // this.flipCoin();
          this.scene.start('setup');
        });

        const updater = setInterval(() => {
          network.updateLastSeen(transmission.peer.id);
        }, 60);

        const remover = setInterval(() => {
          network.clearOffline();
        }, 120);
    });

  }

//   /**
//    * Decide who goes first. Host flip's the coin when a peer connected.
//    */
//   private flipCoin(): void {

//     const coin: boolean = Math.random() < 0.5;

//     // if true, host goes first.
//     if (coin) {
//       gameState.turn = Turn.player;
//     }

//     // notify the peer about who goes first.
//     transmission.transmit({type: 'game.turn', data: {turn: gameState.turn}});

//   }

}
