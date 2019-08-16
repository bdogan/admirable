
import { Graphics } from 'p5';
import { ISprite } from './ISprite';

export interface ILayer {

  sprites: ISprite[];
  setup(): void;
  update(): void;

}
