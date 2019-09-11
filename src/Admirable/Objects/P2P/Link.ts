import { Peer } from './Peer';

export class Link {
  private pPeer!: Peer;
  public get peer(): Peer {
    return this.pPeer;
  }
  public set peer(v: Peer) {
    this.pPeer = v;
  }

  private pConnection!: any;
  public get connection(): any {
    return this.pConnection;
  }
  public set connection(v: any) {
    this.pConnection = v;
  }

  private pLocalId!: any;
  public get localId(): any {
    return this.pLocalId;
  }
  public set localId(v: any) {
    this.pLocalId = v;
  }

  private pRemoteId!: any;
  public get remoteId(): any {
    return this.pRemoteId;
  }
  public set remoteId(v: any) {
    this.pRemoteId = v;
  }

  private pIsHost!: boolean;
  public get isHost(): boolean {
    return this.pIsHost;
  }
  public set isHost(v: boolean) {
    this.pIsHost = v;
  }

  public constructor(host: boolean, peer: any, localId: any, remoteId?: any, connection?: any) {
    this.pIsHost = host;
    this.peer = peer;
    this.localId = localId;
    this.remoteId = remoteId;
    this.connection = connection;
  }
}
