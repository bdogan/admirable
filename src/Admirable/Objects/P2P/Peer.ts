import PeerBase from 'peerjs';

export class Peer extends PeerBase {
  public constructor(id?: string|null, options?: PeerBase.PeerJSOption) {
    super(id!, options);
  }
}
