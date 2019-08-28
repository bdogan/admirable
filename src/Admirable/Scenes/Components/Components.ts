import { Scene } from '../../../Engine/Scene';
import {TableLayer} from './Layers/TableLayer';
import { InputLayer } from './Layers/InputLayer';

export class ComponentsScene extends Scene {
  public beforeAttach() {
    return Promise.all([
      this.addLayer(TableLayer),
      this.addLayer(InputLayer),
    ]);
  }
}
