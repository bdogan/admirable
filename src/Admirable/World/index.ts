import { Screen } from '../Screen';

export class World {

  /**
   * Game screen
   */
  private screen: Screen;

  /**
   * @param width Game width
   * @param height Game height
   */
  constructor(screen: Screen) {
    this.screen = screen;
  }

}
