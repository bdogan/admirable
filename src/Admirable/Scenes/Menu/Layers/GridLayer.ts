import { Layer } from "../../../../Engine/Layer";

export class GridLayer extends Layer{
  private walk:number = 0;
  private animate:boolean = true;
  public setup(): void{
    this.walk = 0;
    this.animate = true;
  }
  
  public update(): void{
    this.p.background(0,30);
    let p = this.p,
        gap = 25,
        gx = Math.ceil(p.width/gap),
        gy = Math.ceil(p.height/gap);
    for(let x = 0; x<gx; x++){
      p.stroke(0,255,255,10);
      p.line((x*gap), 0, (x*gap), p.height);
    }

    for(let y = 0; y<gy; y++){
      if(y<gy/2){
        p.stroke(0,255,255,y*(200/gy*2));
      }

      p.line(0, (y*gap)+this.walk, p.width, (y*gap)+this.walk);
    }

    //random boxes to walk with y grid

    if(this.animate) this.walk = (this.walk+1)%gap;
  }
  
}
