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

  private background: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

  /**
   * clickState helps us to ensure if the click event happened within the button's bounds.
   */
  private clickState: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number = 256, height: number = 64) {
    super(scene, x, y, []);
    this.x = x ; // + width / 2;
    this.y = y ; // + height / 2;
    this.width  = width;
    this.height = height;

    this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, 0xCCFF00);

    this.text = new Phaser.GameObjects.Text(scene, 0, 0, 'START', {fontFamily: 'Munro', fontSize: '48px', color: '#000000'}).setOrigin(0.5);

    // this.text.setStyle({backgroundColor: '#FF0000'});

    this.list = [this.background, this.text];

    // Set the container interactive to handle event inputs.
    this.setInteractive(this.background, Phaser.Geom.Rectangle.Contains);

    this.on(MouseEvent.onEnter, (e: any) => {
      scene.input.setDefaultCursor('pointer');
      this.background.setFillStyle(0xFFCC00);
    });

    this.on(MouseEvent.onLeave, (e: any) => {
      scene.input.setDefaultCursor('default');
      this.background.setFillStyle(0xCCFF00);

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

    // Add the button container to the scene at object creation.
    // scene.add.existing(this);
  }

}
