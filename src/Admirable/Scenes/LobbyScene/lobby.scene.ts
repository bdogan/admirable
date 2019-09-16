import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Input } from '../../Objects/UI/Input';
import { Transmission } from '../../Objects/Transmission';

const lobbyMusic = require('./Musics/admirable-lobby.ogg');

const transmission = Transmission.getInstance();

@AdmirableScene({
  key: 'lobby'
})
export class LobbyScene extends Phaser.Scene {

  private music: any;

  public preload(): void {
    this.load.audio('lobby_music', lobbyMusic);
  }

  // Create
  public create(): void {

    // Add music to scene
    this.music = this.sound.add('lobby_music', {
      volume: .7,
      loop: true,
    });

    // Play music with condition
    if (!this.music.isPlaying) {
      this.music.play();
    }

    /*
    Host Input
     */
    const input = new Input(this, 'admirable', this.sys.canvas.width / 2 - 256 / 2, this.sys.canvas.height / 3.5, 256, 40);
    this.add.existing(input);

    /*
    Host button
     */
    const hostButton = new Button(this, 'Host', this.sys.canvas.width / 2, this.sys.canvas.height / 2);
    this.add.existing(hostButton);

    // Host button click event
    hostButton.on(MouseEvent.onClick, (e: any) => {
      transmission.init(input.text, true);

      // Start scene
      this.scene.start('host');
    });

    /*
    Join button
     */
    const joinButton = new Button(this, 'Join', this.sys.canvas.width / 2, this.sys.canvas.height / 1.5);
    this.add.existing(joinButton);

    // Join button click event
    joinButton.on(MouseEvent.onClick, (e: any) => {
      transmission.init(null, false);

      // Start scene
      this.scene.start('join', { remoteId: input.text });
    });
  }
}
