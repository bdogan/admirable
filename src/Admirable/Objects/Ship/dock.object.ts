import { Ship } from '../Ship';
import { BoardConfig } from '../../board.config';

export interface IExport {
  x: number;
  y: number;
  extent: number;
  orthogonal: boolean;
}

export class Dock {

  public scene: Phaser.Scene;
  public ships: Ship[];

  private setup: boolean;

  constructor(scene: Phaser.Scene, setup: boolean = false) {
    this.scene = scene;
    this.ships = [];
    this.setup = setup;
    this.registerSceneEvents(scene);
  }

  public build(ships: IExport[]): void {
    // this.ships = []; this.ships.foreach ship.destoy?.
    ships.forEach((ship) => {
      const _ship = new Ship(this, this.scene, ship.extent, ship.orthogonal, this.setup);
      _ship._setPosition(ship.x, ship.y);
      this.ships.push(_ship);
    });

  }

  public export(): IExport[] {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    return this.ships.map((ship: Ship) => <IExport> {x: ship.x, y: ship.y, extent: ship.extent, orthogonal: ship.orthogonal});
  }

  public import(exported: IExport[]): void {
    this.build(exported);
  }

  /**
   * Randomize the placement of the ships.
   * @param orthogonality randomize the orthogonality of the ships.
   */
  public randomizePlacement(orthogonality?: boolean) {
    let trial = 0;
    const ships = this.ships;

    // First of all Place all ships outside of the canvas.
    ships.forEach((ship) => {
      ship.setPosition(-64, -64);
      if (orthogonality && !!Phaser.Math.Between(0, 1)) {
        ship.rotate();
      }
    });

    // Start to place randomly.
    ships.forEach((ship) => {

      let x = Phaser.Math.Between(0, 14) * BoardConfig.gridSize,
          y = Phaser.Math.Between(0, 14) * BoardConfig.gridSize;

      if (ship.orthogonal) {
        y = y - ship.extent * BoardConfig.gridSize;
      } else {
        x = x - ship.extent * BoardConfig.gridSize;
      }

      ship._setPosition(x, y, false, false);

      while (ship.isColliding) {
        trial++;

        x = Phaser.Math.Between(0, 14) * BoardConfig.gridSize;
        y = Phaser.Math.Between(0, 14) * BoardConfig.gridSize;

        if (ship.orthogonal) {
          y -= ship.extent * BoardConfig.gridSize;
        } else {
          x -= ship.extent * BoardConfig.gridSize;
        }

        ship._setPosition(x, y, true, false);
      }

    });
    console.log('Total trial: ', trial);
  }

  public get isPlacementValid(): boolean {
    // Search for any error, if error is true placement is invalid.
    return !this.ships.some((ship) => !ship.isWithinArea || ship.isColliding);
  }

  /**
   * Register the neccessary events to be handled by the scene.
   * @param scene The scene this event's to be added.
   */
  // tslint:disable-next-line: member-ordering
  private registerSceneEvents(scene: Phaser.Scene) {
    const key = scene.input.keyboard.addKey('SPACE');

    key.on('down', (event: any) => {
      // Rotate when space is pressed. there is a focused ship.
      const focusedShip = this.ships.find((ship) => ship.hasFocus);

      if (focusedShip) {
        focusedShip.rotate();
      }

    });

  }

}
