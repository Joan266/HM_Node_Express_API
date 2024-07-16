import express, { Express } from 'express';

export const app: Express = express();

// Settings
app.set('port', 3000);

// Middlewares
app.use(express.json());

