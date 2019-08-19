import { Layer } from '../Layer';
import { Text } from '../Sprites/Text';

export class InfoLayer extends Layer {

  private fpsCounterText!: Text;

  private get infoText(): string {
    // tslint:disable-next-line: max-line-length
    return `${this.p.frameRate().toFixed(0)} FPS / ${this.screen.layers.length} LAYERS / ${this.screen.sprites.length} SPRITES / ActiveScene: ${this.screen.getScene() ? this.screen.getScene().constructor.name : 'null'}`;
  }

  /**
   * @inheritDoc
   */
  public setup(): void {
    // FPS Counter
    this.fpsCounterText = this.createText(this.infoText, 24, this.screen.dimensions.width, 40);
    this.fpsCounterText.vAlign = 'center';
    this.fpsCounterText.hAlign = 'center';
    this.fpsCounterText.x = this.screen.dimensions.width - this.fpsCounterText.width;
    this.fpsCounterText.y = this.screen.dimensions.height - this.fpsCounterText.height;
    this.fpsCounterText.color = 'rgba(255, 255, 255, .8)';
    this.fpsCounterText.background = 'rgba(0, 0, 0, .7)';
    this.addSprite(this.fpsCounterText);
  }

  /**
   * @inheritDoc
   */
  public update(): void {
    this.fpsCounterText.text = this.infoText;
  }

}
