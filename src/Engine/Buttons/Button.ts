import { Graphics } from "p5";
import { Screen } from '../Screen';
import { Text } from '../Sprites/Text';
import { ISprite } from '../ISprite';
import {Global} from '../Global';
import p5 = require('p5');

export class Button implements ISprite{
  private screen: Screen;

  public x:number = 0;
  public y:number = 0;
  public w:number = 0;
  public h:number = 0;

  public graphics: Graphics;


  private get p(): p5{
    return this.screen.p;
  }



  public constructor(x:number, y:number, w:number, h:number){
    this.screen = Global.Screen as Screen;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.graphics = this.screen.p.createGraphics(this.w, this.h);
    this.graphics.mouseClicked = (event?: object | undefined):void => {
      console.log(event);
    }
      this.graphics.background(125);
  }

  public isMouseOver():boolean{
    if(this.p.mouseX > this.x && this.p.mouseX < this.w+this.x &&  this.p.mouseY > this.y && this.p.mouseY < this.h+this.y) return true;
    return false;
  }

  public onClick(): void{
    // console.log(this);
    this.graphics.mouseClicked(()=>{
      console.log("asdasd");
    });
  }

}
