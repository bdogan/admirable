import { Layer } from '../../../../Engine/Layer';
import { TextBox } from '../../../../Engine/Sprites/Inputs/TextBox';
import { Sprite } from '../../../../Engine/Sprite';

export class InputLayer extends Layer {

  private textbox!: TextBox;

  public setup() {
    this.textbox = new TextBox();
    this.textbox.focus = true;
    this.textbox.x = 250;
    this.textbox.y = 400;
  }

  public beforeAttach(): Promise<any> {
    return Promise.all([
      this.addSprite(this.textbox),
    ]);
  }
}
