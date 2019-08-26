import { Layer } from '../../../../Engine/Layer';
import {Table} from '../../../../Engine/Sprites/Tables/Table';
import {Sprite} from '../../../../Engine/Sprite';
import { Button } from '../../../../Engine/Sprites/Buttons/Button';
const users = require('./users.json');

export class TableLayer extends Layer {
  private backButton!: Button;
  private table!: Table;
  private bg!: Sprite;

  public setup() {

    this.backButton = new Button('Menu', 0, 0, this.Engine.Screen.dimensions.width, 20);
    this.backButton.on('click', () => {
      this.Engine.Router.navigate('main');
    });

    // tslint:disable-next-line: max-line-length
    const g = this.Engine.p5.createGraphics(this.Engine.Screen.dimensions.width, this.Engine.Screen.dimensions.height);
    g.background(120);
    this.bg = Sprite.New(0, 0, g);

    this.table = new Table(20, 20, 400, 300);
    this.table.showHead = true;
    this.table.stretch = true;
    this.table.scroll = true;

    this.table.content = users;
    this.table.background = this.Engine.p5.color(140);
  }

  public beforeAttach(): Promise<any> | any {
    return Promise.all([
      this.addSprite(this.bg),
      this.addSprite(this.table),
      this.addSprite(this.backButton),
    ]);
  }
}
