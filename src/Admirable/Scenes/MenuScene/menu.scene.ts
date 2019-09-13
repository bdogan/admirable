import { AdmirableScene } from '../admirable.scene';
import { Button, MouseEvent } from '../../Objects/UI/Button';
const logoImg = require('./Images/admirable-logotype.png');
const battleshipImg = require('./Images/battleship.png');
const menuMusic = require('./Musics/admirable-menu.ogg');

@AdmirableScene({
  key: 'menu'
})
export class MenuScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;

  public preload() {
    this.load.image('logo', logoImg);
    this.load.image('battleship', battleshipImg);
    this.load.audio('menu_music', menuMusic);
  }

  public init(): void {
    console.log('MenuScene initialized');
  }

  // Create
  public create(): void {

    const music = this.sound.add('menu_music', {
      volume: .7,
      loop: true,
    });
    music.play();

    this.grid = this.add.graphics();

    const imgBattleShip = this.add.image(0, this.sys.game.canvas.height + 20, 'battleship');
    imgBattleShip.setOrigin(0, 1);

    const imgLogo = this.add.image(0, 0, 'logo');
    imgLogo.setPosition(this.sys.canvas.width / 2, -imgLogo.height);

    // Continuous animation for batlleship.
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

    // Add start button to the scene.
    const startButton = new Button(this, 'START', 960 / 2, 480 / 2);

    this.add.existing(startButton);

    startButton.on(MouseEvent.onClick, (e: any) => {
      this.scene.start('lobby');
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
