import { player } from '../../Player';

type FontStyle = Phaser.Types.GameObjects.Text.TextStyle;

export class Notification {

  /**
   * Create a notification object and add it to the player's current scene.
   */
  public static create(text: string, timeout: number = 1000, style: FontStyle = {}) {
    const notification = new Notification(player.scene, text, timeout, style);
    player.scene.add.existing(notification.text);
  }

  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, text: string, timeout: number = 1000, style: FontStyle = {}) {

    this.scene = scene;

    // set the default font style.
    const _style: FontStyle = {
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

    // assign the custom style attributes.
    Object.assign(_style, style);

    this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, _style).setOrigin(0.5);
    this.text.setPosition(scene.sys.canvas.width / 2, scene.sys.canvas.height / 5);

    // scene.add.existing(this.text);

    // fadeOut and destroy the notification after given timeout.
    setTimeout(() => {
      this.fadeOut().then(() => this.destroy());
    }, timeout);
  }

  /**
   * Destroys the relevant game object.
   */
  private destroy(): void {
    this.text.destroy();
    // console.log(this, ' has been destroyed');
  }

  /**
   * Fade out animation.
   * @returns a promise when the tween completed.
   */
  private fadeOut(): Promise<Notification> {
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

}
