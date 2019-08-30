export class Cursor {

  public x: number = 0;
  public y: number = 0;

  public width: number;
  public height: number;

  public graphic!: Phaser.GameObjects.Graphics;

  private controls: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, width: number, height: number) {
    this.controls = scene.input.keyboard.createCursorKeys();

    this.width = width;
    this.height = height;

    this.graphic = scene.add.graphics({
      lineStyle: {color: 0xFF0000, width: 2},
      x: this.x,
      y: this.y,
    }).strokeRect(0, 0, this.width, this.height);

  }

  public handleInput(): void {

    if (Phaser.Input.Keyboard.JustDown(this.controls.up as Phaser.Input.Keyboard.Key)) {
      this.graphic.y = Math.max(0, (this.graphic.y - this.height));
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.down as Phaser.Input.Keyboard.Key)) {
      this.graphic.y = Math.min(480 - this.height, (this.graphic.y + this.height));
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.left as Phaser.Input.Keyboard.Key)) {
      this.graphic.x = Math.max(0, (this.graphic.x - this.width));
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.right as Phaser.Input.Keyboard.Key)) {
      this.graphic.x = Math.min(960 - this.width, (this.graphic.x + this.width));
    }

  }

}
