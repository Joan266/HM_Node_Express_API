import mongoose from "mongoose";
import Employee from "./models/user";
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

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

const jobDesk: string[] = [
  "Handle guest complaints and ensure satisfactory resolution",
  "Manage front desk operations and staff",
  "Coordinate housekeeping activities and schedules",
  "Oversee kitchen and dining room staff",
  "Maintain hotel inventory and supplies",
  "Plan and execute events and conferences",
  "Ensure compliance with health and safety regulations",
  "Manage hotel finances and budgets",
  "Handle guest check-ins and check-outs",
  "Provide concierge services and local information"
];

const days: string[] = [
  "Monday, Wednesday, Friday",
  "Tuesday, Thursday",
  "Saturday, Sunday",
  "Monday to Friday",
  "Weekends",
  "Monday, Tuesday, Thursday"
];

const hours: string[] = [
  "9:00 AM - 5:00 PM",
  "10:00 AM - 6:00 PM",
  "8:00 AM - 4:00 PM",
  "11:00 AM - 7:00 PM",
  "7:00 AM - 3:00 PM",
  "12:00 PM - 8:00 PM"
];

interface FakeEmployee {
  phonenumber: string;
  email: string;
  password: string;
  bio: string;
  joindate: Date;
  days: string;
  hours: string;
  status: boolean;
  firstname: string;
  lastname: string;
}

const generateFakeEmployees = (EMPLOYEES_NUM: number): FakeEmployee[] => {
  const fakeEmployees: FakeEmployee[] = [];
  for (let i = 0; i < EMPLOYEES_NUM; i++) {
    const fakeEmployee: FakeEmployee = {
      email: faker.internet.email(),
      phonenumber: faker.string.numeric({length:9}),
      password: faker.internet.password() + "?5A!@",
      bio: jobDesk[Math.floor(Math.random() * jobDesk.length)],
      joindate: faker.date.between({from:'1990-01-01', to:'2024-01-01'}),
      days: days[Math.floor(Math.random() * days.length)],
      hours: hours[Math.floor(Math.random() * hours.length)],
      status: Math.random() >= 0.5,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    };

    fakeEmployees.push(fakeEmployee);
  }

  return fakeEmployees;
};

const createEmployees = async (EMPLOYEES_NUM: number): Promise<void> => {
  const fakeEmployeesData = generateFakeEmployees(EMPLOYEES_NUM);

  for (let i = 0; i < EMPLOYEES_NUM; i++) {
    await Employee.signup(fakeEmployeesData[i]);
  }
};

const seedEmployees = async (): Promise<void> => {
  try {
    await Employee.deleteMany({});
    console.log('All existing employees deleted.');

    const EMPLOYEES_NUM = 35;

    console.log('Creating employees...');
    await createEmployees(EMPLOYEES_NUM);
    console.log('Employees created successfully.');

    console.log('Seed data successfully added!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedEmployees();
