import { Layer } from '../Layer';
import { Text } from '../Sprites/Text';

export class InfoLayer extends Layer {

  private fpsCounterText!: Text;

  /**
   * @inheritDoc
   */
  public setup(): void {
    // FPS Counter
    this.fpsCounterText = this.createText(`${this.p.frameRate().toFixed(0)} FPS`, 24, 80, 30);
    this.fpsCounterText.vAlign = 'center';
    this.fpsCounterText.hAlign = 'center';
    this.fpsCounterText.x = this.screen.dimensions.width - this.fpsCounterText.width;
    this.fpsCounterText.y = this.screen.dimensions.height - this.fpsCounterText.height;
    this.fpsCounterText.background = 'rgba(0, 0, 0, .2)';
    this.addSprite(this.fpsCounterText);
  }

  /**
   * @inheritDoc
   */
  public update(): void {
    this.fpsCounterText.text = `${this.p.frameRate().toFixed(0)} FPS`;
  }

}
