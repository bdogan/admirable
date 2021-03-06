import { Peer } from '../P2P';
import { gameState, Turn } from '../GameState';

export interface IPayload {
  type: string;
  data?: object;
}

export class Transmission extends Phaser.Events.EventEmitter {

  // Get instance method
  public static getInstance(): Transmission {
    if (!Transmission.instance) {
      Transmission.instance = new Transmission();
    }

    return Transmission.instance;
  }

  private static instance: Transmission | null;

  public connection!: any;

  // PeerObject
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

  // Clear
  public clear() {
    Transmission.instance = null;
  }

  // Host method
  public host() {
    this.pPeer.on('connection', (c: any) => {
      this.connection = c;

      this.pIsConnected = true;
      this.connection.on('data', (d: IPayload) => {
        this.emit(d.type, d.data);
      });

      this.pRemoteId = this.connection.peer;
    });

    this.pIsHost = true;
  }

  // Join method
  public join(hostId: string) {
    // If there's a connection already close it
    if (this.connection) {
      this.connection.close();
    }

    // Connect remote client
    this.connection = this.pPeer.connect(hostId);

    this.pRemoteId = this.connection.peer;

    // Data event
    this.connection.on('data', (d: IPayload) => {
      this.emit(d.type, d.data);
    });

    this.pIsConnected = true;
    this.pIsHost = false;
  }

  // Init method
  public init(id?: any): any {
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
    this.isHost = true;
    this.pLocalId = this.pPeer.id;
  }

/**
 * Send's the data to the otherside of the wire.
 * @param data data to be transfered.
 */
  public transmit(data: IPayload) {
    // console.log(this.connection);
    // if (this.connection) {
    this.connection.send(data);
    // }
  }

  /**
   * Triggers the given event at the both sides of the wire.
   * @param data data to be emitted by the both sides.
   */
  public sync(data: IPayload) {
    this.emit(data.type, data.data);
    this.transmit(data);
  }
}

export const transmission = Transmission.getInstance();
