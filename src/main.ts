import { AppEngine, IEngineOptions } from './Engine/Engine';
import { Router } from './Engine/Router';
import { Screen } from './Engine/Screen';

/**
 * App Engine Init
 */

const options: IEngineOptions = {
  Debug: true,
};

AppEngine.Init({
  Options: options,
  Router: new Router(),
  Screen: new Screen(800, 600),
});

/*
import { Screen } from './Engine/Screen';
import { DemoScene } from './Engine/Scene/DemoScene/DemoScene';
import { MenuScene } from './Admirable/Scenes/Menu/Menu';

const screen = new Screen(800, 600, true);
export const menu = new MenuScene(); // MenuScene.getInstance;
export const demoS = new DemoScene();
// const layer = new DemoScene();
// screen.setScene(new DemoScene());
screen.setScene(menu);*/
