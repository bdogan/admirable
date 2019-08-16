import { Graphics, Image } from 'p5';

export interface ISprite {
  x: number;
  y: number;
  graphics: Graphics | Image;
}
