import { Graphics } from 'p5';
import { Sprite } from '../../Sprite';

export class Table extends Sprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public graphics: Graphics;
  public showHead: boolean = true;
  public head: string[] = [];
  public content: any;
  public colSize: number;
  public rowSize: number;
  public paddingX: number;
  public paddingY: number;
  public fontSize: number;
  public background: any;
  public stretch: boolean;

  public scroll: boolean = false;

  private tableTopPos: number = 0;
  private tableAbsPos: number = 0;
  private tableMeta: any;
  private tableWidth: number;
  private tableHeight: number;

  public constructor(x: number, y: number, w: number, h: number) {
    super();

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.colSize = 150;
    this.rowSize = 53;

    this.paddingX = 10;
    this.paddingY = 20;

    this.fontSize = 14;

    this.showHead = false;
    this.stretch = false;

    this.tableMeta = {
      col: 0,
      row: 0,
    };

    this.tableWidth = 0;
    this.tableHeight = 0;

    this.content = [];

    this.graphics = this.Engine.p5.createGraphics(this.width, this.height);
    this.graphics.remove();
  }

  public setup(): any {
    this.tableMeta = {
      col: this.content[0].length,
      row: this.content.length,
    };

    this.tableWidth = this.tableMeta.col * this.colSize;
    this.tableHeight = this.tableMeta.row * this.rowSize;

    if (!this.background) {
      this.background = this.Engine.p5.color(0, 0, 0, 0);
    }

    if (this.stretch) {
      this.graphics = this.Engine.p5.createGraphics(this.tableWidth, this.tableHeight);
      this.graphics.remove();
      this.width = this.tableWidth;
      this.height = this.tableHeight;
    }

    this.on('wheel', (e) => {
      if (this.scroll &&
        !!e.deltaY &&
        this.Engine.p5.mouseX < this.graphics.width + this.x &&
        this.Engine.p5.mouseX > this.x &&
        this.Engine.p5.mouseY < this.graphics.height + this.y &&
        this.Engine.p5.mouseY > this.y) {
        this.tableTopPos = e.deltaY * 0.5;

        this.tableAbsPos += this.tableTopPos;
        if (this.tableAbsPos < 0) {
          this.graphics.translate(0, this.tableAbsPos);
          this.tableAbsPos = 0;
        }

        this.graphics.translate(0, -this.tableTopPos);
      }
    });

  }

  public update(): Promise<any> | any {
    this.graphics.clear();
    this.graphics.background(this.background);

    this.graphics.push();
    for (let i = 0; i < this.tableMeta.row; i++) {
      for (let j = 0; j < this.tableMeta.col; j++) {
        this.graphics.stroke(170);

        if (i % 2 === 0) {
          this.graphics.fill(220);
        } else {
          this.graphics.fill(240);
        }

        this.graphics.rect(j * this.colSize, i * this.rowSize, this.colSize, this.rowSize);

        this.graphics.fill(0);
        this.graphics.textAlign(this.Engine.p5.LEFT, this.Engine.p5.TOP);
        this.graphics.textSize(this.fontSize);
        this.graphics.noStroke();
        this.graphics.textStyle(this.Engine.p5.NORMAL);

        let textX = j * this.colSize + this.paddingX;
        let textY = i * this.rowSize + this.paddingY;

        if (this.showHead && i === 0) {
          this.graphics.stroke(120);
          this.graphics.fill(80);
          this.graphics.rect(j * this.colSize, 0, this.colSize, this.rowSize);
          this.graphics.fill(255);
          this.graphics.textAlign(this.Engine.p5.CENTER, this.Engine.p5.CENTER);
          this.graphics.noStroke();
          this.graphics.textStyle(this.Engine.p5.BOLD);

          textX = (j * this.colSize) + (this.colSize / 2);
          textY = this.rowSize / 2;
        }

        this.graphics.text(this.content[i][j] ? this.content[i][j] : '', textX, textY);
      }
    }
  }
}
