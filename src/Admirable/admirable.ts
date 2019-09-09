import 'phaser';
import { AdmirableGame } from './admirable.game';
import { AdmirableConfig } from './admirable.config';
import { DemoScene, MenuScene, GameScene, SetupScene } from './Scenes';

export const Game = document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    return new AdmirableGame(AdmirableConfig({
      scene: [
        SetupScene,
        DemoScene,
        MenuScene,
        GameScene,
      ],
    }));
  }
};
