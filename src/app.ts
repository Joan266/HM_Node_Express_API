import express, { Express } from 'express';
// import { authenticateToken } from './middleware/auth';

// import roomController from './controllers/roomController';
// import userController from './controllers/userController';
// import bookingController from './controllers/bookingController';
// import contactController from './controllers/contactController';
import loginController from './controllers/loginController';

export const app: Express = express();

// Settings
app.set('port', 3000);

// Middlewares
app.use(express.json());

app.use('/login', loginController);
// app.use('/room', authenticateToken, roomController);
// app.use('/user', authenticateToken, userController);
// app.use('/booking', authenticateToken, bookingController);
// app.use('/contact', authenticateToken, contactController);