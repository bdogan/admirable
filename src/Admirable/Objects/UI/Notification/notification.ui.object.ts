export class Notification {
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, text: string, timeout: number = 1000) {

    this.scene = scene;
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Munro',
      fontSize: '36px',
      color: '#FFEB3B',
      backgroundColor: '#FFEB3B55',
      stroke: '#00000055',
      strokeThickness: 3,
      align: 'center',
      padding: {
        top: 6,
        left: 18,
      }
    };
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, style).setOrigin(0.5);
    this.text.setPosition(scene.sys.canvas.width / 2, scene.sys.canvas.height / 5);

    // scene.add.existing(this.text);

    // fadeOut and destroy the notification after given timeout.
    setTimeout(() => {
      this.fadeOut().then(() => this.destroy());
    }, timeout);
  }

  private destroy(): void {
    this.text.destroy();
    // console.log(this, ' has been destroyed');
  }

  /**
   * Fade out animation.
   * @returns a promise when the tween completed.
   */
  private fadeOut(): Promise<any> {
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this.text,
        duration: 320,
        ease: 'Sine',
        y: {
          getStart: () => this.text.y,
          getEnd: () => this.text.y - (this.text.height / 2),
        },
        alpha: {
          getStart: () => 1,
          getEnd: () => 0,
        },
        onComplete: () => { resolve(this); },
      });
    });
  }

  // tslint:disable-next-line: member-ordering
  public static create(scene: Phaser.Scene, text: string, timeout: number = 1000) {
    const notification = new Notification(scene, text, timeout);
    scene.add.existing(notification.text);
  }
}
