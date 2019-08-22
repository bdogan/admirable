import { Layer } from './Layer';
import { BaseObj } from './BaseObj';

export class Scene extends BaseObj {

  public layers: Layer[] = [];

  public params: any[] = [];

  public addLayer(layer: Layer): Promise<Layer> {
    return (layer.beforeAttach() || Promise.resolve())
      .then(() => this.layers.push(layer))
      .then(() => layer);
  }

  /**
   * Root Hooks
   */
  public beforeAttach(): Promise<any> | any {
    return (this.onBeforeAttach() || Promise.resolve())
      .then(() => Promise.all(this.layers.map((l) => l.beforeAttach() || Promise.resolve())));
  }
  public beforeDetach(): Promise<any> | any {
    this.layers = [];
    return (this.onBeforeDetach() || Promise.resolve())
      .then(() => Promise.all(this.layers.map((l) => l.beforeDetach() || Promise.resolve())));
  }
  public update(): Promise<any> | any {
    return (this.onUpdate() || Promise.resolve())
      .then(() => Promise.all(this.layers.map((l) => l.update() || Promise.resolve())));
  }

  /**
   * Hooks
   */
  protected onBeforeAttach(): Promise<any> | any { return; }
  protected onBeforeDetach(): Promise<any> | any { return; }
  protected onUpdate(): Promise<any> | any { return; }

}
