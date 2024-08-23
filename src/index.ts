import { app } from './app';
import mysql from 'mysql2/promise';

const start = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the .env file");
    process.exit(1);
  }


  try {
    await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'MirandaDB',
    })

    app.listen(app.get('port'), () => {
      console.log(`Server started on port ${app.get('port')}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

start();
