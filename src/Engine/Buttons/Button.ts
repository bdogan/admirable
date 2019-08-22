import { Graphics } from 'p5';
import { Screen } from '../Screen';
import { ISprite } from '../ISprite';
// import { Global } from '../Global';
import p5 = require('p5');
import { EventEmitter } from 'events';
// import { BaseObj } from '../BaseObj';
import { Sprite } from '../Sprite';

export class Button extends Sprite {

  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public graphics: Graphics;

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

  // public onClick: (e?: any) => void;
  // public onHover: (e?: any) => void;
  // public onMouseDown: (e?: any) => void;
  // public onMouseUp: (e?: any) => void;

  // private screen: Screen;

  // private get p(): p5 {
  //   return this.screen.p;
  // }

  public constructor(x: number, y: number, w: number, h: number) {
    super();

    // this.screen = Global.Screen as Screen;

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.graphics = this.Engine.p5.createGraphics(this.width, this.height);
    this.graphics.remove();

    // this.onClick = (e) => false;
    // this.onHover = (e) => false;
    // this.onMouseDown = (e) => false;
    // this.onMouseUp = (e) => false;

    // Background
    this.graphics.background(this.background);
    this.on('mouseOut', () => this.graphics.background(this.background));
    this.on('mouseIn', () => this.graphics.background(this.overBackground));

    // Maintain cursor pointer
    this.Engine.Screen.on('mouseMoved', () => {
      // tslint:disable-next-line: max-line-length
      const currButton = this.Engine.Screen.sprites.find((s) => s instanceof Button && this.Engine.Screen.isAttachedSprite(s) && this.Engine.Screen.isOverSprite(s));
      this.Engine.p5.cursor(currButton ? 'pointer' : 'default');
    });

  }

}
