import { Game } from '../models/game.class';

// singelton class which keeps the server data and status
export class GameService {
  private static instance: GameService;
  private games: Game[] = [];

  private constructor() {}

  static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }

    return GameService.instance;
  }

  create(userName: string) {
    const gameId = this.games.length;
    const newGame = new Game(gameId, userName);
    this.games.push(newGame);
    return gameId;
  }

  join(gameId: number, userName: string) {
    return this.games[gameId].join(userName);
  }

  status(gameId: number) {
    return this.games[gameId].status();
  }

  get(gameId: number) {
    return this.games[gameId];
  }

  move(gameId: number, x: number, y: number, userName: string) {
    return this.games[gameId].move(x, y, userName);
  }
}
