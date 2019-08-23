import { Scene } from '../../../Engine/Scene';
import { GridLayer } from './Layers/GridLayer';
import { LayoutLayer} from './Layers/LayoutLayer';

export class MenuScene extends Scene {

  public beforeAttach() {
    return Promise.all([
      this.addLayer(GridLayer),
      this.addLayer(LayoutLayer),
    ]);
  }

}
