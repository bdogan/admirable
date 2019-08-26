import { Scene } from '../../../Engine/Scene';
import {TableLayer} from './Layers/TableLayer';

export class ComponentsScene extends Scene {
  public beforeAttach() {
    return this.addLayer(TableLayer);
  }
}
