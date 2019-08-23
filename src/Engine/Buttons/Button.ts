import { Graphics } from 'p5';
import { Sprite } from '../Sprite';

export class Button extends Sprite {

  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public graphics: Graphics;
  public angle: number = 0;
  public rotating: boolean = false;

  private pBackground: any = 'rgba(10, 10, 10, 255)';
  private pHoverBackround: any = undefined;
  public get background(): any {
    return this.pBackground;
  }
  public set background(b: any) {
    this.pHoverBackround = b;
    const alter = this.Engine.p5.color(b);
    alter.setRed(this.Engine.p5.red(alter) * 0.6);
    alter.setGreen(this.Engine.p5.green(alter) * 0.6);
    alter.setBlue(this.Engine.p5.blue(alter) * 0.6);
    // alter.setAlpha(0);
    this.pBackground = alter;
    this.graphics.background(alter);
  }

  public constructor(x: number, y: number, w: number, h: number) {
    super();

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.graphics = this.Engine.p5.createGraphics(this.width, this.height);
    this.graphics.remove();

    this.on('mouseover', () => {
      this.graphics.background(this.pHoverBackround);
    });

    this.on('mouseout', () => {
      this.graphics.background(this.pBackground);
    });
  }

}
