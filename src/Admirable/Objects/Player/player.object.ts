export class Player extends Phaser.Events.EventEmitter {

  public static getInstance(firstScore: number, firstLives: number): Player {
    if (!Player.instance) {
      Player.instance = new Player(firstScore, firstLives);
    }

    return Player.instance;
  }

  private static instance: Player;

  // Score
  private pScore: number;
  public get score() {
    return this.pScore;
  }
  public set score(v: number) {
    this.pScore = v;
  }

  // Lives
  private pLives: number;
  public get lives() {
    return this.pLives;
  }
  public set lives(v: number) {
    this.pLives = v;
  }

  // Constructor
  public constructor(firstScore: number, firstLives: number) {
    super();
    this.pScore = firstScore;
    this.pLives = firstLives;
  }

  // Increase score
  public increaseScore(amount: number = 1) {
    this.pScore += amount;
  }

  // Decrease score
  public decreaseScore(amount: number = 1) {
    this.pScore -= amount;
  }

  // Increase lives
  public increaseLives(amount: number = 1) {
    this.pLives += amount;
  }

  // Decrease score
  public decreaseLives(amount: number = 1) {
    this.pLives = (this.pLives > 0) ? (this.pLives - amount) : 0;
    if (this.isLivesEmpty()) {
      console.log('You lose.');
    }
  }

  // Is lives empty
  public isLivesEmpty() {
    if (this.pLives === 0) {
      return true;
    }
    return false;
  }
}
