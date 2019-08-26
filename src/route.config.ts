import { IRoute } from './Engine/Router';
import { DemoScene } from './Engine/Scene/DemoScene/DemoScene';
import { MenuScene } from './Admirable/Scenes/Menu/Menu';
import { ComponentsScene } from './Admirable/Scenes/Components/Components';

export const RouteConfig: IRoute[] = [
  { route: 'main', scene: MenuScene },
  { route: 'demo', scene: DemoScene },
  { route: 'components', scene: ComponentsScene },
];
