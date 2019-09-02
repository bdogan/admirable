export class ButtonSprite extends Phaser.GameObjects.Rectangle {

  private buttonShape: any;

  constructor(scene: Phaser.Scene, x: number, y: number, width?: number, height?: number, fillColor?: number, fillAlpha?: number) {
    super(scene, x, y, width, height, fillColor);
    this.setInteractive();
    scene.add.existing(this);

    this.on('pointerover', (e: any) => {
      this.setFillStyle(0xCCFF00, 1);
    });

    this.on('pointerout', (e: any) => {
      this.setFillStyle(0xFFCC00, 1);
    });
  }

}
