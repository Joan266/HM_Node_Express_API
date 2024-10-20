import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import userController from './controllers/user';
import roomController from './controllers/room';
import bookingController from './controllers/booking';
import reviewController from './controllers/review';
import authController from './controllers/auth';

export const app: Express = express();

app.set('port', process.env.PORT || 8447);

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Basic routes
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from root!" });
});

app.get("/hello", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from path!" });
});

// MongoDB connection
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return console.log('=> Using existing MongoDB connection');

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error("MONGODB_URI is not defined in the .env file");
    return process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('=> Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

connectToMongoDB();

// Ensure MongoDB is connected before handling requests
app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  await connectToMongoDB();
  next();
});

// API routes
app.use('/auth', authController);
app.use('/user', userController);
app.use('/room', roomController);
app.use('/booking', bookingController);
app.use('/review', reviewController);

// Handle 404 - Not Found
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export class APIError extends Error {
  status: number;
  safe: boolean;

  constructor(message: string, status = 500, safe = false) {
    super(message);
    this.status = status;
    this.safe = safe;
  }
}

// Global error handler
app.use((err: APIError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message, err.safe, err.status);
  res.status(err.status || 500).json({ message: err.message });
});

// Start server
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server started on port ${app.get('port')}`);
});
