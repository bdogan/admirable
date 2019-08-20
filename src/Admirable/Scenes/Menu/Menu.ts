import { Scene } from '../../../Engine/Scene';
import { GridLayer } from './Layers/GridLayer';
import { InfoLayer } from '../../../Engine/Layer/InfoLayer';
import { LayoutLayer} from './Layers/LayoutLayer';

export class MenuScene extends Scene {

  private static instance: MenuScene;

  public static get getInstance(): MenuScene {
    if (!MenuScene.instance ) {
      MenuScene.instance = new MenuScene();
    }
    return MenuScene.instance;
  }

  private layout: LayoutLayer;
  private grid: GridLayer;
  constructor() {
    super();
    this.layout = new LayoutLayer();
    this.grid = new GridLayer();
  }
  public setup() {
    // this.addLayer(new GridLayer());
    // this.addLayer(new LayoutLayer());
    this.addLayer(this.grid);
    this.addLayer(this.layout);
  }
}
