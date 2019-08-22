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
   * Route config
   */
  private routeConfig: IRoute[];

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
   * Router
   * @param routeConfig IRoute[]
   */
  constructor(routeConfig: IRoute[]) {
    super();
    // Route config
    this.routeConfig = routeConfig;
  }

  /**
   * On Change Router
   * @param fxn Onchange
   */
  public onChange(fxn: ((activeRoute: IRoute, oldRoute: IRoute) => void)) {
    this.on('change', (r, o) => fxn(r, o));
  }

  public navigate(route: string, ...args: any[]) {
    // Get route config
    const routeConfig = this.routeConfig.find((r) => r.route === route);

    // Check route
    if (!routeConfig) {
      return this.Engine.Log('error', new Error(`Not Found suitable route for ${route}!`));
    }

    // Set active route
    routeConfig.scene.params = args;
    this.ActiveRoute = routeConfig;

  }

}
