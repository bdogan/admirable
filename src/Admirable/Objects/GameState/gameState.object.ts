import { Player, player } from '../Player';

export enum Turn {
  uncertain,
  player,
  enemy
}

class GameState {
  public player: Player = player;
  public turn: Turn;

  constructor() {
    this.turn = Turn.player;
  }

}

export const gameState = new GameState();