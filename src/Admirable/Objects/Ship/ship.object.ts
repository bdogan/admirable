import { BoardConfig } from '../../board.config';

export class Ship extends Phaser.GameObjects.Container {

  public width: number;
  public height: number;

  // Helper rectangle to help while positioning the ship.
  public collisionArea!: Phaser.GameObjects.Rectangle;

  // Ship sprite.
  private ship!: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene, width: number = 1, height: number = 1) {
      super(scene, 0, 0, []);

      this.width = width;
      this.height = height;

      // Create the ship sprite and add it to the container.
      this.ship = scene.add.tileSprite(0, 0, BoardConfig.gridSize * width, BoardConfig.gridSize * height, 'ship').setOrigin(0);
      this.add(this.ship);

      this.registerEvents();

      // Add the created ship immediately to the scene.
      scene.add.existing(this);
  }

  /**
   * @param x x position of the ship.
   * @param y y position of the ship.
   * @param snapToGrid snap to the nearest grid.
   */
  public _setPosition(x: number, y: number, snapToGrid: boolean = true): void {

    if (snapToGrid) {
      x = Math.round(x / BoardConfig.gridSize) * BoardConfig.gridSize;
      y = Math.round(y / BoardConfig.gridSize) * BoardConfig.gridSize;
    }

    // Prevent to go outside of the canvas.
    const xMax = (this.scene.sys.canvas.width - this.ship.getBounds().width),
          yMax = (this.scene.sys.canvas.height - this.ship.getBounds().height);

    x = this.getBetween(x, 0, xMax);
    y = this.getBetween(y, 0, yMax);

    // Set the position using native method.
    this.setPosition(x, y);
  }

  /**
   * Checks if any ship on the scene collides with  other ships.
   * @returns true if collision detected, false if not.
   */
  private _isOverlapping(): boolean {
    let flag: boolean = false;
    // Get all of the Ship objects from the scene.
    const Ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];

    // Check if ships intersects / collides with any other ships on the scene.
    Ships.forEach((ship) => {
      const _ships = Ships.filter((s) => s !== ship);

      for (const s of _ships) {
        const intersection = Phaser.Geom.Rectangle.Overlaps(s.collisionArea.getBounds(), ship.collisionArea.getBounds());

        ship.collisionArea.fillColor = intersection ? 0xFF0000 : 0x00FF00;

        if (intersection) {
          flag = true;
          break;
        }
      }
    });

    return flag;
  }
/**
 * @param value value to be bounded
 * @param min minimum bound of the value
 * @param max maximum bound of the value
 */
  private getBetween(value: number, min: number, max: number): number {

    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }

  private registerEvents(): void {
     // Set the container interactive for event handling.
     this.setInteractive(this.ship, Phaser.Geom.Rectangle.Contains);

     // Set the container draggable on the scene.
     this.scene.input.setDraggable(this);

     // Create the helper rectangle for using while positioning.
     this.collisionArea = new Phaser.GameObjects.Rectangle(this.scene, -BoardConfig.gridSize / 2, -BoardConfig.gridSize / 2, this.ship.width + BoardConfig.gridSize, this.ship.height + BoardConfig.gridSize, 0x00A8E8, 0.2).setOrigin(0);
     this.addAt(this.collisionArea, 0);

     this.on('dragstart', (p: any, x: any, y: any) => {
       // Bring the selected ship to the top of the scene's display list.
       this.scene.children.bringToTop(this);
     });

     this.on('dragend', (p: any, x: any, y: any)  => {
       this.collisionArea.fillAlpha = 0.2;
     });

     this.on('drag', (p: any, x: any, y: any) => {
       this.collisionArea.fillAlpha = 0.4;

       this._setPosition(x, y, true);
       this._isOverlapping();

     });
  }
}
