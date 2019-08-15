import { Layer } from './Layer';

export class Scene {

  public layers: Layer[];

  constructor(layers: Layer[]) {
    this.layers = layers;
  }

}
