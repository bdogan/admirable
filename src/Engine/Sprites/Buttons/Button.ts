import { Graphics } from 'p5';
import { Sprite } from '../../Sprite';
import { Text } from '../Text';
import p5 = require('p5');

export class Button extends Sprite {

  public x: number = 0;
  public y: number = 0;
  public graphics: Graphics;

  public width: number = 0;
  public height: number = 0;
  public text: Text;

  private bg: any;
  private pDefaultBackground: any = undefined;
  private pHoverBackround: any = undefined;

  public get background(): any {
    return this.bg ? this.bg : 'rgb(0,255,255)';
  }
  public set background(b: any) {
    this.pDefaultBackground = this.bg = this.alterColor(b, 0.7, 0.7, 0.7);

    if (!this.pHoverBackround) {
      this.pHoverBackround = b;
    }

    this.refreshGraphics();
  }

  public constructor(txt: string, x: number, y: number, w: number, h: number) {
    super();

    this.graphics = this.Engine.p5.createGraphics(w, h);
    this.graphics.remove();

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.text = new Text(txt, 16, w, h);

    this.on('mouseover', () => {
      this.bg = this.pHoverBackround;
      this.refreshGraphics();
    });

    this.on('mouseout', () => {
      this.bg = this.pDefaultBackground;
      this.refreshGraphics();
    });
  }

  public refreshGraphics(): void {
    this.graphics.clear();
    this.graphics.background(this.background);

    // should be put last for overlapping.
    this.graphics.image(this.text.graphics, 0, 0);
  }

  private alterColor(c: any, r: number = 1, g: number = 1, b: number = 1, a: number = 1): p5.Color {
    const color = this.Engine.p5.color(c);

    color.setRed(this.Engine.p5.red(color) * r);
    color.setGreen(this.Engine.p5.green(color) * g);
    color.setBlue(this.Engine.p5.blue(color) * b);
    color.setAlpha(this.Engine.p5.alpha(color) * a);

    return color;
  }

}
