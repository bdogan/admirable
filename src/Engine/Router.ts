import { BaseObj } from './BaseObj';
import { Scene } from './Scene';

export interface IRoute {
  scene: typeof Scene;
  route: string;
}

export interface IActiveRoute {
  route: string;
  scene: Scene;
  params?: any[];
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
  private pActiveRoute?: IActiveRoute;
  public get ActiveRoute(): IActiveRoute | undefined {
    return this.pActiveRoute;
  }
  public set ActiveRoute(route: IActiveRoute | undefined) {
    this.emit('change', route, this.pActiveRoute);
    this.pActiveRoute = route;
  }

  /**
   * Router
   * @param routeConfig IRoute[]
   */
  constructor(routeConfig: IRoute[]) {

    // Call parent constructor
    super();

    // Route config
    this.routeConfig = routeConfig;

  }

  /**
   * On Change Router
   * @param fxn Onchange
   */
  public onChange(fxn: ((activeRoute: IActiveRoute, oldRoute: IActiveRoute) => void)) {
    this.on('change', (r, o) => fxn(r, o));
  }

  /**
   * Navigate Route
   * @param route string
   * @param args arguments
   */
  public navigate(route: string, ...args: any[]): Promise<IActiveRoute> {

    // Get route config
    const routeConfig = this.routeConfig.find((r) => r.route === route);

    // Check route
    if (!routeConfig) {
      const err = new Error(`Not Found suitable route for ${route}!`);
      this.Engine.Log('error', err);
      return Promise.reject(err);
    }

    // Detach old scene
    if (!!this.ActiveRoute) {
      this.ActiveRoute.scene.detach().then(() => this.Engine.Log('info', `Route ${this.ActiveRoute!.route} detached!`));
    }

    // Create scene
    const newScene = new routeConfig.scene(args);
    newScene.setup();
    return newScene.attach()
      .then(() => {
        const activeRoute = { route: routeConfig.route, scene: newScene };
        this.Engine.Log('info', `Route ${activeRoute.route} attached!`);
        return this.ActiveRoute = activeRoute;
      });
  }

}
