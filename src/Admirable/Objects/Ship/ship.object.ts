import { BoardConfig } from '../../board.config';

export class Ship extends Phaser.GameObjects.Container {

  public width: number;
  public height: number;

  // Helper rectangle for detecting overlapping/intersecting ships.
  public anchor!: Phaser.Geom.Rectangle;

  // Helper rectangle to help while positioning the ship.
  public allowedArea!: Phaser.GameObjects.Rectangle;

  // Ship sprite.
  private ship!: Phaser.GameObjects.TileSprite;

  // Default grid size.
  private gridSize: number = BoardConfig.gridSize;

  // Canvas boundaries.
  private canvasBoundary: {width: number, height: number} = {width: this.scene.sys.canvas.width, height: this.scene.sys.canvas.height};

  // Ship boundaries.
  private shipBoundary!: {width: number, height: number};

  constructor(scene: Phaser.Scene, width: number = 1, height: number = 1) {
      super(scene, 0, 0, []);

      this.width = width;
      this.height = height;

      // Create the ship sprite and add it to the container.
      this.ship = scene.add.tileSprite(0, 0, this.gridSize * width, this.gridSize * height, 'ship').setOrigin(0);

      this.shipBoundary = {width: this.ship.width, height: this.ship.height};

      this.add(this.ship);

      // Set the container interactive for event handling.
      this.setInteractive(this.ship, Phaser.Geom.Rectangle.Contains);

      // Set the container draggable on the scene.
      scene.input.setDraggable(this);

      // Create the helper rectangle for using while positioning.
      this.allowedArea = new Phaser.GameObjects.Rectangle(scene, -this.gridSize / 2, -this.gridSize / 2, this.ship.width + this.gridSize, this.ship.height + this.gridSize, 0x00A8E8, 0.2).setOrigin(0);
      this.addAt(this.allowedArea, 0);

      this.anchor = Phaser.Geom.Rectangle.Clone(this.ship.getBounds()).setSize(this.ship.getBounds().width + this.gridSize, this.ship.getBounds().height + this.gridSize);

      this.on('dragstart', (p: any, x: any, y: any) => {
        // Bring the selected ship to the top of the scene's display list.
        scene.children.bringToTop(this);
      });

      this.on('dragend', (p: any, x: any, y: any)  => {
        this.allowedArea.fillAlpha = 0.2;
        // anchor debug.
        // scene.add.graphics({fillStyle: {color: 0xFF0000}}).fillRectShape(this.anchor);
      });

      this.on('drag', (p: any, x: any, y: any) => {
        this.allowedArea.fillAlpha = 0.4;
        this._setPosition(x, y, true);
        this._checkOverlap();
      });

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
      x = Math.round(x / this.gridSize) * this.gridSize;
      y = Math.round(y / this.gridSize) * this.gridSize;
    }

    // Prevent to go outside of the canvas.
    x = Math.max(x, 0);
    x = Math.min(x, (this.canvasBoundary.width - this.shipBoundary.width));
    y = Math.max(y, 0);
    y = Math.min(y, (this.canvasBoundary.height - this.shipBoundary.height));

    // Set the position using native method.
    this.setPosition(x, y);
    this.anchor.setPosition(this.x - this.gridSize / 2, this.y - this.gridSize / 2);

  }

  /**
   * Check if the ships overlapping on the scene.
   */
  private _checkOverlap(): void {
    // Get all of the Ship objects from the scene.
    const Ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];

    // Check if ships intersects / collides with any other ships.
    Ships.forEach((ship) => {
      const _ships = Ships.filter((s) => s !== ship);

      for (const s of _ships as Ship[]) {
        const intersection = Phaser.Geom.Rectangle.Overlaps(s.anchor, ship.anchor);

        (ship as Ship).allowedArea.fillColor = intersection ? 0xFF0000 : 0x00FF00;

        if (intersection) {
          break;
        }

      }
    });
  }
}
