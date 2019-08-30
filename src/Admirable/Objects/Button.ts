export class Button {

  public x: number;
  public y: number;
  public shape: Phaser.Geom.Rectangle;
  public text: Phaser.GameObjects.Text;
  private graphics: Phaser.GameObjects.Graphics;

  private clickState = false;

  constructor(scene: Phaser.Scene, x: number = 80, y: number = 80) {
    this.x = x;
    this.y = y;

    this.graphics = scene.add.graphics({
      fillStyle: {color: 0xCCFF00},
      // lineStyle: {color: 0xFF0000, width: 2},
    });
    this.shape = new Phaser.Geom.Rectangle(0, 0, 240, 40);
    this.graphics = this.graphics.fillRoundedRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height, 6);

    const hitShape: Phaser.Types.Input.InputConfiguration = {
      hitArea : this.shape,
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
    };

    this.graphics.setInteractive(hitShape);

    this.text = scene.add.text(120, 20, 'Test Düğmesi', { fontFamily: 'Arial', fontSize: 18, color: '#000000' }).setOrigin(0.5);
    scene.add.container(this.x, this.y, [this.graphics, this.text]);

    this.graphics.on('pointerover', (e: any) => {
      // console.log('pointerover', e);
      this.text.setText('Hover');
      this.text.setStyle({color: '#FF0000'});
    });

    this.graphics.on('pointerout', (e: any) => {
      this.text.setStyle({color: '#000000'});
    });

    this.graphics.on('pointerdown', (e: any) => {
      this.clickState = true;
  });
    this.graphics.on('pointerup', (e: any) => {
      if (this.clickState) {
        this.clickState = false;
        this.onClick(e);
      }
    });
}

  public onClick(e: any): void { return; }

}
