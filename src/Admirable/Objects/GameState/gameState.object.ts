import { Player, player } from '../Player';
import { transmission } from '../Transmission';
import { Data } from 'phaser';
import { Notification } from '../UI/Notification';

export enum Turn {
  player,
  enemy
}

class GameState {
  public player: Player = player;
  public turn: Turn;

  public isPlayerReady: boolean = false;
  public isEnemyReady: boolean = false;

  public playerScore: number = 0;
  public enemyScore: number = 0;

  constructor() {
    this.turn = Turn.enemy;
  }

}

export const gameState = new GameState();
