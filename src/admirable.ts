import * as Phaser from 'phaser';
import { BootScene } from './Admirable/Scenes/BootScene';
import { MenuScene } from './Admirable/Scenes/MenuScene';
import { GameScene } from './Admirable/Scenes/GameScene';

const AdmirableConfig: Phaser.Types.Core.GameConfig = {
  title: 'Admirable',
  version: '0.1.0',
  url: 'https://github.com/bdogan/admirable',
  parent: 'admirable', // Wrapper id in the html file.
  type: Phaser.AUTO,
  backgroundColor: '#003459',
  autoFocus: true,
  disableContextMenu: true,
  scene: [BootScene, MenuScene, GameScene],
  fps: {
    target: 60,
  },
  input: {
    gamepad: false,
    keyboard: true,
    mouse: true,
    touch: false,
  },
  banner: {
    background: ['#00A8E8', '#007EA7', '#003459', '#00171F'],
    hidePhaser: true,
  },
  scale: {
    height: 480,
    resolution: 1,
    width: 960,
    zoom: 1,
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

const game = new Game(AdmirableConfig);
