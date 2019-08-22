import { Layer } from './Layer';
import { BaseObj } from './BaseObj';

export class Scene extends BaseObj {

  public layers: Layer[] = [];

  public addLayer(layer: Layer) {
    layer.scene = this;
    layer.setup();
    this.layers.push(layer);
  }

  /**
   * Hooks
   */
  public beforeAttach(): Promise<void> | void { return; }
  public beforeDetach(): Promise<void> | void { return; }
  public update(): Promise<void> | void { return; }

}
