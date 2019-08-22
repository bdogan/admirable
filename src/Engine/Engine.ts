import { Router } from './Router';
import { Screen } from './Screen';
import p5, { Renderer } from 'p5';
import { EventEmitter } from 'events';

export interface IEngineOptions {
  Debug: boolean;
}

export interface IEngineElements {
  Options: IEngineOptions;
  Router: Router;
  Screen: Screen;
}

/**
 * Engine
 */
export class Engine extends EventEmitter {

  /**
   * Screen
   */
  public get Screen(): Screen {
    return this.elements.Screen;
  }

  /**
   * Router
   */
  public get Router(): Router {
    return this.elements.Router;
  }

  /**
   * p5 instance
   */
  public get p5(): p5 {
    return this.Screen.p5;
  }

  /**
   * RootCanvas
   */
  public get RootCanvas(): Renderer {
    return this.Screen.RootCanvas;
  }

  /**
   * Options
   */
  public get Options(): IEngineOptions {
    return this.elements.Options;
  }

  /**
   * Elements
   */
  private elements!: IEngineElements;

  /**
   * Engine Init
   * @param elements IEngineElements
   */
  public Init(elements: IEngineElements): void {
    // console.log(elements);
    this.elements = elements;
    this.emit('init.engine', this);
  }

  public Log(type: string, message: any) {
    if (!this.Options.Debug) {
      return;
    }
    switch (type) {
      case 'log': console.log(message);
      case 'warn': console.warn(message);
      case 'dir': console.dir(message);
      case 'info': console.info(message);
      case 'error': console.error(message);
      default: this.Log('error', `Log type ${type} not found!`);
    }
  }
}

/**
 * Export AppEngine
 */
export const AppEngine = new Engine();
