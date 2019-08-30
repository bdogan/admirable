export class BootScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'BootScene',
    });
  }

  public init(): void {
    console.log('BootScene initialized');
  }

  public update(): void {
    this.scene.start('SetupScene');
  }

}
