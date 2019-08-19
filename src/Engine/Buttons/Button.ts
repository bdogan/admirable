import { Graphics } from 'p5';
import { Screen } from '../Screen';
import { ISprite } from '../ISprite';
import { Global } from '../Global';
import p5 = require('p5');

export class Button implements ISprite {

  public x: number = 0;
  public y: number = 0;
  public w: number = 0;
  public h: number = 0;

  public graphics: Graphics;

  private screen: Screen;

  private get p(): p5 {
    return this.screen.p;
  }

  public constructor(x: number, y: number, w: number, h: number) {
    this.screen = Global.Screen as Screen;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.graphics = this.screen.p.createGraphics(this.w, this.h);
    this.graphics.remove();
    this.graphics.background(125);

    this.screen.on('click', this.onClick.bind(this));
  }

  /**
   * Check position is over
   * @param event boolean
   */
  public isOver(event: MouseEvent): boolean {
    return event.x > this.x && event.x < this.w + this.x && event.y > this.y && event.y < this.h + this.y;
  }

  public onClick(event: MouseEvent): void {
    if (!this.screen.isAttachedSprite(this) || !this.isOver(event)) {
      return;
    }
    console.log('clicked', event.x, event.y);
  }

}
