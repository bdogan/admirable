import { Screen } from './Engine/Screen';
import { DemoScene } from './Engine/Scene/DemoScene/DemoScene';

const screen = new Screen(800, 600);

screen.setScene(new DemoScene());
