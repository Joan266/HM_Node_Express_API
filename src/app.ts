import express, { Express, Request, Response } from 'express';
import { authenticateToken } from './middleware/auth';

import employeeController from './controllers/employee'; 

export const app: Express = express();

app.set('port', process.env.PORT || 3000); 

app.use(express.json());


app.use('/employee/login', employeeController); 

app.use(authenticateToken);

app.get('/', (req: Request, res: Response) => {
  res.send('API Miranda\nRoutes: /rooms, /bookings, /employees, /reviews');
});

app.use('/employee', employeeController); 

export default app;
