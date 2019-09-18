import { StorageConfig } from '../../storage.config';
import Axios from 'axios';

export class Network extends Phaser.Events.EventEmitter {

  public static getInstance(): Network {
    if (!Network.instance) {
      Network.instance = new Network();
    }
    return Network.instance;
  }

  private static instance: Network;
  private url: string;
  private onlineUrl: string;
  private timeOut: number = 60; // Seconds

  private pId!: string;
  public get id(): string {
    return this.pId;
  }
  public set id(v: string) {
    this.pId = v;
  }

  private pUsername!: string;
  public get username(): string {
    return this.pUsername;
  }
  public set username(v: string) {
    this.pUsername = v;
  }

  public constructor() {
    super();
    this.url = StorageConfig.url;
    this.onlineUrl = `${this.url}/online`;
  }

  // List online users
  public listOnline() {
    return Axios({
      method: 'get',
      url: this.onlineUrl
    })
      .then((res: any) => {
        let list: any[];
        const objs = res.data.result;
        list = Object.values(objs);
        return list;
      })
      .catch(() => {
        return [];
      });
  }

  // List users except player and offline ones
  public listPotentialEnemies(selfId: string) {
    return this.listOnline().then((res: any[]) => {
      return res.filter((e) => e.id !== undefined && e.username !== undefined && e.id !== selfId && e.time > (Date.now() - (this.timeOut * 1000)));
    });
  }

  // Get an online user
  public getOnlineById(id: string) {
    return Axios({
      method: 'get',
      url: `${this.onlineUrl}/${id}`
    })
      .then((res: any) => {
        return res.data.result;
      });
  }

  // Add a register to network
  public logOn(id: string, username: string) {
    this.id = id;
    this.username = username;

    return Axios({
      method: 'post',
      url: `${this.onlineUrl}/${id}`,
      data: {
        id: `${id}`,
        username: `${username}`,
        time: Date.now()
      }
    });
  }

  // Update last active time
  public updateLastSeen(id: string) {
    return Axios({
      method: 'put',
      url: `${this.onlineUrl}/${id}/time`,
      data: Date.now(),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Clear inactive users
  public clearOffline() {
    return this.listOnline().then((res) => {
      res.forEach((e) => {
        if (e.id === undefined || e.username === undefined || e.time < (Date.now() - (this.timeOut * 1000))) {
          this.deleteById(e.id);
        }
      });
    });
  }

  // Delete a user by ID
  public deleteById(id: string) {
    return Axios({
      method: 'delete',
      url: `${this.onlineUrl}/${id}`
    });
  }
}
