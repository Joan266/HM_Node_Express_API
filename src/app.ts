import express, { Express, Request, Response, NextFunction } from 'express';
import { authenticateToken } from './middleware/auth';

import userController from './controllers/user';
import authController from './controllers/auth';

export const app: Express = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API Miranda\nRoutes: /rooms, /bookings, /users, /reviews, /login');
});

app.use('/auth', authController);
app.use(authenticateToken);
app.use('/user', userController);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
