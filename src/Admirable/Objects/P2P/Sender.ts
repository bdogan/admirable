export class Sender {
  // Peer connection object
  private pConnection: any;
  public get connection(): any {
    return this.pConnection;
  }
  public set connection(v: any) {
    this.pConnection = v;
  }

  // Constructor
  public constructor(connection: any) {
    this.connection = connection;
  }

  // Send method
  public send(data: object): void {
    this.pConnection.send(data);
  }
}
