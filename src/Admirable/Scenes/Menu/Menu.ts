import { Scene } from "../../../Engine/Scene";
import { GridLayer } from "./Layers/GridLayer";
import { InfoLayer } from "../../../Engine/Layer/InfoLayer";
import { LayoutLayer } from "./Layers/LayoutLayer";

export class MenuScene extends Scene {
  public setup() {
    this.addLayer(new GridLayer());
    this.addLayer(new LayoutLayer());
  }
}
