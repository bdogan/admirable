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

    // Create the helper rectangle for using while positioning.
    this.collisionArea = new Phaser.GameObjects.Rectangle(this.scene, -BoardConfig.gridSize / 2, -BoardConfig.gridSize / 2, this.ship.width + BoardConfig.gridSize, this.ship.height + BoardConfig.gridSize, 0x00CCFF, 0.2).setOrigin(0);
    this.addAt(this.collisionArea, 0);

    this.registerEvents();

    // Add the created ship immediately to the scene.
    scene.add.existing(this);
  }

  /**
   * @param x x position of the ship.
   * @param y y position of the ship.
   * @param snapToGrid snap to the nearest grid.
   * @param preventOverlap prevent ship to be placed other ships.
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
    // Set the container interactive for event handling.
    this.setInteractive(this.ship, Phaser.Geom.Rectangle.Contains);

    // Set the container draggable on the scene.
    this.scene.input.setDraggable(this);

    this.on('dragstart', (p: any, x: any, y: any) => {
      // Bring the selected ship to the top of the scene's display list.
      this.scene.children.bringToTop(this);
    });

    this.on('dragend', (p: any, x: any, y: any) => {
      this.collisionArea.fillAlpha = 0.2;
    });

    this.on('drag', (p: any, x: any, y: any) => {
      this.collisionArea.fillAlpha = 0.4;
      this._setPosition(x, y, true);
    });
  }

  /**
   * Determinate if the current ship collides with any other ships in the scene. O(n-1).
   */
  private get isColliding(): boolean {
    let flag: boolean = false;

    const ships = this.scene.children.list.filter((child) => child instanceof Ship && child !== this) as Ship[];

    for (const ship of ships) {
      const colliding = Phaser.Geom.Rectangle.Overlaps(this.collisionArea.getBounds(), ship.collisionArea.getBounds());

      if (colliding) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  // Check Colliding for all of the ships.
  private checkCollideForAll(): void {
    const ships = this.scene.children.list.filter((child) => child instanceof Ship) as Ship[];
    ships.forEach((ship) => ship.collisionArea.fillColor = ship.isColliding ? 0xFF0000 : 0x00CCFF);
  }

  /**
   * @param scene a Phaser.Scene to be checked for condition.
   */
  // tslint:disable-next-line: member-ordering
  public static isPlacementValid(scene: Phaser.Scene): boolean {
    const ships = scene.children.list.filter((child) => child instanceof Ship) as Ship[];
    const flag = ships.some((ship) => ship.isColliding);
    return flag;
  }
}
