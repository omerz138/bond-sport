import { GameService } from '../services/game.service';

const gameSerivce = GameService.getInstance();

const getGame = (req: any, res: any) => {
  const gameId = req.query.gameId;
  const game = gameSerivce.get(gameId);
  if (game) {
    res.status(200).send(game);
  } else {
    res.sendStatus(404);
  }
};

const getStatus = (req: any, res: any) => {
  const { gameId } = req.query;
  const status = gameSerivce.status(gameId);
  if (status) {
    res.status(200).send({ status });
  } else {
    res.sendStatus(404);
  }
};

const createGame = (req: any, res: any) => {
  const { userName } = req.body;
  if (!userName) {
    res.sendStatus(400);
  } else {
    const gameId = gameSerivce.create(userName);
    res.status(200).send({ gameId });
  }
};

const move = (req: any, res: any) => {
  const { gameId, userName, x, y } = req.body;
  const game = gameSerivce.move(gameId, x, y, userName);
  if (game) {
    res.status(200).send({ game });
  } else {
    res.sendStatus(400);
  }
};

const join = (req: any, res: any) => {
  const { userName, gameId } = req.body;
  const game = gameSerivce.join(gameId, userName);
  if (game) {
    res.status(200).send({ game });
  } else {
    res.sendStatus(400);
  }
};

export const gameController = {
  getGame,
  getStatus,
  createGame,
  move,
  join,
};
