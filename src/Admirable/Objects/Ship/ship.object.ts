import { BoardConfig } from '../../board.config';

export class Ship extends Phaser.GameObjects.Container {

  public focused: boolean = false;

  // Length of the ship in grid unit.
  public extent: number = 1;

  public orthogonal: boolean = false;

  // Helper rectangle to help while positioning the ship.
  public collisionArea!: Phaser.GameObjects.Rectangle;

  // Ship sprite.
  private ship!: Phaser.GameObjects.TileSprite;

  /**
   * Constructor.
   * @param scene Scene object to attach this ship.
   * @param length Lenght of the ship in defined grid unit.
   * @param orthogonal orthogonality of the ship.
   */
  constructor(scene: Phaser.Scene, length: number = 1, orthogonal: boolean = false) {
    super(scene, 0, 0, []);

    this.extent = length;
    this.orthogonal = orthogonal;

    // create sprite.
    this.refreshSprite();

    // register the events to handle.
    this.registerEvents();

    // Add the created ship immediately to the scene.
    scene.add.existing(this);
  }

  /**
   * Rotate the ship.
   */
  public rotate() {
    this.orthogonal = !this.orthogonal;
    this.refreshSprite();
    // if colliding prevent rotate.
    if (this.isColliding) {
      this.orthogonal = !this.orthogonal;
      this.refreshSprite();
    }
    this.checkCollideForAll();
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

    // if preventOverlap true and the ship is colliding don't move.
    if (preventOverlap && this.isColliding) {
      this.setPosition(lastX, lastY);

      // if conditions met no need to check if the whole ships are colliding.
      return;
    }

    this.checkCollideForAll();
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
   * register the events to be handled for this ship object.
   */
  private registerEvents(): void {

    // Set the container draggable on the scene.
    this.scene.input.setDraggable(this);

    this.on('dragstart', (p: any, x: any, y: any) => {
      // Bring the selected ship to the top of the scene's display list.
      this.scene.children.bringToTop(this);
      this.focused = true;
    });

    this.on('dragend', (p: any, x: any, y: any) => {
      this.collisionArea.fillAlpha = 0.2;
      // in carefree mode try to place the ship correctly after the drag.
      // this._setPosition(this.x, this.y);
      this.focused = false;
    });

    this.on('drag', (p: any, x: any, y: any) => {
      this.collisionArea.fillAlpha = 0.4;
      // aggresive snap.
      this._setPosition(x, y);
      // carefree mode:
      // this._setPosition(x, y, false, false);
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

  // Check Colliding for all of the ships.
  private checkCollideForAll(): void {
    const ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];
    ships.forEach((ship) => ship.collisionArea.fillColor = ship.isColliding ? 0xFF0000 : 0x00CCFF);
  }

  private refreshSprite(): void {
    // If exist, remove the old sprites from the displayList of the container thus scene.
    if (this.ship) { this.ship.destroy(); }
    if (this.collisionArea) { this.collisionArea.destroy(); }

    let width = BoardConfig.gridSize,
      height = BoardConfig.gridSize;

    // Calculate the height and the width based on the orthogonality of the ship.
    if (this.orthogonal) {
      height *= this.extent;
    } else {
      width *= this.extent;
    }

    // Create the ship sprite and add it to the container.
    this.ship = this.scene.add.tileSprite(0, 0, width, height, 'ship').setOrigin(0);
    this.add(this.ship);

    // Create the helper rectangle for using while positioning.
    this.collisionArea = new Phaser.GameObjects.Rectangle(this.scene, -BoardConfig.gridSize / 2, -BoardConfig.gridSize / 2, width + BoardConfig.gridSize, height + BoardConfig.gridSize, 0x00CCFF, 0.2).setOrigin(0);
    this.addAt(this.collisionArea, 0);

    // If object is not interactive make it interactive.
    if (!this.input) { this.setInteractive(this.ship, Phaser.Geom.Rectangle.Contains); }
    this.input.hitArea.setSize(this.ship.width, this.ship.height);

  }

  /**
   * @param scene a Phaser.Scene to be checked for colliding Ship objects.
   */
  // tslint:disable-next-line: member-ordering
  public static isPlacementValid(scene: Phaser.Scene): boolean {
    const ships = scene.children.list.filter((child) => child instanceof Ship) as Ship[];
    const flag = ships.some((ship) => ship.isColliding);
    return flag;
  }

  // tslint:disable-next-line: member-ordering
  public static registerSceneEvents(scene: Phaser.Scene) {
    const key = scene.input.keyboard.addKey('SPACE');

    key.on('down', (event: any) => {
      // Rotate.
      const focusedShip = (scene.children.list.filter((child) => child instanceof Ship) as Ship[]).find((ship) => ship.focused);
      if (focusedShip) {
        focusedShip.rotate();
      }
      // console.log(event);
    });

  }

}
