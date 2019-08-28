import { Layer } from '../../../../Engine/Layer';
import { TextBox } from '../../../../Engine/Sprites/Inputs/TextBox';
import { Sprite } from '../../../../Engine/Sprite';

export class InputLayer extends Layer {

  private textbox!: TextBox;
  private textbox2!: TextBox;

  public setup() {
    this.textbox = new TextBox();
    // this.textbox.focus = true;
    this.textbox.x = 250;
    this.textbox.y = 400;

    this.textbox2 = new TextBox();
    this.textbox2.value = '1234567';
    // this.textbox.focus = true;
    this.textbox2.x = 250;
    this.textbox2.y = 460;
  }

  public beforeAttach(): Promise<any> {
    return Promise.all([
      this.addSprite(this.textbox),
      this.addSprite(this.textbox2),
    ]);
  }
}
