import { Screen } from './Engine/Screen';
import { DemoLayer } from './Engine/Layers/DemoLayer';
import { Scene } from './Engine/Scene';

const screen = new Screen(64, 32);

screen.setScene(new Scene([ new DemoLayer(screen.dimensions()) ]));
