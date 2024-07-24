import express, { Express, Request, Response } from 'express';
import { authenticateToken } from './middleware/auth';

import userController from './controllers/user'; 

export const app: Express = express();

app.set('port', process.env.PORT || 3000); 

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API Miranda\nRoutes: /rooms, /bookings, /users, /reviews');
});

app.use('/user', userController); 

export default app;
