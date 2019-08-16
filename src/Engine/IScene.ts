import { ILayer } from './ILayer';

export interface IScene {

  layers: ILayer[];
  setup(): void;

}
