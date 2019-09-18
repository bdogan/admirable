import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Input } from '../../Objects/UI/Input';
import { Transmission } from '../../Objects/Transmission';
import { Table } from '../../Objects/UI/Table';
import { player } from '../../Objects/Player';
import { Network } from '../../Objects/Network/network.object';

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

    const scoreLabel = new Phaser.GameObjects.Text(this, 10, this.sys.canvas.height - 25, 'Username: ' + data.username, {
      fontFamily: 'Munro',
      fontSize: '20px',
      color: '#FFFFFF'
    });

    this.add.existing(scoreLabel);

    console.log(network.username);

    network.listPotentialEnemies(transmission.peer.id)
    .then((res) => {
        onlineList.push(...res);
        const buttons: Button[] = [];

        let a = 0;
        res.forEach((e) => {
            const button = new Button(this, `${e.username} - ${e.id}`, this.sys.canvas.width / 2, a * 50 + 50, 800, 50);

            button.on(MouseEvent.onDown, (e: any) => {
              transmission.join(e.id);
              this.scene.start('setup');
            });

            this.add.existing(button);
            buttons.push(button);

            a++;
        });

    })
    .then(() => {
        transmission.peer.on('connection', (c: any) => {
          this.scene.start('setup');
        });

        const updater = setInterval(() => {
          network.updateLastSeen(transmission.peer.id);
        }, 60);
    });

  }
}
