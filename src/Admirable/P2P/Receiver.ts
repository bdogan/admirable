export class Receiver {
  // Peer object
  private pPeer: any;
  public get peer(): any {
    return this.pPeer;
  }
  public set peer(v: any) {
    this.pPeer = v;
  }

  // Constructor
  public constructor(peer: any) {
    this.peer = peer;
  }

  // Event handler method
  public on(event: string, callback: any) {
    return this.pPeer.on(event, callback);
  }
}
