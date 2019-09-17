import { Dock } from '../Ship';
import { transmission } from '../Transmission';

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

  constructor() {
    transmission.on('player.hit', () => {
      console.log('test');
    });
  }
}

export const player = new Player();
