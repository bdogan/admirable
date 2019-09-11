export class Input extends Phaser.GameObjects.Container {
  private pWidth!: number;
  public get width(): number {
    return this.pWidth;
  }
  public set width(v: number) {
    this.pWidth = v;
  }

  private pHeight!: number;
  public get height(): number {
    return this.pWidth;
  }
  public set height(v: number) {
    this.pHeight = v;
  }

  private pText!: string;
  public get text(): string {
    return this.pText;
  }
  public set text(v: string) {
    this.pText = v;
  }

  private rect: Phaser.GameObjects.Rectangle;
  private label: Phaser.GameObjects.Text;

  private labelOn: boolean = false;

  public constructor(scene: Phaser.Scene, text: string, x: number, y: number, w: number, h: number) {
    super(scene, x, y, []);

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.text = text;

    this.rect = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.pWidth, this.pHeight, 0xFFFFFF);
    this.rect.setStrokeStyle(2, 0x888888, 1);
    this.rect.setOrigin(0, 0);

    this.label = new Phaser.GameObjects.Text(scene, this.rect.x + 10, this.rect.y + 5, this.pText, {
      fontFamily: 'Munro',
      fontSize: '32px',
      color: '0x444444',
    });

    this.list = [this.rect, this.label];

    this.on('pointerdown', (p: any) => {
      if (p.x > this.rect.x && p.x < this.rect.x + this.rect.width &&
        p.y > this.rect.y && p.y < this.rect.y + this.rect.height) {
        this.labelOn = true;
        this.rect.strokeColor = 0xFF0000;
      } else {
        this.labelOn = false;
        this.rect.strokeColor = 0x888888;
      }
    });

    this.scene.input.keyboard.on('keyboard', (e: any) => {
      if (this.labelOn) {
        e.preventDefault();
        if (e.code === 'Backspace') {
          if (this.label.text.length > 0) {
            this.label.text = this.label.text.substring(0, this.label.text.length - 1);
          }
        } else if (e.which === 32 || (e.which >= 48 &&
          e.which <= 57) || (e.which >= 65 &&
          e.which <= 90) || (e.which >= 97 &&
          e.which <= 122)) {
          this.label.text += e.key;
          this.text = this.label.text;
        }
      }
    });
  }
}
