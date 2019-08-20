import { Screen } from './Engine/Screen';
import { DemoScene } from './Engine/Scene/DemoScene/DemoScene';
import { MenuScene } from './Admirable/Scenes/Menu/Menu';

const screen = new Screen(800, 600, true);
export const menu =  MenuScene.getInstance;
export const demoS = new DemoScene();
// const layer = new DemoScene();
// screen.setScene(new DemoScene());
screen.setScene(menu);
