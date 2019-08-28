import { Sprite } from '../../Sprite';
import { Graphics, HORIZ_ALIGN } from 'p5';
import { KeyState } from '../../Enums';

const BLOCKED_CHARS = [
                        8,  // Back Space
                        13, // Enter
                        16, // Shift
                        17, // Control
                        18, // Alt
                        37, // Arrow Left
                        38, // Arrow Up
                        39, // Arrow Right
                        40, // Arrow Down
                        46, // Delete
                      ];

export class TextBox extends Sprite {
  public value: string;
  public focus: boolean = false;

  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public graphics: Graphics;

  private pCursorBlink: number = 0;

  /**
   * Hold's the current cursor position relative to the text's end.
   */
  private pCursorPosition: number = 0;

  /**
   * Set the cursor position.
   */
  private set cursorPosition(p: number) {
    // console.log(p);
    this.pCursorPosition = p;

    console.log(this.graphics.textWidth(this.value), this.cursorPosition, this.graphics.width);
  }
  /**
   * @returns the cursor X position relative to the textbox bounds.
   */
  private get cursorPosition(): number {
    // // find the width value of the substring at the cursor position.
    // let cp = this.graphics.textWidth(this.value.substring(0, this.value.length - this.pCursorPosition));
    // // this.textBoxPosition is <= 0
    // cp = cp + this.textBoxPosition;
    // return cp;
    const cp = this.graphics.textWidth(this.value.substring(0, this.value.length - this.pCursorPosition));
    const delta = (this.width + cp);
    return Math.min(cp, this.width);
  }

  /**
   * @returns text's position relative to the textbox wrapper.
   */
  private get textBoxPosition(): number {
    const cp = this.graphics.textWidth(this.value.substring(0, this.value.length - this.pCursorPosition));
    const delta = (this.width - cp);
    return Math.min(delta, 0);
  }

  /**
   * floatState helps us to determinate if the cursor within the textbox  bounds.
   * @returns TRUE if cursor position within the bounds.
   */
  private get floatState(): boolean {
    return this.cursorPosition < (this.width - this.height);
  }

  constructor(x: number = 0, y: number = 0, value?: string,  width?: number, height?: number) {
    super();

    this.x = x;
    this.y = y;
    this.width  = width   || 360;
    this.height = height  || 48;
    this.value  = value   || 'abcdefghıijkl';

    const graphics = this.Engine.p5.createGraphics(this.width, this.height);

    graphics.background(255);
    graphics.textSize(32);

    this.graphics = graphics;
    graphics.remove();

    this.on(KeyState.FOCUS, () => this.focus = true );
    this.on(KeyState.PRESSED, (event) => this.onKeyPressed(event));

  }

  public update() {
    this.graphics.background(255);
    this.graphics.textAlign('left', 'center');
    this.graphics.text(this.value, this.textBoxPosition, this.height / 2);

    if (this.focus) {
      // Draw cursor
      this.graphics.stroke(this.pCursorBlink);
      this.graphics.strokeWeight(2);
      this.pCursorBlink = (this.pCursorBlink + 10) % 255;
      // tslint:disable-next-line: max-line-length
      this.graphics.line(this.cursorPosition, 0 + (this.height * 0.85), this.cursorPosition, this.height - (this.height * 0.85));
      this.graphics.noStroke();
    }
  }

  private onKeyPressed(event: {key: string, keyCode: number}): void {
    console.log(event);

    // Set the cursor positions.
    // Left
    // tslint:disable-next-line: max-line-length
    if (event.keyCode === 37) {this.cursorPosition = Math.min((this.pCursorPosition + 1), this.value.length); this.pCursorBlink = 0; }

    // Right
    if (event.keyCode === 39) {this.cursorPosition = Math.max((this.pCursorPosition - 1), 0); this.pCursorBlink = 0; }

    // Backspace
    if (event.keyCode === 8) {this.removeStr(); }

    // Return on the blocked button press
    if (BLOCKED_CHARS.find((e) => e === event.keyCode)) {return; }

    this.insertStr(event.key);
  }

  private insertStr(str: string) {
    // tslint:disable-next-line: max-line-length
    this.value = this.value.substring(0, (this.value.length - this.pCursorPosition)) + str + this.value.substring(this.value.length - this.pCursorPosition);
  }

  private removeStr() {
    if ((this.value.length - this.pCursorPosition) === 0 ) {return; }
    // tslint:disable-next-line: max-line-length
    this.value = this.value.slice(0, this.value.length - this.pCursorPosition - 1) + this.value.substring(this.value.length - this.pCursorPosition);
  }
}
