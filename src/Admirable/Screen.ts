export class Screen {

  /**
   * Device pixel ratio
   */
  private devicePixelRatio: number;

  /**
   * @param devicePixelRatio Device Pixel Ratio
   */
  constructor(devicePixelRatio: number = 10) {
    this.devicePixelRatio = devicePixelRatio;
  }

  /**
   * Converts given number to device pixel
   * @param val Number
   */
  public toDevicePixel(val: number): number {
    return this.devicePixelRatio * val;
  }

}
