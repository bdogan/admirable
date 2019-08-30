import 'Phaser';
import { AdmirableGame } from './admirable.game';
import { AdmirableConfig } from './admirable.config';
import { DemoScene, MenuScene, GameScene, SetupScene } from './Scenes';

export const Game = new AdmirableGame(AdmirableConfig({
  scene: [
    DemoScene,
    MenuScene,
    GameScene,
    SetupScene
  ],
}));
