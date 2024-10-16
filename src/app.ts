import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import "dotenv/config";
import { authenticateToken } from './middleware/auth';
import userController from './controllers/user';
import roomController from './controllers/room';
import bookingController from './controllers/booking';
import reviewController from './controllers/review';
import authController from './controllers/auth';

export const app: Express = express();

app.set('port', process.env.PORT || 5000);

const origins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://dashboard-miranda.s3-website.eu-west-3.amazonaws.com'
];

app.use(express.json());

app.use(cors({
	origin: origins
}))

app.get('/', (_req: Request, res: Response) => {
  res.send('API Miranda\nRoutes: /rooms, /bookings, /users, /reviews, /login');
});

app.use('/auth', authController);
app.use(authenticateToken);
app.use('/user', userController);
app.use('/room', roomController);
app.use('/booking', bookingController);
app.use('/review', reviewController);

export class APIError extends Error {
  status: number;
  safe: boolean;

  constructor(message: string, status = 500, safe = false) {
    super(message);
    this.status = status;
    this.safe = safe;
  }
}

app.use((err: APIError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message, err.safe, err.status);
  res.status(err.status || 500).json({ message: err.safe ? err.message : 'Internal Server Error' });
});

export default app;
