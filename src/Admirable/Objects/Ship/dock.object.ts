import { Player } from '../Player';
import { Ship } from '../Ship';

interface IExport {
  x: number;
  y: number;
  extent: number;
  orthogonal: boolean;
}

export class Dock {
  private player!: Player;
  private ships!: Ship[];

  public export(): IExport[] {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    return this.ships.map((ship: Ship) => <IExport> {x: ship.x, y: ship.y, extent: ship.extent, orthogonal: ship.orthogonal});
  }

  public import(exported: IExport[]): void {
    //
  }
}
