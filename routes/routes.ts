import * as express from 'express';
import { gameController } from '../controllers/game.controller';

export const register = (app: express.Application) => {
  app.get('/api/game', gameController.getGame);
  app.get('/api/game/status', gameController.getStatus);
  app.post('/api/game/create', gameController.createGame);
  app.patch('/api/game/join', gameController.join);
  app.patch('/api/game/move', gameController.move);
};
