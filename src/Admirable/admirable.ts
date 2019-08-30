import 'phaser';
import { AdmirableGame } from './admirable.game';
import { AdmirableConfig } from './admirable.config';
import { BootScene, MenuScene, GameScene, SetupScene } from './Scenes';

export const Game = new AdmirableGame(AdmirableConfig({
  scene: [
    BootScene,
    MenuScene,
    GameScene,
    SetupScene,
  ],
}));
