import { Scene } from '../../../Engine/Scene';
import {TableLayer} from './Layers/TableLayer';

export class ComponentsScene extends Scene {
  public beforeAttach() {
    return Promise.all([
      this.addLayer(TableLayer),
    ]);
  }
}
