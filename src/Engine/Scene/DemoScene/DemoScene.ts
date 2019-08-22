import { Scene } from '../../Scene';
import { DemoLayer } from './Layer/DemoLayer';
import { DemoTextLayer } from './Layer/DemoTextLayer';

export class DemoScene extends Scene {

  public beforeAttach() {
    for (let i = 0; i <= 100; i++) {
      this.addLayer(DemoLayer);
    }
    this.addLayer(DemoTextLayer);
  }

}
