import { Graphics } from 'p5';
import { Screen } from '../Screen';
import { ISprite } from '../ISprite';
import { Global } from '../Global';
import p5 = require('p5');

export class Button implements ISprite {

  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  public graphics: Graphics;

  public onClick: () => void;

  private screen: Screen;

  private get p(): p5 {
    return this.screen.p;
  }


  public constructor(x: number, y: number, w: number, h: number) {
    this.screen = Global.Screen as Screen;

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.graphics = this.screen.p.createGraphics(this.width, this.height);
    this.graphics.remove();
    this.graphics.background(125);

    this.onClick = () => true;

    this.screen.on('click', this.eventClick.bind(this));
    this.screen.on('hover', this.eventHover.bind(this));
  }

  /**
   * Check position is over
   * @param event boolean
   */
  public isOver(event: MouseEvent): boolean {
    return event.x > this.x && event.x < this.width + this.x && event.y > this.y && event.y < this.height + this.y;
  }

  public eventClick(event: MouseEvent): void {
    if (!this.screen.isAttachedSprite(this) || !this.isOver(event)) {
      return;
    }
    this.onClick();
    console.log('clicked', event.x, event.y);
  }

  public eventHover(event: MouseEvent): void {
    // if (!this.screen.isAttachedSprite(this) || !this.isOver(event)) {
    //   return;
    // }
    // this.p.cursor('pointer');
    console.log(this.isOver(event));
  }

}
