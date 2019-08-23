import { AppEngine, IEngineOptions } from './Engine/Engine';
import { Router } from './Engine/Router';
import { Screen } from './Engine/Screen';
import { RouteConfig } from './route.config';

/**
 * App Engine Init
 */

const options: IEngineOptions = {
  Debug: true,
};

AppEngine.Init({
  Options: options,
  Router: new Router(RouteConfig),
  Screen: new Screen(800, 600),
});

AppEngine.Run();

AppEngine.Router.navigate('main');

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
