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

app.set('port', process.env.PORT || 5000);

const origins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://dashboard-miranda.s3-website.eu-west-3.amazonaws.com'
];

app.use(cors({
  origin: origins
}));

app.use(express.json());

app.get("/", (_req, res, _next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (_req, res, _next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

let isConnected: boolean = false; 

async function connectToMongoDB() {
  if (isConnected) {
    console.log('=> Using existing MongoDB connection');
    return;
  }
  
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the .env file");
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true; // Set connection state to true
    console.log('=> Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

// Middleware to ensure MongoDB connection is established
app.use(async (_req, _res, next) => {
  await connectToMongoDB();
  next();
});

// Set up routes
app.use('/auth', authController);
app.use('/user', userController);
app.use('/room', roomController);
app.use('/booking', bookingController);
app.use('/review', reviewController);

// Handle 404 errors
app.use((_req, res, _next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Custom error class for better error handling
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

export default app;
