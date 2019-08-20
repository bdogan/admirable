import { Graphics } from 'p5';
import { Screen } from '../Screen';
import { ISprite } from '../ISprite';
import { Global } from '../Global';
import p5 = require('p5');
import { EventEmitter } from 'events';

export class Button extends EventEmitter implements ISprite {

  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  public graphics: Graphics;

  public onClick: (e?: any) => void;
  public onHover: (e?: any) => void;
  public onMouseDown: (e?: any) => void;
  public onMouseUp: (e?: any) => void;

  private screen: Screen;

  private get p(): p5 {
    return this.screen.p;
  }

  public constructor(x: number, y: number, w: number, h: number) {
    super();

    this.screen = Global.Screen as Screen;

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.graphics = this.screen.p.createGraphics(this.width, this.height);
    this.graphics.remove();
    this.graphics.background(255, 0, 0);

    this.onClick = (e) => false;
    this.onHover = (e) => false;
    this.onMouseDown = (e) => false;
    this.onMouseUp = (e) => false;

    this.screen.on('click', this.eventClick.bind(this));
    this.screen.on('hover', this.eventHover.bind(this));
    this.screen.on('down', this.eventDown.bind(this));
    this.screen.on('up', this.eventUp.bind(this));
  }

  /**
   * Check position is over
   * @param event boolean
   */
  public isOver(event: MouseEvent): boolean {
    // console.log(this.x, this.y);
    return this.p.mouseX > this.x && this.p.mouseX < this.width + this.x &&
    this.p.mouseY > this.y && this.p.mouseY < this.height + this.y;
  }

  public eventClick(event: MouseEvent): void {
    if (!this.screen.isAttachedSprite(this) || !this.isOver(event)) {
      return;
    }
    this.onClick(this);
    console.log(this);
    // console.log('clicked', event.x, event.y);
  }

  public eventHover(event: MouseEvent): void {

    if (!this.screen.isAttachedSprite(this) || !this.isOver(event)) {
      this.p.cursor('default');
      return;
    }
    // console.log(event);
    this.onHover(this);
    // console.log(this);
    this.p.cursor('pointer');
  }

  public eventDown(event: MouseEvent): void {
    this.onMouseDown(this);
  }

  public eventUp(event: MouseEvent): void {
    this.onMouseUp(this);
  }

}
