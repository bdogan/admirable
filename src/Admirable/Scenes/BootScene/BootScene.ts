export class BootScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'BootScene',
    });
  }

  public init(): void {
    console.log('BootScene initialized');
  }

  public preload(): void {
    this.load.pack(
      'preload',
      './src/Admirable/Assets/assets.json',
      'preload',
    );
  }

  public update(): void {
    this.scene.start('MenuScene');
  }

}
