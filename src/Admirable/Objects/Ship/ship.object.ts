export class Ship extends Phaser.GameObjects.Container {

  public bounds!: Phaser.GameObjects.Rectangle;
  private ship!: Phaser.GameObjects.TileSprite;

  private gridSize: number = 40;

  private canvasBounds: {width: number, height: number} = {width: this.scene.sys.canvas.width, height: this.scene.sys.canvas.height};
  private selfBounds!: {width: number, height: number};

  constructor(scene: Phaser.Scene, width: number = 1, height: number = 1) {
      super(scene, 0, 0, []);

      this.ship = scene.add.tileSprite(0, 0, this.gridSize * width, this.gridSize * height, 'ship').setTileScale(this.gridSize / 32).setOrigin(0);
      this.add(this.ship);

      this.setInteractive(this.getBounds(), Phaser.Geom.Rectangle.Contains);
      scene.input.setDraggable(this);

      this.selfBounds = {width: this.getBounds().width, height: this.getBounds().height};

      this.bounds = new Phaser.GameObjects.Rectangle(scene, -this.gridSize/2, -this.gridSize/2, this.ship.width + this.gridSize * 1, this.ship.height + this.gridSize * 1, 0x00A8E8).setOrigin(0);
      this.bounds.setAlpha(0.075);
      this.addAt(this.bounds, 0);

      this.on('dragstart', (p: any, x: any, y: any) => {
        // Bring the selected ship to the top of the scene's display list.
        scene.children.bringToTop(this);
        this.bounds.setAlpha(0.2);
      });

      this.on('dragend', (p: any, x: any, y: any)  => {
        this.bounds.setAlpha(0.075);
      });

      this.on('drag', (p: any, x: any, y: any) => {
        this._setPosition(x, y);
      });

      // scene.input.on('gameobjectdown', (p: any, o: any) => {
      //   this.bounds.destroy();
      //   // console.log(o.list);
      // });

      scene.add.existing(this);
  }

  private _setPosition(x: number, y: number, snapToGrid: boolean = true) {

    if (snapToGrid) {
      x = Math.round(x / this.gridSize) * this.gridSize;
      y = Math.round(y / this.gridSize) * this.gridSize;
    }

    x = Math.max(x, 0);
    x = Math.min(x, (this.canvasBounds.width - this.selfBounds.width));
    y = Math.max(y, 0);
    y = Math.min(y, (this.canvasBounds.height - this.selfBounds.height));

    this.setPosition(x, y);

  }

}
