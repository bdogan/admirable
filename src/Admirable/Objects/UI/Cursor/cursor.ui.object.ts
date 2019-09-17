import { BoardConfig } from '../../../board.config';
import { MouseEvent } from '../Button';

export class Cursor {

  public static attach(scene: Phaser.Scene, isInteractive: boolean = true): Cursor {
    const cursor = new Cursor(scene, isInteractive);
    return cursor;
  }

  // Cursor shape.
  public shape: Phaser.GameObjects.Rectangle;

  // The scene cursor have been attached.
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, isInteractive: boolean = true) {
    this.scene = scene;
    this.shape = new Phaser.GameObjects.Rectangle(scene, 0, 0, BoardConfig.gridSize, BoardConfig.gridSize).setOrigin(0);

    this.shape.setStrokeStyle(1, 0xFFFFFF, 1);
    scene.add.existing(this.shape);

    if (isInteractive) {
      this.registerEvents();
    }
  }

  public _setPosition(x: number, y: number, snapToGrid: boolean = true): void {
    if (snapToGrid) {
      x = Math.floor( x / BoardConfig.gridSize ) * BoardConfig.gridSize;
      y = Math.floor( y / BoardConfig.gridSize ) * BoardConfig.gridSize;
    }

    // Determinate if the position has been changed, and set the position if changed.
    const isChanged = !!((this.shape.x - x) || (this.shape.y - y));
    if (isChanged) {
      this.shape.setPosition(x, y);
    }
  }

  private registerEvents(): void {

    // this.scene.input.setDefaultCursor('none');

    this.scene.input.on(MouseEvent.onMove, (pointer: Phaser.Input.Pointer) => {
      this.scene.children.bringToTop(this.shape);
      this._setPosition(pointer.x, pointer.y);
    });

    this.scene.input.on(MouseEvent.onDown, (pointer: Phaser.Input.Pointer) => {
      // this.shape.visible = false;
      this.shape.setFillStyle(0xFFFF00, 0.1);
      this.shape.setStrokeStyle(2, 0xFFFF00, 1);
    });

    this.scene.input.on(MouseEvent.onUp, (pointer: Phaser.Input.Pointer) => {
      // this.shape.visible = true;
      this.shape.setFillStyle(0xFFFF00, 0);
      this.shape.setStrokeStyle(1, 0xFFFFFF, 1);
    });
  }
}
