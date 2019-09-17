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
/*
    const list: any[] = [];
    let objs: any;
    const buttons: Button[] = [];
    let ids: any[];
    let values: any[];
*/
    const scoreLabel = new Phaser.GameObjects.Text(this, 10, this.sys.canvas.height - 25, 'Username: ' + data.username, {
      fontFamily: 'Munro',
      fontSize: '20px',
      color: '#FFFFFF'
    });

    this.add.existing(scoreLabel);

    network.listOnline()
      .then((res) => {
        onlineList.push(res);
        console.log(onlineList);
        const buttons: Button[] = [];
      });
    /*
    network.listPotentialEnemies(transmission.peer.id).then((res) => {
      console.log(res);
    });
*/
    /*
    axios.get(storageConfig.url + '/online')
      .then((response: any) => {
        if (response.data.result !== undefined || response.data.result !== null || response.data.result !== {}) {
          objs = response.data.result;

          ids = Object.keys(objs);
          values = Object.values(objs);

          let a = 0;
          for (const i of values) {
            if (i.id === transmission.peer.id || i.id === null || i.id === undefined) {
              continue;
            }
            list.push([
              i,
              objs[i].username,
              objs[i].time,
            ]);

            const button = new Button(this, i.username, 300, a * 50 + 50, 500, 50);

            button.on(MouseEvent.onDown, (e: any) => {
              transmission.join(i.id);
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

          const table = new Table(this, 10, 10, 600, 400, [['ID', 'Username', 'Time'], ...list]);

          table.showHead = true;

          this.add.existing(table);

        }
      })
      .then(() => {
        const timeUpdater = setInterval(() => {
          axios.patch(storageConfig.url + '/online/' + transmission.peer.id, {
            time: Date.now()
          });
        }, 10000);

        const remover = setInterval(() => {
          values.forEach((e: any) => {
            if (e.time < (Date.now() - 60 * 1000)) {
              axios.delete(storageConfig.url + '/online/' + e.id);
            }
          });
        }, 1000);
      });
*/
  }
}
