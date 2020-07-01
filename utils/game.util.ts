import { MoveEnum } from '../models/move.enum';
import config from '../config/config';

const isGameWon = (board: MoveEnum[][], currentMove: MoveEnum) => {
  let count;

  for (let x = 0; x < config.BOARD_SIZE; x++) {
    count = 0;
    for (let y = 0; y < config.BOARD_SIZE; y++) {
      count += board[x][y] === currentMove ? 1 : 0;
    }
    if (count === config.BOARD_SIZE) {
      return true;
    }
  }

  for (let y = 0; y < config.BOARD_SIZE; y++) {
    count = 0;
    for (let x = 0; x < config.BOARD_SIZE; x++) {
      count += board[x][y] === currentMove ? 1 : 0;
    }
    if (count === config.BOARD_SIZE) {
      return true;
    }
  }

  // Check Left-to-Right downward Diagonal:
  count = 0;
  for (let i = 0; i < config.BOARD_SIZE; i++) {
    count += board[i][i] === currentMove ? 1 : 0;
  }
  if (count === config.BOARD_SIZE) {
    return true;
  }

  // Check Left-to-Right upward Diagonal
  count = 0;
  for (let i = 0; i < config.BOARD_SIZE; i++) {
    count += board[i][config.BOARD_SIZE - i - 1] === currentMove ? 1 : 0;
  }

  if (count === config.BOARD_SIZE) {
    return true;
  }

  return false;
};

export const GameUtil = {
  isGameWon,
};
