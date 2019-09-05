import { AdmirableScene } from '../admirable.scene';
const sea = require('./Images/sea.png');
const levelJson = require('./Tiles/level.json');

@AdmirableScene({
  key: 'setup'
})
export class SetupScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;
  private tile: any;
  private map: any;
  private layer: any;

  // Init
  public init(): void {
    console.log('SetupScene initialized.');
  }

  // Preload
  public preload() {
    /*this.load.spritesheet('sea', sea, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.animation('seaAnimation', seaJson);*/

    this.load.image('sea', sea);
  }

  // Create
  public create(): void {

    // Create tilemap from level data based on a JSON file
    this.map = this.make.tilemap({
      data: levelJson,
      tileWidth: 32,
      tileHeight: 32
    });

    // Create tiles by sea image with tilemap
    this.tile = this.map.addTilesetImage('sea');

    // Create dynamic layer by tiles
    this.layer = this.map.createDynamicLayer(0, this.tile, 0,  0);

    console.log(this.layer);

    /*const seaAnim = this.add.sprite(0, 0, 'sea', 0);
    seaAnim.anims.play('drawSea');
    seaAnim.setDisplaySize(80, 80);*/

    this.grid = this.add.graphics();
    this.drawGrid();

    // Snap Test
    const sip = this.add.image(32, 32, 'test').setOrigin(0, 0).setInteractive();

    sip.setDisplaySize(32, 32);

    this.input.setDraggable(sip);

    sip.on('drag', (p: any, x: any, y: any) => {
      // const dX = Phaser.Math.Snap.To(x, 40, 1);
      // const dY = Phaser.Math.Snap.To(y, 40, 1);
      sip.x = x;
      sip.y = y;
    });

    sip.on('dragend', (p: any) => {
      const dX = Phaser.Math.Snap.To(p.upX, 40);
      const dY = Phaser.Math.Snap.To(p.upY, 40);
      sip.x = dX;
      sip.y = dY;
    });

    const ShipContainer = this.add.container(0, 0);
    const s1  = this.add.image(0, 0, 'test').setOrigin(0).setDisplaySize(32, 32);
    const s2  = this.add.image(0, 40, 'test').setOrigin(0).setDisplaySize(32, 32);
    const s3  = this.add.image(0, 80, 'test').setOrigin(0).setDisplaySize(32, 32);
    const bound = new Phaser.GameObjects.Rectangle(this, -32, -32, 96, 160, 0x00A8E8, 0.1).setOrigin(0);
    ShipContainer.add([s1, s2, s3]);

    ShipContainer.setInteractive(ShipContainer.getBounds(), Phaser.Geom.Rectangle.Contains);
    this.input.setDraggable(ShipContainer);
    const bounds = ShipContainer.getBounds();
    // console.log(ShipContainer.getBounds());
    // ShipContainer.angle = 90;
    // container pozisyonu setinteractiveden sonra verilmeli, aksi halde, hitarea ile container
    // tutarsız davranıyor.

    ShipContainer.addAt(bound, 0);

    ShipContainer.on('dragstart', () => {
      bound.setFillStyle(0x00A8E8, 0.3);
    });

    ShipContainer.on('dragend', () => {
      bound.setFillStyle(0x00A8E8, 0.1);
    });

    ShipContainer.setPosition(560, 160);
    const canvasHeight = this.sys.canvas.height,
          canvasWidth = this.sys.canvas.width;
    ShipContainer.on('drag', (p: any, x: any, y: any) => {
      // console.log(ShipContainer.angle);
      let dX, dY;

      if (x < (canvasWidth - 40) / 2) {
        dX = Phaser.Math.Snap.To(x, 32, 1);
        dY = Phaser.Math.Snap.To(y, 32, 1);
      } else {
        dX = x;
        dY = y;
      }

      dX = Math.max(dX, 1);
      dX = Math.min(dX, canvasWidth - bounds.width);
      dY = Math.max(dY, 1);
      dY = Math.min(dY, canvasHeight - bounds.height);

      ShipContainer.x = dX;
      ShipContainer.y = dY;
    });

  }

  public update() {
    // Change layer images randomly
    let a = 0;

    for (let i = 0; i < levelJson.length; i++) {
      for (let j = 0; j < levelJson.length[0]; j++) {
        a = 1 - a;
        this.layer.replaceByIndex(a, a, j, i);
      }
    }
  }

  private drawGrid() {
    const gap = 32;
    const canvasWidth = this.sys.canvas.width / 2;
    const canvasHeight = this.sys.canvas.height;

    this.grid.lineStyle(1, 0x00A8E8, 0.25);

    // Draw vertical lines through x-axis.
    for (let x = 0, column = (canvasWidth / gap); x < column; x++) {
      const dX = (x * gap);
      this.grid.lineBetween(dX, 0, dX, canvasWidth);
    }

    // Draw horizontal lines through y-axis.
    for (let y = 0, row = (canvasHeight / gap); y < row; y++) {
      const dY = (y * gap);
      this.grid.lineBetween(0, dY, canvasWidth, dY);
    }
    // midline
    this.grid.lineStyle(1, 0x00A8E8, 1);
    this.grid.lineBetween(canvasWidth, 0, canvasWidth, canvasHeight);

    this.grid.strokePath();
  }

}
