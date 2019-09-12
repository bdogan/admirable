import Peer from 'peerjs';

export interface IPayLoad {
  type: string;
  data?: object;
}

export class Transmission extends Phaser.Events.EventEmitter {

  public static getInstance(): Transmission {
    if (!Transmission.instance) {
      Transmission.instance = new Transmission();
    }

    return Transmission.instance;
  }

  private static instance: Transmission;

  public connection!: Peer.DataConnection;
  private peer!: Peer;

  public host(id: string) {
    // init with given id.
    this.init(id);
    this.peer.on('connection', (c) => {
      this.connection = c;

      this.connection.on('data', (d: IPayLoad) => {
        this.emit(d.type, d.data);
      });
    });
  }

  public join(id: string) {
    // Init empty to connect.
    this.init();
    this.connection = this.peer.connect(id);

    this.connection.on('data', (d: IPayLoad) => {
      this.emit(d.type, d.data);
    });
  }

  public init(id?: string) {
    this.peer = new Peer(id, {
      debug: 2,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          }
        ]
      }
    });
  }

  public transmit(data: IPayLoad) {
    this.connection.send(data);
  }

}
