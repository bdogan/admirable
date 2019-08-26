import { Layer } from '../../../../Engine/Layer';
import {Table} from '../../../../Engine/Sprites/Tables/Table';
import { Button } from '../../../../Engine/Sprites/Buttons/Button';
// tslint:disable-next-line: no-var-requires
const users = require('./users.json');

export class TableLayer extends Layer {
  private table!: Table;
  private backButton!: Button;
  public setup() {

    this.backButton = new Button('Menu', 0, 0, this.Engine.Screen.dimensions.width, 20);
    this.backButton.on('click', () => {
      this.Engine.Router.navigate('main');
    });

    this.table = new Table(20, 20, 640, 600);
    this.table.showHead = true;

    this.table.content = users;
    this.table.background = this.Engine.p5.color(0);
    this.table.on('wheel', (e) => {
      console.log(e);
    });
  }

  public beforeAttach(): Promise<any> | any {
    return Promise.all([
      this.addSprite(this.backButton),
      this.addSprite(this.table),
    ]);
  }
}
