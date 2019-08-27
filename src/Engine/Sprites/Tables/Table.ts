import { Graphics } from 'p5';
import { Sprite } from '../../Sprite';

export class Table extends Sprite {

  // Graphics object
  public graphics: Graphics;

  // Positions
  public x: number = 0;
  public y: number = 0;

  // Dimensions
  public width: number = 0;
  public height: number = 0;

  // Table content variable
  private pContent: any;
  public get content(): any {
    return this.pContent;
  }
  public set content(v: any) {
    this.pContent = v;
  }

  // Table single column size
  private pColSize: number;
  public get colSize(): number {
    return this.pColSize;
  }
  public set colSize(v: number) {
    this.pColSize = v;
  }

  // Table single row size
  private pRowSize: number;
  public get rowSize(): number {
    return this.pRowSize;
  }
  public set rowSize(v: number) {
    this.pRowSize = v;
  }

  // Table cell padding left
  private pPaddingX: number;
  public get paddingX(): number {
    return this.pPaddingX;
  }
  public set paddingX(v: number) {
    this.pPaddingX = v;
  }

  // Table cell padding top
  private pPaddingY: number;
  public get paddingY(): number {
    return this.pPaddingY;
  }
  public set paddingY(v: number) {
    this.pPaddingY = v;
  }

  // Table font size
  private pFontSize: number;
  public get fontSize(): number {
    return this.pFontSize;
  }
  public set fontSize(v: number) {
    this.pFontSize = v;
  }

  // Table background color
  private pBackground: any;
  public get background(): any {
    return this.pBackground;
  }
  public set background(v: any) {
    this.pBackground = v;
  }

  // Table head visibility
  private pShowHead: boolean = true;
  public get showHead(): boolean {
    return this.pShowHead;
  }
  public set showHead(v: boolean) {
    this.pShowHead = v;
  }

  // Table dynamic horizontal size stretching
  private pStretch: boolean;
  public get stretch(): boolean {
    return this.pStretch;
  }
  public set stretch(v: boolean) {
    this.pStretch = v;
  }

  // Table scroll in graphics object
  private pScroll: boolean = false;
  public get scroll(): boolean {
    return this.pScroll;
  }
  public set scroll(v: boolean) {
    this.pScroll = v;
  }

  // Table scroll difference value
  private tableTopPos: number = 0;

  // Table scroll absolute value
  private tableAbsPos: number = 0;

  // Table meta values
  private tableMeta: any;

  // Table visible rate that using for scrollbar vertical size
  private visibleRate: number = 0;

  private lockY: number = 0;
  private deltaY: number = 0;

  public constructor(x: number, y: number, w: number, h: number) {
    super();

    // Set constructor variables
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    // Set default variables
    this.pColSize = 150;
    this.pRowSize = 53;

    this.pPaddingX = 10;
    this.pPaddingY = 20;

    this.pFontSize = 14;

    this.pShowHead = false;
    this.pStretch = false;

    // Set table meta values temporary
    this.tableMeta = {
      col: 0,
      height: h,
      row: 0,
      width: w,
    };

    // Set content array as empty array
    this.pContent = [];

    // Create graphics object with constructor dimension values
    this.graphics = this.Engine.p5.createGraphics(this.width, this.height);
    this.graphics.remove();
  }

  // Setup method
  public setup(): any {

   // Set table meta values dynamically
    this.tableMeta.col = this.pContent[0].length;
    this.tableMeta.row = this.pContent.length;

    this.tableMeta.height = this.tableMeta.row * this.pRowSize;
    this.tableMeta.width = this.tableMeta.col * this.pColSize;

    // Check if background is not set
    if (!this.pBackground) {
      // Set as default transparent background
      this.pBackground = this.Engine.p5.color(0, 0, 0, 0);
    }

    // Check if stretch is true
    if (this.pStretch) {
      // Overwrite graphics object with dynamic width value and set width as dynamic variable
      this.graphics = this.Engine.p5.createGraphics(this.tableMeta.width, this.height);
      this.graphics.remove();
      this.width = this.tableMeta.width;
    }

    // Scroll
    // Mouse wheel event
    this.on('wheel', (e) => {
      // Check if scroll is true, scrolling value exists and mouse cursor in graphics object area
      if (this.pScroll &&
        !!e.deltaY &&
        this.Engine.p5.mouseX < this.graphics.width + this.x &&
        this.Engine.p5.mouseX > this.x &&
        this.Engine.p5.mouseY < this.graphics.height + this.y &&
        this.Engine.p5.mouseY > this.y) {

        // Set table top position difference value with event parameter
        this.tableTopPos = e.deltaY * 0.7;

        // Set table absolute top position by adding top position difference value
        this.tableAbsPos += this.tableTopPos;

        // To prevent scrolling negative values, check if table absolute position value lower than zero
        if (this.tableAbsPos < 0) {

          // Set table Y origin point by table absolute position value
          this.graphics.translate(0, this.tableTopPos);

          // Set table Y origin point by table absolute position value
          this.tableAbsPos = 0;
        }

        /*
        // To prevent scrolling greater than table height, check if table absolute position value
        if (this.tableAbsPos > this.tableMeta.row * this.pRowSize - this.height) {
          this.tableAbsPos = this.tableMeta.row * this.pRowSize - this.height;
          this.graphics.translate(0, this.tableTopPos);
        }
        */

        // Set canvas Y origin point to scroll by setting table Y origin point by table absolute position value
        this.graphics.translate(0, -this.tableTopPos);
      }
    });

    // Drag and drop
    this.on('mousedown', (e) => {
      console.log('mousedown');
      this.lockY = this.Engine.p5.mouseY;
    });

    this.on('drag', (e) => {
      let dY = (this.Engine.p5.mouseY - this.lockY);
      this.lockY = this.Engine.p5.mouseY;
      this.tableAbsPos += dY;
      this.graphics.translate(0, dY);
    });

  }

  // Update method
  public update(): Promise<any> | any {
    // Clear graphics object for if it has transparent background
    this.graphics.clear();

    // Set background color of the graphics object
    this.graphics.background(this.pBackground);

    // Loop for print table rows ands columns
    for (let i = 0; i < this.tableMeta.row; i++) {
      for (let j = 0; j < this.tableMeta.col; j++) {
        this.graphics.stroke(170);

        // Change row background by odd or even
        if (i % 2 === 0) {
          this.graphics.fill(220);
        } else {
          this.graphics.fill(240);
        }

        // Draw and column rectangle
        this.graphics.rect(j * this.pColSize, i * this.pRowSize, this.pColSize, this.pRowSize);

        // Set text color
        this.graphics.fill(0);

        // Set text options
        this.graphics.textAlign(this.Engine.p5.LEFT, this.Engine.p5.TOP);
        this.graphics.textSize(this.pFontSize);
        this.graphics.textStyle(this.Engine.p5.NORMAL);

        // Remove outline
        this.graphics.noStroke();

        // Define x and y variables of text
        let textX = j * this.pColSize + this.pPaddingX;
        let textY = i * this.pRowSize + this.pPaddingY;

        // Check if show head variable is true and the row is the first one
        if (this.pShowHead && i === 0) {
          // Set options for title row
          this.graphics.stroke(120);
          this.graphics.fill(80);
          this.graphics.rect(j * this.pColSize, 0, this.pColSize, this.pRowSize);
          this.graphics.fill(255);
          this.graphics.textAlign(this.Engine.p5.CENTER, this.Engine.p5.CENTER);
          this.graphics.noStroke();
          this.graphics.textStyle(this.Engine.p5.BOLD);

          // Set x and y variables of text to being middle of the cell
          textX = (j * this.pColSize) + (this.pColSize / 2);
          textY = this.pRowSize / 2;
        }

        // Draw text on cell
        this.graphics.text(this.pContent[i][j] ? this.pContent[i][j] : '', textX, textY);
      }
    }

    // Scrollbar
    this.graphics.fill(255, 100);
    this.graphics.stroke(125);

    // Set visible rate size
    this.visibleRate = this.graphics.height / this.tableMeta.height * this.graphics.height;

    // Check if scroll variable is true and mouse cursor is close to right edge of the graphics object
    if (this.pScroll &&
      this.Engine.p5.mouseX < this.graphics.width + this.x &&
    this.Engine.p5.mouseX > this.graphics.width + this.x - (this.graphics.width / 4)) {
      // Set top position of pScrollbar
      let scrollTop = this.tableAbsPos * (this.graphics.height / this.tableMeta.height);

      // Check if scrollbar top position is greater than graphics object height, then lock it
      if (scrollTop > this.graphics.height) {
        scrollTop = this.graphics.height;
      }

      // Set scrollbar bottom position by visible rate
      let scrollBottom = this.visibleRate;

      // Check if part of scrollbar is out of graphics object height, remove that part
      if (scrollTop + this.visibleRate > this.graphics.height) {
        scrollBottom = this.graphics.height - scrollTop;
      }

      // Draw scrollbar
      this.graphics.rect(this.graphics.width - 10, scrollTop + this.tableAbsPos, 10, scrollBottom);
    }
  }
}
