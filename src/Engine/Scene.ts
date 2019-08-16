
import { IScene } from './IScene';
import { Screen } from './Screen';
import { Layer } from './Layer';

export class Scene implements IScene {

  public layers: Layer[] = [];

  public screen!: Screen;

  public addLayer(layer: Layer) {
    layer.scene = this;
    layer.setup();
    this.layers.push(layer);
  }

  // tslint:disable-next-line: no-empty
  public setup() { }

  // tslint:disable-next-line: no-empty
  public update() {
    this.layers.forEach((l) => setTimeout(() => l.update(), 0));
  }

}
