import { AppEngine, IEngineOptions } from './Engine/Engine';
import { Router } from './Engine/Router';
import { Screen } from './Engine/Screen';
import { RouteConfig } from './route.config';

/**
 * App Engine Init
 */

const options: IEngineOptions = {
  Debug: true,
};

AppEngine.Init({
  Options: options,
  Router: new Router(RouteConfig),
  Screen: new Screen(800, 600),
});

AppEngine.Run();

AppEngine.Router.navigate('components');
