import { Cursor } from '../../Objects/Cursor';
import { AdmirableScene } from '../admirable.scene';
import { BoardConfig } from '../../board.config';
import { Ship } from '../../Objects/Ship';

@AdmirableScene({
  key: 'game'
})
export class GameScene extends Phaser.Scene {

  private grid!: Phaser.GameObjects.Graphics;
  private line!: Phaser.GameObjects.Graphics;
  private isDrawing: boolean = false;

  private cursor!: Cursor;

  public init(data: any): void {
    console.log('GameScene initialized.');
    console.log('passed data: ', data);
  }

  public create(data: any): void {

    this.line = this.add.graphics();

    this.input.on('pointerdown', this.onMouseDown, this);
    this.input.on('pointermove', this.onMouseMove, this);
    this.input.on('pointerup', this.onMouseUp, this);

    this.grid = this.add.graphics();
    this.drawGrid();

    data.ships.forEach((s: Ship) => {
      // console.log(ship);
      const ship = new Ship(this, s.extent, s.orthogonal);
      ship._setPosition(s.x, s.y);
      this.add.existing(ship);
    });

    this.cursor = new Cursor(this, BoardConfig.gridSize);
  }

  public update(): void {
    this.cursor.handleInput();
  }

  private onMouseDown(event: any) {
    this.isDrawing = true;
  }

  private onMouseMove(event: any) {
    if (this.isDrawing) {
      this.line.clear();
      this.line.lineStyle(1, 0xccff00);
      this.line.moveTo(event.downX, event.downY);
      this.line.lineTo(event.x, event.y);
      this.line.strokePath();
    }
  }

  private onMouseUp(event: any) {
    this.isDrawing = false;
  }

  private drawGrid() {
    const gap = BoardConfig.gridSize;
    const canvasWidth = this.sys.canvas.width;
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

    // Draw middle line;
    this.grid.lineStyle(1, 0x00A8E8, 1);
    this.grid.lineBetween(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);

    this.grid.strokePath();
  }
}
