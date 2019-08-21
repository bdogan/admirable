import { MunroFontPath } from './Font';
import { ISprite } from '../../ISprite';
import { Graphics, Image, Font } from 'p5';
import { Screen } from '../../Screen';
import { Global } from '../../Global';
import p5 = require('p5');
import { EventEmitter } from 'events';
import { Sprite } from '../../Sprite';

let pFont: Font;

export class Text extends Sprite {
    public graphics: Graphics;
    // Font
    private fontPath: string = MunroFontPath;
    private get font(): Font {
        return pFont;
    }
    private set font(f: Font) {
        pFont = f;
        this.refreshGraphics();
    }

    // Text
    private pText: string;
    public get text(): string {
        return this.pText;
    }
    public set text(v: string) {
        this.pText = v;
        this.refreshGraphics();
    }

    // Size
    private pSize: number;
    public get size(): number {
        return this.pSize;
    }
    public set size(v: number) {
        this.pSize = v;
        this.refreshGraphics();
    }

    // Width
    private pWidth: number;
    public get width(): number {
        return this.pWidth;
    }
    public set width(w: number) {
        this.pWidth = w;
        this.refreshGraphics();
    }

    // Height
    private pHeight: number;
    public get height(): number {
        return this.pHeight;
    }
    public set height(h: number) {
        this.pHeight = h;
        this.refreshGraphics();
    }

    // Leading
    private pLeading: number;
    public get leading(): number {
        return this.pLeading;
    }
    public set leading(l: number) {
        this.pLeading = l;
        this.refreshGraphics();
    }

    // Color
    private pColor: any;
    public get color(): any {
        return this.pColor;
    }
    public set color(c: any) {
        this.pColor = c;
        this.refreshGraphics();
    }

    // Background
    private pBackground: any;
    public get background(): any {
        return this.pBackground;
    }
    public set background(b: any) {
        this.pBackground = b;
        this.refreshGraphics();
    }

    // Horizontal Align
    private pHAlign: p5.HORIZ_ALIGN;
    public get hAlign(): p5.HORIZ_ALIGN {
        return this.pHAlign;
    }
    public set hAlign(a: p5.HORIZ_ALIGN) {
        this.pHAlign = a;
        this.refreshGraphics();
    }

    // Vertical Align
    private pVAlign: p5.VERT_ALIGN;
    public get vAlign(): p5.VERT_ALIGN {
        return this.pVAlign;
    }
    public set vAlign(v: p5.VERT_ALIGN) {
        this.pVAlign = v;
        this.refreshGraphics();
    }

    // Text position
    private get textX(): number {
        switch (this.hAlign) {
            case this.p.RIGHT: return this.width;
            case this.p.CENTER: return this.width / 2;
            case this.p.LEFT:
            default: return 0;
        }
    }
    private get textY(): number {
        switch (this.vAlign) {
            case this.p.BOTTOM: return this.height;
            case this.p.CENTER: return this.height / 2;
            case this.p.TOP:
            default: return 0;
        }
    }

    public constructor(text: string, size: number, width: number, height?: number) {
        super();

        // Set variables
        this.pText = text;
        this.pSize = size;
        this.pWidth = width;
        this.pHeight = height || size;
        this.pColor = 'rgb(0, 0, 0)';
        this.pBackground = 'rgba(255, 255, 255, 0)';
        this.pHAlign = this.p.CENTER;
        this.pVAlign = this.p.CENTER;
        this.pLeading = this.size;

        // Create graphics
        this.graphics = this.p.createGraphics(this.width, this.height);
        this.graphics.remove();

        // Load font
        this.loadFont();

        // this.on('mousePressed', console.log)
        this.refreshGraphics();
    }

    private refreshGraphics() {
        // if (this.font) {
            // Clear the canvas to prevent over print.
            this.graphics.clear();
            this.graphics.background(this.background);
            // this.graphics.textFont(this.font);
            this.graphics.textLeading(this.leading);
            this.graphics.fill(this.color);
            this.graphics.textSize(this.size);
            this.graphics.textAlign(this.hAlign, this.vAlign);
            this.graphics.text(this.text, this.textX, this.textY);
        // }
    }

    private loadFont() {
      this.p.loadFont(this.fontPath, (f) => this.font = f);
    }

}
