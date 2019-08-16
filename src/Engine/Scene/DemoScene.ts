import { Scene } from '../Scene';
import { DemoLayer } from './Layer/DemoLayer';
import { Screen } from '../Screen';
import { DemoTextLayer } from './Layer/DemoTextLayer';

export class DemoScene extends Scene {

  public setup() {
    for (let i = 0; i <= 100; i++) {
      this.addLayer(new DemoLayer());
    }
    this.addLayer(new DemoTextLayer());
  }

}
