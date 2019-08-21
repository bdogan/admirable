// import { Sprite } from '../../Sprite';
import { ISprite } from '../../ISprite';
import p5 = require('p5');
import { Graphics, Image } from 'p5';
import { EventEmitter } from 'events';
import { Text } from '../Text';
import { Sprite } from '../../Sprite';

export class Button extends Sprite {
  public width: number;
  public height: number;
  public text: Text;

  private pButtonGraphics: Graphics;

  private pBackground: any;
  public get background() {
    return this.pBackground;
  }
  public set background(b) {
    this.pBackground = b;
    this.refreshGraphics();
  }

  constructor(txt: string = '', x: number, y: number, width: number, height: number) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = new Text(txt, 32, width);
    console.log(this.text, this.text.text);
    this.pButtonGraphics = this.p.createGraphics(width, height);
    this.pButtonGraphics.background(255, 0, 0, 120);
    this.refreshGraphics();
  }

  private refreshGraphics() {
    // this.text.text = Math.ceil(Math.random() * 256).toString();

    const ghost = this.p.createGraphics(this.width, this.height);
    ghost.remove();
    ghost.background(Math.ceil(Math.random() * 255));
    ghost.image(this.pButtonGraphics, 0, 0);
    // tslint:disable-next-line: max-line-length
    ghost.image(this.text.graphics, (ghost.width - this.text.graphics.width) / 2 , (ghost.height - this.text.graphics.height) / 2);
    this.graphics = ghost;
  }

}
