import { IRoute } from './Engine/Router';
import { DemoScene } from './Engine/Scene/DemoScene/DemoScene';
import { MenuScene } from './Admirable/Scenes/Menu/Menu';

export const RouteConfig: IRoute[] = [
  { route: 'main', scene: MenuScene },
];
