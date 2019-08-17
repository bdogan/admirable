import { Layer } from '../../../Layer';

export class DemoTextLayer extends Layer {

  public setup(): void {
    const text = this.createText('Awesome Graphics Engine\nBased on p5.js', 30, this.screen.dimensions.width, this.screen.dimensions.height);
    text.background = 'rgba(0,0,0,.2)';
    this.addSprite(text);
  }

}
