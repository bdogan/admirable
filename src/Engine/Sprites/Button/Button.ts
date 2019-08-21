// import { Sprite } from '../../Sprite';
import { ISprite } from '../../ISprite';
import p5 = require('p5');
import { Graphics } from 'p5';
import { EventEmitter } from 'events';
import { Text } from '../Text';
import { Sprite } from '../../Sprite';

export class Button extends Sprite {
  public width: number;
  public height: number;

  constructor(txt: string = 'asd', x: number, y: number, width: number, height: number) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    const graph = this.p.createGraphics(this.width, this.height);
    const graph2 = this.p.createGraphics(this.width / 2, this.height / 2);
    graph.remove();
    graph2.remove();

    graph2.background('red');
    const tx = new Text(txt, 16, this.width / 2, this.height / 2);
    const tg = tx.graphics;
    // console.log(tg);
    tx.background = 'cyan';
    tx.color = 'red';
    graph.background('white');
    // graph.image(graph2, ((graph.width - graph2.width) / 2), (graph.height - graph2.height) / 2);
    graph.image(tg, ((graph.width - tg.width) / 2), (graph.height - tg.height) / 2);
    tg.image(graph2, 20, 20);
    this.graphics = tg;

    // console.log(this.graphics);
    // this.graphics = this.p.createGraphics(this.width, this.height);
    // this.graphics.remove();

    // this.graphics.background('red');

    // this.graphics.image(tx.graphics, 0, 0);
  }

}
