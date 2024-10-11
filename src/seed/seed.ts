import mongoose from "mongoose";
import dotenv from 'dotenv';
import { seedEmployees } from "./user";
import { seedRooms } from "./room";
import { seedBookings } from "./booking";
dotenv.config();

const start = async (): Promise<void> => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

start();

const seed = async (): Promise<void> => {
  try {
    await seedBookings();
    await seedRooms();
    await seedEmployees();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seed();