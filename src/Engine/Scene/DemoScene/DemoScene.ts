import { Scene } from '../../Scene';
import { DemoLayer } from './Layer/DemoLayer';
import { DemoTextLayer } from './Layer/DemoTextLayer';
import { range } from 'lodash';

export class DemoScene extends Scene {

  public beforeAttach() {
    return Promise.all([
      Promise.all(range(100).map(() => this.addLayer(DemoLayer))),
      this.addLayer(DemoTextLayer),
    ]);
  }

}
