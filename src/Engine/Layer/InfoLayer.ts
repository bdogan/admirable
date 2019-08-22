import { Layer } from '../Layer';
import { Text } from '../Sprites/Text';

export class InfoLayer extends Layer {

  private fpsCounterText!: Text;

  private get infoText(): string {
    // return '';
    // tslint:disable-next-line: max-line-length
    // return this.Engine.Router.ActiveRoute
    return `${this.Engine.p5.frameRate().toFixed(0)} FPS /
    ${this.Engine.Screen.layers.length} LAYERS /
    ${this.Engine.Screen.sprites.length} SPRITES
    `;
    // tslint:disable-next-line: max-line-length
    // return `${this.Engine.p5.frameRate().toFixed(0)} FPS / ${this.Engine.Screen.layers.length} LAYERS / ${this.Engine.Screen.sprites.length} SPRITES / ActiveScene: ${this.Engine.Screen.getScene() ? this.Engine.Screen.getScene().constructor.name : 'null'}`;
  }

  /**
   * @inheritDoc
   */
  public setup(): void {
    // FPS Counter
    this.fpsCounterText = this.createText(this.infoText, 24, this.Engine.Screen.dimensions.width, 40);
    this.fpsCounterText.vAlign = 'center';
    this.fpsCounterText.hAlign = 'center';
    this.fpsCounterText.x = this.Engine.Screen.dimensions.width - this.fpsCounterText.width;
    this.fpsCounterText.y = this.Engine.Screen.dimensions.height - this.fpsCounterText.height;
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
