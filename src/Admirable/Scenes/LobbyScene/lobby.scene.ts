import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Input } from '../../Objects/UI/Input';
import { Transmission } from '../../Objects/Transmission';
import { Table } from '../../Objects/UI/Table';

const axios = require('axios');
const storageConfig = require('../../storage.config').StorageConfig;

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

    transmission.host();

    const list: any[] = [];
    let objs: any;
    const buttons: Button[] = [];

    axios.get(storageConfig.url + '/online')
      .then((response: any) => {
        if (response.data.result !== undefined || response.data.result !== null || response.data.result !== {}) {
          objs = response.data.result;

          const ids = Object.keys(objs);
          const values = Object.values(objs);

          let a = 0;
          for (const i of ids) {
            /*list.push([
              i,
              objs[i].username,
              objs[i].time,
            ]);*/

            const button = new Button(this, objs[i].username, 300, a * 50 + 50, 500, 50);

            button.on(MouseEvent.onDown, (e: any) => {
              transmission.join(i);
              this.scene.start('setup');
            });

            this.add.existing(button);
            buttons.push(button);

            a++;
          }

          transmission.peer.on('connection', (c: any) => {
            this.scene.start('setup');
          });

          transmission.peer.on('disconnected  ', () => {
            axios.delete(storageConfig.url + '/online/' + transmission.peer.id);
          });

          if (window.closed) {
            axios.delete(storageConfig.url + '/online/' + transmission.peer.id);
          }

          /*
          const table = new Table(this, 10, 10, 600, 400, [['ID', 'Username', 'Time'], ...list]);

          table.showHead = true;

          this.add.existing(table);
           */
        }
      });

  }
}
