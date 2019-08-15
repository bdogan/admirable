import { Layer } from '../Layer';
import { Tile } from '../Tile';
import { Pixel } from '../Pixel';

export class DemoLayer extends Layer {

  private width: number;
  private height: number;

  constructor(dimensions: { width: number, height: number }) {
    super();
    this.width = dimensions.width;
    this.height = dimensions.height;
  }

  public generateTiles(): Tile[] {
    const tiles = [];
    for (let i = 0; i < this.width * this.height; i++) {
      const pixels = [];
      for (let a = 0; a < 64; a++) {
        pixels.push(new Pixel(20, 20, 20));
      }
      tiles.push(new Tile(pixels));
    }
    return tiles;
  }

}
