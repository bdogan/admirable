import { BoardConfig } from '../../board.config';

export class Ship extends Phaser.GameObjects.Container {

  public hasFocus: boolean = false;

  // Length of the ship based on the grid size.
  public extent: number = 1;

  // Orthogonality of the ship. True if it's vertical.
  public orthogonal: boolean = false;

  // Ship sprite.
  private ship!: Phaser.GameObjects.TileSprite;

  // Helper rectangle to help while positioning the ship.
  private collisionArea!: Phaser.GameObjects.Rectangle;

  private interactive: boolean = false;

  /**
   * Constructor.
   * @param scene The scene this ship belongs to.
   * @param length Lenght of the ship based on the grid size.
   * @param orthogonal Orthogonality of the ship.
   */
  constructor(scene: Phaser.Scene, length: number = 1, orthogonal: boolean = false, interactive: boolean = false) {
    super(scene, 0, 0, []);

    this.extent = length;
    this.orthogonal = orthogonal;
    this.interactive = interactive;

    // Create the ship sprite and it's colision area.
    this.refreshSprite();

    // Register the events to be handled if interactive true.
    if (this.interactive) {
      this.registerEvents();
    }

    // Add the created ship immediately to the scene.
    scene.add.existing(this);
  }

  /**
   * @param x x position of the ship.
   * @param y y position of the ship.
   * @param snapToGrid snap to the nearest grid.
   * @param preventOverlap prevent ship to be placed on the other ships.
   */
  public _setPosition(x: number, y: number, snapToGrid: boolean = true, preventOverlap: boolean = true): void {
    // store the last position to be used when preventOverlap is true.
    const lastX = this.x,
      lastY = this.y;

    // if snapGrid is true modify the x, y value to be fit in grid lines.
    if (snapToGrid) {
      // was Math.floor
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

    // if not interactive don't check for errors.
    if (!this.interactive) {return; }

    // if preventOverlap true and the ship is colliding don't move.
    if (preventOverlap && this.isColliding) {
      this.setPosition(lastX, lastY);

      // if conditions met no need to check if the whole ships are colliding.
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

    // Calculate the width and the height based on the orthogonality of the ship.
    if (this.orthogonal) {
      height *= this.extent;
    } else {
      width *= this.extent;
    }

    // Create the ship sprite and add it to the container.
    this.ship = this.scene.add.tileSprite(0, 0, width, height, 'ship').setOrigin(0);
    this.add(this.ship);

    // Create the helper rectangle for using while positioning.
    if (this.interactive) {
      this.collisionArea = new Phaser.GameObjects.Rectangle(this.scene, -BoardConfig.gridSize / 2, -BoardConfig.gridSize / 2, width + BoardConfig.gridSize, height + BoardConfig.gridSize, 0x00CCFF, 0.2).setOrigin(0);
      this.collisionArea.setStrokeStyle(1, 0x00CCFF, 0.8);
      this.addAt(this.collisionArea, 0);
    }

    // If object is not interactive make it interactive.
    if (!this.input) { this.setInteractive(this.ship, Phaser.Geom.Rectangle.Contains); }

    // Change the size of the hitArea on refresh. This is required when the shape of the sprite is changed.
    this.input.hitArea.setSize(this.ship.width, this.ship.height);

  }

  /**
   * Register the events to be handled for this ship object.
   */
  private registerEvents(): void {

    // Set the container draggable on the scene.
    this.scene.input.setDraggable(this);

    this.on('dragstart', (p: any, x: any, y: any) => {

      this.collisionArea.fillAlpha = 0.4;
      this.collisionArea.strokeAlpha = 1;

      // Bring the selected ship to the top of the scene's display list.
      this.scene.children.bringToTop(this);

      this.hasFocus = true;
    });

    this.on('dragend', (p: any, x: any, y: any) => {

      this.collisionArea.fillAlpha = 0.2;
      this.collisionArea.strokeAlpha = 0.5;

      // in carefree mode try to place the ship correctly after the drag.
      // this._setPosition(this.x, this.y);

      this.hasFocus = false;
    });

    this.on('drag', (p: any, x: any, y: any) => {

      // aggresive snap.
      this._setPosition(x, y);

      // carefree mode:
      // this._setPosition(x, y, false, false);

      // this._setPosition(x, y, true, false);

    });

  }

  /**
   * Determinate if the current ship collides with any other ships in the scene.
   */
  private get isColliding(): boolean {

    const ships = this.scene.children.list.filter((child) => child instanceof Ship && child !== this) as Ship[];

    const flag = ships.some((ship) => Phaser.Geom.Rectangle.Overlaps(this.collisionArea.getBounds(), ship.collisionArea.getBounds()));

    return flag;
  }

  /**
   * Check if the ship is inside of the placement area.
   */
  private get isWithinArea(): boolean {
    const w = this.scene.sys.canvas.width, h = this.scene.sys.canvas.height;

    // return !Phaser.Geom.Rectangle.Overlaps(this.ship.getBounds(), new Phaser.Geom.Rectangle(w / 2, 0, w / 2, h));

    // We have to use this hack to be sure if the ship is not overflowing out of the placement area.
    return !Phaser.Geom.Intersects.RectangleToValues(this.ship.getBounds(), w / 2, w, 0, h, -1);
  }

  private checkError(): void {

    const ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];

    ships.forEach((ship) => {
      const error = ship.isColliding || !ship.isWithinArea;
      ship.collisionArea.fillColor = error ? 0xFF0000 : 0x00CCFF;
      ship.collisionArea.strokeColor = error ? 0xFF0000 : 0x00CCFF;
    });

  }

  /**
   * Rotate the ship.
   */
  private rotate() {
    this.orthogonal = !this.orthogonal;

    this.refreshSprite();

    // if the rotated ship is colliding revert the rotation.
    if (this.isColliding) {
      this.orthogonal = !this.orthogonal;
      this.refreshSprite();
    }

    this.checkError();
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

  /**
   * @param scene a Phaser.Scene to be checked for colliding Ship objects.
   */
  // tslint:disable-next-line: member-ordering
  public static isPlacementValid(scene: Phaser.Scene): boolean {
    const ships = scene.children.list.filter((child) => child instanceof Ship) as Ship[];

    // check and return as soon as possible if any ship on the scene is coliding or outside of the placement area.
    const flag = ships.some((ship) => ship.isColliding || !ship.isWithinArea);

    // if flag is true overall placement is not valid.
    return !flag;
  }

  // tslint:disable-next-line: member-ordering
  public static registerSceneEvents(scene: Phaser.Scene) {
    const key = scene.input.keyboard.addKey('SPACE');

    key.on('down', (event: any) => {
      // Rotate.
      const focusedShip = (scene.children.list.filter((child) => child instanceof Ship) as Ship[]).find((ship) => ship.hasFocus);
      if (focusedShip) {
        focusedShip.rotate();
      }
    });

  }

}
