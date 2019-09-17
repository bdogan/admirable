import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
import { Input } from '../../Objects/UI/Input';
import { Transmission } from '../../Objects/Transmission';
const logoImg = require('./Images/admirable-logotype.png');
const battleshipImg = require('./Images/battleship.png');
const menuMusic = require('./Musics/admirable-menu.ogg');
const axios = require('axios');
const storageConfig = require('../../storage.config').StorageConfig;

const transmission = Transmission.getInstance();

@AdmirableScene({
  key: 'menu'
})
export class MenuScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;

  private music: any;

  // Preload
  public preload() {
    this.load.image('logo', logoImg);
    this.load.image('battleship', battleshipImg);
    this.load.audio('menu_music', menuMusic);
  }

  // Init
  public init(): void {
    console.log('MenuScene initialized');
  }

  // Create
  public create(): void {
    // Add music to scene
    this.music = this.sound.add('menu_music', {
      volume: .7,
      loop: true,
    });

    // Play music with condition
    if (!this.music.isPlaying) {
      this.music.play();
    }

    this.grid = this.add.graphics();

    const imgBattleShip = this.add.image(0, this.sys.game.canvas.height + 20, 'battleship');
    imgBattleShip.setOrigin(0, 1);

    const imgLogo = this.add.image(0, 0, 'logo');
    imgLogo.setPosition(this.sys.canvas.width / 2, -imgLogo.height);

    // Continuous animation for battleship.
    this.tweens.add({
      targets: [imgBattleShip],
      y: this.sys.game.canvas.height + 50,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,
      loop: -1
    });

    // Animation for logo entrance.
    this.tweens.add({
      targets: [imgLogo],
      y: {
        getStart: () => 0,
        getEnd: () => this.sys.canvas.height / 4
      },
      alpha: {
        getStart: () => 0,
        getEnd: () => 1
      },
      ease: 'Expo.easeOut',
      duration: 2000
    });

    const input = new Input(this, 'admirable', this.sys.canvas.width / 2 - 300 / 2, this.sys.canvas.height / 2.5, 300, 40);
    this.add.existing(input);

    // Add start button to the scene.
    const startButton = new Button(this, 'START', this.sys.canvas.width / 2, this.sys.canvas.height / 1.75);

    this.add.existing(startButton);

    transmission.init(null);
    startButton.disable();

    transmission.peer.on('open', () => {
      input.setText(transmission.peer.id);
      startButton.enable();
    });

    startButton.on(MouseEvent.onClick, (e: any) => {
      axios.post(storageConfig.url + '/online/' + transmission.peer.id, {
        username: input.text,
        time: Date.now()
      });

      this.scene.start('lobby');
      this.music.stop();
    });
  }

  // Update
  public update(time: number): void {
    this.drawHorizon(time);
  }

  // Horizontal lines.
  private drawHorizon(a: number) {

    let dt = a / 100000;
    const width  = this.sys.canvas.width,
          height = this.sys.canvas.height;

    const TWO_PI = Phaser.Math.PI2;
    const dA = TWO_PI / width;

    this.grid.clear();

    this.grid.lineStyle(1, 0x00A8E8, 0.5);
    for (let line = 0, lines = height; line < lines; line++) {

      const x1 = (line * 4), y1 = 0, x2 = x1, y2 = -200 + Math.tan(dt) * 50;

      this.grid.lineBetween(0, y2, width, y2);

      dt = (dt + dA);

    }

    this.grid.strokePath();
  }

}
