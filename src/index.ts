import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the .env file");
    process.exit(1);
  }

  mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(app.get('port'), () => {
      console.log(`Server started on port ${app.get('port')}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

start();
