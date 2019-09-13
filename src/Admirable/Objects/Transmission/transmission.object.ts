import Peer from 'peerjs';

export interface IPayload {
  type: string;
  data?: object;
}

/**
 * Simple singleton class to hold the whole connection through game session.
 */
class Transmission extends Phaser.Events.EventEmitter {

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

    // Triggering when a peer is connected.
    this.peer.on('connection', (c) => {
      this.connection = c;

      // Start listening for the incoming data from the peer when the connection is established.
      this.connection.on('data', (d: IPayload) => {
        this.emit(d.type, d.data);
      });

    });

    this.peer.on('open', (c) => {
      // When the connection is established emit the connection.established event.
      this.emit('connection.established');
    });
  }

  public join(id: string) {
    // Init empty to connect.
    this.init();
    this.connection = this.peer.connect(id);

    this.peer.on('open', () => {

      this.connection.on('data', (d: IPayload) => {
        this.emit(d.type, d.data);
      });

      this.emit('connection.established');
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

  // Send data to be emitted by the otherside of the wire.
  public transmit(data: IPayload) {
    // console.log(this.connection);
    // if (this.connection) {
      this.connection.send(data);
    // }
  }

}

// now we dont have to use singleton. but it's still convinced to use.
export const transmission = Transmission.getInstance();
