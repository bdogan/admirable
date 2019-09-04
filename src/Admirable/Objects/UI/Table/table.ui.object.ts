export class Table extends Phaser.GameObjects.Container {

  // Graphic
  public graphics: Phaser.GameObjects.Graphics;

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

  public constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number, content: any) {
    // Call parent constructor
    super(scene, x, y, []);

    // Set constructor variables
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    // Set default variables
    this.pColSize = 150;
    this.pRowSize = 53;

    this.pPaddingX = 20;
    this.pPaddingY = 15;

    this.pFontSize = 14;

    this.pShowHead = true;
    this.pStretch = false;

    const listGraphics: any[] = [];
    const listTexts: any[] = [];

    // Set table meta values temporary
    this.tableMeta = {
      col: 0,
      height: h,
      row: 0,
      width: w,
    };

    // Set content array as empty array
    this.pContent = content;

    this.graphics = new Phaser.GameObjects.Graphics(scene, {
      x: this.x,
      y: this.y,
    });

    // Set table meta values dynamically
    this.tableMeta.col = this.pContent[0].length;
    this.tableMeta.row = this.pContent.length;

    this.tableMeta.height = this.tableMeta.row * this.pRowSize;
    this.tableMeta.width = this.tableMeta.col * this.pColSize;

    // Check if background is not set
    if (!this.pBackground) {
      // Set as default transparent background
      this.pBackground = 0x000000;
    }

    // Clear graphics object for if it has transparent background
    this.graphics.clear();

    // Set background color of the graphics object
    this.graphics.fillStyle(this.pBackground, 1);
    this.graphics.fillRect(0, 0, this.width, this.height);

    // Loop for print table rows ands columns
    for (let i = 0; i < this.tableMeta.row; i++) {
      for (let j = 0; j < this.tableMeta.col; j++) {
        this.graphics.lineStyle(1, 0x888888);

        // Change row background by odd or even
        if (i % 2 === 0) {
          this.graphics.fillStyle(0xAAAAAA);
        } else {
          this.graphics.fillStyle(0xDDDDDD);
        }

        if (j === 0) {
          // Draw and column rectangle
          this.graphics.fillRect(0, i * this.pRowSize, this.tableMeta.width, this.pRowSize);
        }

        // Set text color
        this.graphics.fillStyle(0x000000);

        // Define x, y and origin variables of text
        let textX = this.x + j * this.pColSize + this.pPaddingX;
        let textY = this.y + i * this.pRowSize + this.pPaddingY;

        // Set text options
        const style = {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
            fontSize: this.pFontSize,
            color: '#000000',
            boundsAlignH: 'left',
            boundsAlignV: 'top',
        };

        // Check if show head variable is true and the row is the first one

        console.log(this.pShowHead);
        if (this.pShowHead && i === 0) {
          // Set options for title row
          this.graphics.fillStyle(0x333333);
          this.graphics.fillRect(j * this.pColSize, 0, this.pColSize, this.pRowSize);
          style.boundsAlignH = 'center';
          style.boundsAlignV = 'middle';
          style.color = '#ffffff';
          style.fontWeight = 'bold';

          // Set x and y variables of text to being middle of the cell
          textX = (j * this.pColSize) + (this.pColSize / 2);
          textY = this.pRowSize / 2;
        }

        // Draw text on cell
        listTexts.push(new Phaser.GameObjects.Text(scene, textX, textY, this.pContent[i][j] ? this.pContent[i][j] : '', {fontFamily: 'sans-serif', color: style.color, align: style.boundsAlignH}));

      }
      listGraphics.push(this.graphics);

      const listRaw = listGraphics.concat(listTexts);

      this.list = listRaw;
    }

/*
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
    */
  }

}
