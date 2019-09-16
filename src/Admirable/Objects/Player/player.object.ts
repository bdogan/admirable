import { Dock } from '../Ship';

export class Player {
  private _scene!: Phaser.Scene;

  public get scene(): Phaser.Scene {
    return this._scene;
  }

  public set scene(scene: Phaser.Scene) {
    this._scene = scene;
    this._dock = new Dock(this.scene);
  }

  private _dock!: Dock;

  public get dock(): Dock {
    return this._dock;
  }

  public get life(): number {
    return this.dock.life;
  }
}

export const player = new Player();
