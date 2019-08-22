import { BaseObj } from './BaseObj';
import { Scene } from './Scene';

export interface IRoute {
  scene: Scene;
  route: string;
}

/**
 * Router
 */
export class Router extends BaseObj {

  /**
   * Active scene
   */
  private pActiveRoute?: IRoute;
  public get ActiveRoute(): IRoute | undefined {
    return this.pActiveRoute;
  }
  public set ActiveRoute(route: IRoute | undefined) {
    this.emit('change', route, this.pActiveRoute);
    this.pActiveRoute = route;
  }

  /**
   * On Change Router
   * @param fxn Onchange
   */
  public onChange(fxn: ((activeRoute: IRoute, oldRoute: IRoute) => void)) {
    this.on('change', (r, o) => fxn(r, o));
  }

}
