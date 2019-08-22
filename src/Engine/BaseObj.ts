import { EventEmitter } from 'events';
import { Engine, AppEngine } from './Engine';

/**
 * Base object
 */
export class BaseObj extends EventEmitter {

  /**
   * Root Engine
   */
  protected Engine: Engine = AppEngine;

}
