import { IRoute } from './Engine/Router';
import { DemoScene } from './Engine/Scene/DemoScene/DemoScene';

export const RouteConfig: IRoute[] = [
  { route: 'main', scene: new DemoScene() },
];
