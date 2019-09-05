export enum MouseEvent {
  onClick = 'pointerclick',
  onDown = 'pointerdown' ,
  onUp = 'pointerup',
  onEnter = 'pointerover',
  onLeave = 'pointerout',
  onMove = 'pointermove',
  onWheel = 'wheel',
}

export class Button extends Phaser.GameObjects.Container {

  public width: number;
  public height: number;

  public text: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Rectangle;

  /**
   * clickState helps us to ensure if the click event happened within the button's bounds.
   */
  private clickState: boolean = false;

  constructor(scene: Phaser.Scene, text: string, x: number, y: number, width: number = 256, height: number = 64) {
    super(scene, x, y, []);

    this.x = x; // + width / 2;
    this.y = y; // + height / 2;
    this.width  = width;
    this.height = height;

    // button background.
    this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, 0x00A8E8);

    // button text.
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, {fontFamily: 'Munro', fontSize: '48px', color: '#00171F'}).setOrigin(0.5);

    // add child's to the container.
    this.list = [this.background, this.text];

    // Set the container interactive to handle event inputs.
    this.setInteractive(this.background, Phaser.Geom.Rectangle.Contains);

    this.on(MouseEvent.onEnter, (e: any) => {
      scene.input.setDefaultCursor('pointer');

      this.background.setFillStyle(0x00A8E8, 0.5);
    });

    this.on(MouseEvent.onLeave, (e: any) => {
      scene.input.setDefaultCursor('default');

      this.background.setFillStyle(0x00A8E8);

      this.clickState = false;
    });

    this.on(MouseEvent.onDown, (e: any) => {
      this.clickState = true;
    });

    this.on(MouseEvent.onUp, (e: any) => {
      if (this.clickState) {
        this.clickState = false;

        // Emit custom event to handle the click event properly.
        this.emit(MouseEvent.onClick, e);
      }
    });

    // workaround for cursor style freezing problem  whenever scene changes.
    scene.events.once('shutdown', () => {
      scene.input.setDefaultCursor('default');
    });

    // Add the button container to the scene at object creation.
    // scene.add.existing(this);
  }

}
