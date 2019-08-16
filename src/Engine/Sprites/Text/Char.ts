import { ISprite } from '../../ISprite';
import { Graphics, Image } from 'p5';
import { SegaGenesisFontMap, SegaGenesisFontPath } from './SegaGenesis';
import { IFontMap } from './IFontMap';
import { Screen } from '../../Screen';
import { Global } from '../../Global';
import p5 = require('p5');

let pFontImage: Image;

export class Char implements ISprite {

  public x: number = 0;
  public y: number = 0;
  public graphics!: Graphics | Image;

  private fontMap: IFontMap = SegaGenesisFontMap;
  private fontImagePath: string = SegaGenesisFontPath;

  private screen: Screen;

  private char: string | number;
  private size: number;
  private color?: any;
  private background?: any;

  private get p(): p5 {
    return this.screen.p;
  }

  private get fontImage(): Image {
    return pFontImage;
  }

  constructor(char: string | number, size: number, color?: any, background?: any) {
    this.char = char;
    this.size = size;
    this.color = color;
    this.background = background;

    this.screen = Global.Screen as Screen;
    this.loadFontImage();
  }

  private loadFontImage() {
    this.p.loadImage(this.fontImagePath, (i) => {
      pFontImage = i;
      this.onLoadFontImage();
    });
  }

  private onLoadFontImage() {
    const area = this.fontMap[this.char];
    this.graphics = this.fontImage.get(area.x0, area.y0, area.x1 - area.x0, area.y1 - area.y0);
  }

}
