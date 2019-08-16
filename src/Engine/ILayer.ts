
import { Graphics } from 'p5';

export interface ILayer {

  sprites: Array<{ x: number, y: number, graphics: Graphics }>;
  setup(): void;
  draw(): void;

}
