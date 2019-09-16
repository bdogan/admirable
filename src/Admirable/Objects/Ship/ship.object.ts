import { BoardConfig } from '../../board.config';
import { Dock } from './dock.object';

export class Ship extends Phaser.GameObjects.Container {

  public hasFocus: boolean = false;

  // Extension of the ship based on the grid size.
  public extent: number = 1;

  // Orthogonality of the ship. True if it's vertical.
  public orthogonal: boolean = false;

  public life: number;

  // The dock this ship belongs to.
  private dock: Dock;

  // Ship sprite.
  private ship!: Phaser.GameObjects.TileSprite;

  // Collision rectangle to help while positioning the ship.
  private collisionArea!: Phaser.GameObjects.Rectangle;

  private interactive: boolean = false;

  /**
   * Constructor.
   * @param scene The scene this ship belongs to.
   * @param length Lenght of the ship based on the grid size.
   * @param orthogonal Orthogonality of the ship.
   */
  constructor(dock: Dock, scene: Phaser.Scene, length: number = 1, orthogonal: boolean = false, interactive: boolean = false) {
    super(scene, 0, 0, []);

    this.dock = dock;
    this.extent = length;
    this.life = this.extent;
    this.orthogonal = orthogonal;
    this.interactive = interactive;

    // Create the ship sprite and it's colision area.
    this.refreshSprite();

    if (this.interactive) {
      // Register the events to be handled if interactive true.
      this.registerEvents();
    }

    // Add the created ship immediately to the scene.
    scene.add.existing(this);
  }

  /**
   * A useful wrapper for native setPosition.
   * @param x x position of the ship.
   * @param y y position of the ship.
   * @param snapToGrid snap to the nearest grid area.
   * @param preventOverlap prevent the ship to be placed on the other ships.
   */
  public _setPosition(x: number, y: number, snapToGrid: boolean = true, preventOverlap: boolean = true): void {

    // store the last position to be used when preventOverlap is true.
    const lastX = this.x,  lastY = this.y;

    if (snapToGrid) {
      // Modify the x and y value to be fit in the nearest grid area.
      x = Math.floor(x / BoardConfig.gridSize) * BoardConfig.gridSize;
      y = Math.floor(y / BoardConfig.gridSize) * BoardConfig.gridSize;
    }

    // Determinate if the position has been changed. If not, just return.
    const isChanged = !!((this.x - x) || (this.y - y));
    if (!isChanged) {
      return;
    }

    // Prevent to go outside of the canvas.
    const xMax = (this.scene.sys.canvas.width  - this.ship.getBounds().width),
          yMax = (this.scene.sys.canvas.height - this.ship.getBounds().height);

    x = this.getBetween(x, 0, xMax);
    y = this.getBetween(y, 0, yMax);

    // Set the position using native method.
    this.setPosition(x, y);

    if (!this.interactive) {
      // If the ship is not interactive return immediately and don't check for any error.
      return;
    }

    if (preventOverlap && this.isColliding) {
      // if preventOverlap true and the ship is colliding return to the last safe position.
      this.setPosition(lastX, lastY);

      // If conditions met no need to check if the whole ships are colliding.
      // Since the only subject to overlap is the target ship and any overlap is prevented.
      return;
    }

    this.checkError();
  }

  /**
   * Rotate the ship.
   */
  public rotate() {

    this.orthogonal = !this.orthogonal;
    this.refreshSprite();

    if (this.isColliding) {

      // If the rotated ship is colliding revert the rotation.
      this.orthogonal = !this.orthogonal;
      this.refreshSprite();

      return;
    }

    this.checkError();
  }

  private refreshSprite(): void {

    // If exist, remove the old sprites from the displayList of the container thus scene.
    if (this.ship) { this.ship.destroy(); }
    if (this.collisionArea) { this.collisionArea.destroy(); }

    // Set base width and height.
    let width  = BoardConfig.gridSize,
        height = BoardConfig.gridSize;

    // Calculate the width and the height based on the orthogonality of the ship and it's extent on that axis.
    if (this.orthogonal) {
      height *= this.extent;
    } else {
      width *= this.extent;
    }

    // Create the ship sprite and add it to the container.
    this.ship = this.scene.add.tileSprite(0, 0, width, height, 'ship_middle').setOrigin(0);
    this.add(this.ship);

    if (this.interactive) {

      if (!this.input) {
        // If object is not interactive make it interactive.
        this.setInteractive(this.ship, Phaser.Geom.Rectangle.Contains);
      }

      // If the ship is interactive create the helper rectangle for using while positioning.
      this.collisionArea = new Phaser.GameObjects.Rectangle(this.scene, -BoardConfig.gridSize / 2, -BoardConfig.gridSize / 2, width + BoardConfig.gridSize, height + BoardConfig.gridSize, 0x00CCFF, 0.4).setOrigin(0);
      this.collisionArea.setStrokeStyle(1, 0x00CCFF, 1);
      this.collisionArea.alpha = 0.5;
      this.addAt(this.collisionArea, 0);

      // Change the size of the hitArea on refresh. This is required when the shape of the sprite is changed.
      this.input.hitArea.setSize(this.ship.width, this.ship.height);
    }
  }

  /**
   * Register the events to be handled for this ship object.
   */
  private registerEvents(): void {

    // Set the container draggable on the scene.
    this.scene.input.setDraggable(this);

    this.on('dragstart', (p: any, x: any, y: any) => {
      this.scene.input.setDefaultCursor('none');
      this.hasFocus = true;

      // Bring the selected ship to the top of the scene's display list.
      this.scene.children.bringToTop(this);

      this.collisionArea.alpha = 1;

    });

    this.on('dragend', (p: any, x: any, y: any) => {
      this.scene.input.setDefaultCursor('default');
      this.hasFocus = false;

      this.collisionArea.alpha = 0.5;

    });

    // x and y is relative to the mousedown position and it feels more natural while dragging, but p.x and p.y is more accurate.
    this.on('drag', (p: Phaser.Input.Pointer, x: any, y: any) => {

      this._setPosition(p.x, p.y);

    });

  }

  /**
   * Determinate if the current ship collides with any other ships in the scene.
   */
  public get isColliding(): boolean {

    const ships = this.dock.ships.filter((ship) => ship !== this);

    const flag = ships.some((ship) => Phaser.Geom.Rectangle.Overlaps(this.collisionArea.getBounds(), ship.collisionArea.getBounds()));

    return flag;
  }

  /**
   * Determinate if the ship is inside of the placement area.
   */
  public get isWithin(): boolean {

    return this.dock.contains(this.ship.getBounds());

  }

  private checkError(): void {

    const ships = this.dock.ships;

    ships.forEach((ship) => {
      const error = ship.isColliding || !ship.isWithin;
      ship.collisionArea.fillColor = error ? 0xFF0000 : 0x00CCFF;
      ship.collisionArea.strokeColor = error ? 0xFF0000 : 0x00CCFF;
    });

  }

  /**
   * Limits the given number between [min, max]
   * @param value value to be limited.
   * @param min minimum limit of the value.
   * @param max maximum limit of the value.
   * @returns min if value < min, max if max < value, value if otherwise.
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

}
