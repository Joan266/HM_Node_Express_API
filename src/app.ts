import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import "dotenv/config";
import { authenticateToken } from './middleware/auth';
import userController from './controllers/user';
import authController from './controllers/auth';

export const app: Express = express();

app.set('port', process.env.PORT || 5000);

app.use(cors())
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API Miranda\nRoutes: /rooms, /bookings, /users, /reviews, /login');
});

app.use('/auth', authController);
app.use(authenticateToken);
app.use('/user', userController);

export class APIError extends Error {
  status: number;
  safe: boolean;

  constructor(message: string, status = 500, safe = false) {
    super(message);
    this.status = status;
    this.safe = safe;
  }
}

app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message, err.safe, err.status);
  res.status(err.status || 500).json({ message: err.safe ? err.message : 'Internal Server Error' });
});

export default app;
