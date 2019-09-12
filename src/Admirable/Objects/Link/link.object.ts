import Peer from 'peerjs';

export class Link {

  public static getInstance(): Link {
    if (!Link.instance) {
      Link.instance = new Link();
    }

    return Link.instance;
  }

  private static instance: Link;

  public connection!: Peer.DataConnection;
  private peer!: Peer;

  public host(id: string) {
    // init with given id.
    this.init(id);
    this.peer.on('connection', (c) => {
      this.connection = c;
      this.connection.on('data', (d) => {
        console.log(d);
      });
    });
  }

  public join(id: string) {
    // Init empty to connect.
    this.init();
    this.connection = this.peer.connect(id);
    this.connection.on('data', (d) => {
      console.log(d);
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

}
