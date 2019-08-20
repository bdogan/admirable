import { Graphics, Image } from 'p5';
import { EventEmitter } from 'events';

export interface ISprite extends EventEmitter {
  x: number;
  y: number;
  graphics: Graphics | Image;
  zIndex?: number;
}
