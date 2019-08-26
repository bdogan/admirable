import { Layer } from '../../../../Engine/Layer';
import {Table} from '../../../../Engine/Sprites/Tables/Table';
const users = require('./users.json');

export class TableLayer extends Layer {
  private table!: Table;

  public setup() {
    this.table = new Table(20, 20, 640, 600);
    this.table.showHead = true;

    this.table.content = users;
  }

  public beforeAttach(): Promise<any> | any {
    return this.addSprite(this.table);
  }
}
