import 'Phaser';
import { AdmirableGame } from './admirable.game';
import { AdmirableConfig } from './admirable.config';
import { MenuScene, GameScene, SetupScene } from './Scenes';

export const Game = new AdmirableGame(AdmirableConfig({
  scene: [
    MenuScene,
    GameScene,
    SetupScene,
  ],
}));
