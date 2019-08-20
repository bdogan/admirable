import { Layer } from '../../../Layer';
import { MenuScene } from '../../../../Admirable/Scenes/Menu/Menu';
// import { menu } from '../../../../main';

export class DemoTextLayer extends Layer {

  public setup(): void {
    const text = this.createText('Awesome Graphics Engine\nBased on p5.js', 30,
    this.screen.dimensions.width, this.screen.dimensions.height);
    text.background = 'rgba(0,0,0,.2)';
    this.addSprite(text);

    const b = this.createButton(25, 25, 50, 50);
    b.onClick = () => {
      this.screen.setScene(MenuScene.getInstance);
    };
    this.addSprite(b);
  }

}
