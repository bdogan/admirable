import { transmission } from '../Transmission';

class GameState {
  public isPlayerReady: boolean = false;
  public isEnemyReady: boolean = false;

  public turn: boolean = false;
}

export const gameState = new GameState();

transmission.on('debug', (d: any) => {
  console.log(d);
});

transmission.once('enemy.ready', () => {
  gameState.isEnemyReady = true;
  console.log(gameState);
});

transmission.on('enemy.turn', () => {
  gameState.turn = true;
});
