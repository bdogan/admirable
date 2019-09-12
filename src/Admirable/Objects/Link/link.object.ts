import { Peer } from '../P2P/Peer';

export interface IPayLoad {
  type: string;
  data?: object;
}

export class Link extends Phaser.Events.EventEmitter {

  // Get instance method
  public static getInstance(): Link {
    if (!Link.instance) {
      Link.instance = new Link();
    }

    return Link.instance;
  }

  private static instance: Link;

  public connection!: any;

  // Peer
  private pPeer!: Peer;
  public get peer() {
    return this.pPeer;
  }

  // Local ID
  private pLocalId: any;
  public get localId() {
    return this.pLocalId;
  }

  // Remote ID
  private pRemoteId: any;
  public get remoteId() {
    return this.pRemoteId;
  }

  // Is it host or not
  private pIsHost: boolean = false;
  public get isHost() {
    return this.pIsHost;
  }
  public set isHost(v: boolean) {
    this.pIsHost = v;
  }

  // Connected or not
  private pIsConnected: boolean = false;
  public get isConnected() {
    return this.pIsConnected;
  }

  // Host method
  public host(id: string) {
    // init with given id.
    this.pPeer.on('connection', (c: any) => {
      this.connection = c;

      this.pIsConnected = true;
      this.connection.on('data', (d: IPayLoad) => {
        this.emit(d.type, d.data);
      });

      this.pRemoteId = this.connection.peer;
    });

    this.pIsHost = true;
  }

  // Join method
  public join(id: string) {
    // Init empty to connect.

    // If there's a connection already close it
    if (this.connection) {
      this.connection.close();
    }

    // Connect remote client
    this.connection = this.pPeer.connect(id, {
      reliable: true
    });

    this.pRemoteId = this.connection.peer;

    // Data event
    this.connection.on('data', (d: IPayLoad) => {
      this.emit(d.type, d.data);
    });

    this.pIsConnected = true;
    this.pIsHost = false;
  }

  // Init method
  public init(id?: any, isHost: boolean = true): any {
    this.pPeer = new Peer(id, {
      debug: 2,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          }
        ]
      }
    });
    this.isHost = isHost;
    this.pLocalId = this.peer.id;

    // Peer close event
    this.peer.on('close', () => {
      this.connection = null;
      return 'Link destroyed.';
    });

    // Peer error handler
    this.peer.on('error', (err) => {
      return err;
    });
  }

  public transmit(data: IPayLoad) {
    this.connection.send(data);
  }
}
