export class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  public init(): void {
    console.log('GameScene initialized.');
  }

}
