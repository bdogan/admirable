import { Screen } from '../Screen';

export class World {

  /**
   * Game width
   */
  private width: number;

  /**
   * Game height
   */
  private height: number;

  /**
   * Game screen
   */
  private screen: Screen;

  /**
   * @param width Game width
   * @param height Game height
   */
  constructor(screen: Screen, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.screen = screen;
  }

}
