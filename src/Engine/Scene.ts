import { Sprite } from './Sprite';
import { Layer } from './Layer';
import { BaseObj } from './BaseObj';
import { flatten, orderBy } from 'lodash';
import _ from 'lodash';

// Create resolver
const r = Promise.resolve();

/**
 * Scene
 */
export class Scene extends BaseObj {

  /**
   * Params
   */
  public params: any[] = [];

  /**
   * Scene Layers
   */
  private pLayers: Layer[] = [];
  public get layers(): Layer[] {
    return this.pLayers;
  }

  /**
   * Sprites
   */
  public get sprites(): Sprite[] {
    return flatten(this.pLayers.map((l) => orderBy(l.sprites, 'zIndex')));
  }

  constructor(params: any[] = []) {
    super();
    this.params = params;
  }

  /**
   * Adds a new layer
   * @param layer Layer
   */
  public addLayer<T>(layerType: typeof Layer): Promise<T> {
    const layer = new layerType();
    layer.setup();
    return (layer.beforeAttach() || Promise.resolve())
      .then(() => this.layers.push(layer))
      .then(() => layer);
  }

  /**
   * Remove Layers
   * @param layer Layer
   */
  public removeLayer(layer: Layer): Promise<any> {
    const index = this.pLayers.indexOf(layer);
    if (index === -1) {
      return Promise.resolve(layer);
    }
    return layer.detach()
      .then(() => this.layers.splice(index, 1))
      .then(() => layer.destroy());
  }

  /**
   * Destroy
   */
  public destroy() {
    delete(this.pLayers);
    this.pLayers = [];
  }

  /**
   * Detach
   */
  public detach(): Promise<any> {
    return Promise.all(this.pLayers.map((l) => this.removeLayer(l)))
      .then(() => (this.beforeDetach() || r))
      // Remove old scenes event listeners.
      .then(() => this.Engine.Screen.removeAllListeners())
      .then(() => this.destroy());
  }

  /**
   * Attach
   */
  public attach(): Promise<Scene> {
    return Promise.all(this.pLayers.map((l) => l.attach()))
      .then(() => (this.beforeAttach() || r))
      .then(() => this.afterAttach())
      .then(() => this);
  }


  /**
   * Update
   */
  public doUpdate(): Promise<any> {
    return Promise.all(this.pLayers.map((l) => l.doUpdate()))
      .then(() => (this.update() || r))
      .then(() => this);
  }

  /**
   * Hooks
   */
  public setup(): any { return; }
  public beforeAttach(): Promise<any> | any { return; }
  public beforeDetach(): Promise<any> | any { return; }
  public update(): Promise<any> | any { return; }

  // run after attached.
  private afterAttach(): Promise<any> {
    return this.orderZIndex();
  }

  private orderZIndex(): Promise<any> {

    // this.pLayers.forEach((l) => l.sprites = _.orderBy(l.sprites, 'zIndex'));

    console.log(this.pLayers);
    this.pLayers = _.orderBy(this.pLayers, 'zIndex');
    console.log(this.pLayers);
    return Promise.resolve(true);
  }

}
