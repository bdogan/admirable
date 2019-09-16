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

    this.peer.on('open', (c) => {
      // When the connection is established emit the connection.established event.
      this.emit('connection.established');
    });

    // Triggering when a peer is connected.
    this.peer.on('connection', (c) => {
      this.connection = c;

      // Doing like this we can wait a peer to be connected to the host and then change the scene on the both end.
      // this.connection.on('open', () => {
      //   this.emit('connection.established');
      // });

      // Start listening for the incoming data from the peer when the connection is established.
      this.connection.on('data', (d: IPayload) => {
        this.emit(d.type, d.data);
      });

    });

  }

  public join(id: string) {
    // Init empty to connect.
    this.init();
    this.connection = this.peer.connect(id);
    this.peer.on('open', (c) => {

      // if connection established with the host, yield the corresponding event to be handled once the connection is safe to use.
      this.connection.on('open', () => {
        this.emit('connection.established');
      });

      this.connection.on('data', (d: IPayload) => {
        this.emit(d.type, d.data);
      });

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

  // Send the data to be emitted by the otherside of the wire.
  public transmit(data: IPayload) {
      this.connection.send(data);
  }

}

// now we dont have to use singleton. but it's still convinced to use.
export const transmission = Transmission.getInstance();
