import PeerBase from 'peerjs';

export class Peer extends PeerBase {
  public constructor(id?: any, options?: PeerBase.PeerJSOption) {
    super(id!, options!);
  }
}
