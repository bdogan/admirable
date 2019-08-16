import { Layer } from '../../Layer';

export class DemoTextLayer extends Layer {

  public setup(): void {
    this.addSprite(this.createChar('A', 12));
  }

}
