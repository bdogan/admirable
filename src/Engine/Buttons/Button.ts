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
  public get background(): any {
    return this.pBackground;
  }
  public set background(b: any) {
    this.graphics.background(this.pBackground = b);
    this.oOverBackground = undefined;
  }

  private pOverBackground: any;
  private oOverBackground: any;
  public get overBackground(): any {
    return this.pOverBackground || this.oOverBackground
      || (this.oOverBackground = this.Engine.p5.brightness(this.background));
  }
  public set overBackground(b: any) {
    this.pOverBackground = b;
  }

  public constructor(x: number, y: number, w: number, h: number) {
    super();

    // this.screen = Global.Screen as Screen;

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.graphics = this.Engine.p5.createGraphics(this.width, this.height);
    this.graphics.remove();

    // this.overBackground = this.background;
    // Background
    this.graphics.background(this.overBackground);
    this.on('mouseover', () => {
      // this.Engine.p5.cursor('pointer');
      this.graphics.background(this.background);
    });
    this.on('mouseout', () => {
      // this.Engine.p5.cursor('default');
      this.graphics.background(this.overBackground);
    });

    // // Maintain cursor pointer
    this.Engine.Screen.on('mouseover', () => {
      // tslint:disable-next-line: max-line-length
      const currButton = this.Engine.Screen.sprites.find((s) => s instanceof Button && this.Engine.Screen.isAttachedSprite(s) && this.Engine.Screen.isOverSprite(s));
      // this.Engine.p5.cursor(currButton ? 'pointer' : 'default');
    });

  }

}
