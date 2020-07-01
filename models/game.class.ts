import { GameStatusEnum } from './game-status.enum';
import { MoveEnum } from './move.enum';
import { GameUtil } from '../utils/game.util';
import config from '../config/config';

export class Game {
  private id: number;
  private board: MoveEnum[][];
  private players: any = {};
  private gameStatus: GameStatusEnum;
  private movesCount: number;

  constructor(id: number, xPlayerUserName: string, oPlayerUserName?: string) {
    this.id = id;
    // create tic tac toe board
    this.board = Array.from({ length: config.BOARD_SIZE }, () => Array.from({ length: config.BOARD_SIZE }));
    this.players[MoveEnum.PLAYER_1] = xPlayerUserName;
    this.players[MoveEnum.PLAYER_2] = oPlayerUserName;
    this.gameStatus = GameStatusEnum.Playing;
    this.movesCount = 0;
  }

  join(userName: string) {
    if (!this.players[MoveEnum.PLAYER_2]) {
      this.players[MoveEnum.PLAYER_2] = userName;
      return this.json();
    }
    return false;
  }

  move(x: number, y: number, userName: string) {
    const move = this.findPlayerMove(userName);
    if (!move) {
      return false;
    }

    this.board[x][y] = move;
    this.movesCount++;

    // update game status
    if (GameUtil.isGameWon(this.board, move)) {
      this.gameStatus = move === MoveEnum.PLAYER_1 ? GameStatusEnum.XWon : GameStatusEnum.OWon;
    } else if (this.movesCount === 9) {
      this.gameStatus = GameStatusEnum.Tie;
    }

    return this.json();
  }

  status() {
    return this.gameStatus;
  }

  json() {
    return { status: this.gameStatus, board: JSON.stringify(this.board) };
  }

  private findPlayerMove(userName: string): MoveEnum | false {
    if (this.players[MoveEnum.PLAYER_1] === userName) {
      return MoveEnum.PLAYER_1;
    }
    if (this.players[MoveEnum.PLAYER_2] === userName) {
      return MoveEnum.PLAYER_2;
    }

    return false;
  }
}
