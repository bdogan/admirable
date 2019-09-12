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

  // Dock valid area.
  public area: Phaser.Geom.Rectangle;

  private setup: boolean;

  constructor(scene: Phaser.Scene, setup: boolean = false) {
    this.scene = scene;
    this.ships = [];
    this.setup = setup;

    // The area this dock to be placed abstractly.
    this.area = new Phaser.Geom.Rectangle(0, 0, this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height);

    this.registerSceneEvents(scene);
  }

  /**
   * Build the dock with the given ships.
   * @param ships Ship array to build with this dock.
   */
  public build(ships: IExport[]): void {
    // this.ships = []; this.ships.foreach ship.destoy?.
    ships.forEach((ship) => {
      const _ship = new Ship(this, this.scene, ship.extent, ship.orthogonal, this.setup);
      _ship._setPosition(ship.x, ship.y);
      this.ships.push(_ship);
    });

  }

  /**
   * Export the ships as an array.
   */
  public export(): IExport[] {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    return this.ships.map((ship: Ship) => <IExport> {x: ship.x, y: ship.y, extent: ship.extent, orthogonal: ship.orthogonal});
  }

  /**
   * Import the ships to the Dock.
   * @param exported Exported ship array.
   */
  public import(exported: IExport[]): void {
    this.build(exported);
  }

  /**
   * Randomize the placement of the ships.
   * @param orthogonality randomize the orthogonality of the ships.
   */
  public randomizePlacement(orthogonality?: boolean) {

    const randomPlace = (ship: Ship) => {

      let x = Phaser.Math.Between(0, 14) * BoardConfig.gridSize,
          y = Phaser.Math.Between(0, 14) * BoardConfig.gridSize;

      if (ship.orthogonal) {
        y = y - ship.extent * BoardConfig.gridSize;
      } else {
        x = x - ship.extent * BoardConfig.gridSize;
      }

      ship._setPosition(x, y, false, false);
    };

    let trial = 0;
    const ships = this.ships;

    // First of all Place all ships outside of the canvas.
    ships.forEach((ship) => {
      ship.setPosition(-64, -64);
      if (orthogonality && Math.random() < 0.5) {
        ship.rotate();
      }
    });

    // Start to place randomly.
    ships.forEach((ship) => {

      randomPlace(ship);

      while (ship.isColliding) {
        trial++;
        randomPlace(ship);
      }

    });

    console.log('Total trial: ', trial);
  }

  /**
   * Checks if the overall placement of the ships are valid.
   */
  public get isPlacementValid(): boolean {
    // Checks for any ship that out of the area or colliding.
    return !this.ships.some((ship) => !ship.isWithin || ship.isColliding);
  }

  /**
   * Checks if the given rectangle is inside of the Dock's placement area.
   * @param rectangle rectangle to be checked.
   */
  public contains(rectangle: Phaser.Geom.Rectangle): boolean {
    return (
      (rectangle.x >= this.area.x && rectangle.x <= this.area.right) &&
      (rectangle.right >= this.area.x && rectangle.right <= this.area.right) &&
      (rectangle.y >= this.area.y && rectangle.y <= this.area.bottom) &&
      (rectangle.bottom >= this.area.y && rectangle.bottom <= this.area.bottom)
    );
  }

  /**
   * Register the neccessary events to be handled by the scene.
   * @param scene The scene this event's to be added.
   */
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
