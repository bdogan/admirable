import { Layer } from '../../../../Engine/Layer';
import { Button } from '../../../../Engine/Buttons/Button';

export class LayoutLayer extends Layer {

  private button: Button;

  constructor() {
    super();
    this.button = this.createButton(0, 0, 256, 64);
    this.addSprite(this.button);
  }

}
