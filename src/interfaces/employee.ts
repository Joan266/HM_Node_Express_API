import mongoose from 'mongoose';
export interface EmployeeInterface {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  status?: boolean;
  phonenumber: string;
  days?: string;
  hours?: string;
  jobdesk?: string;
  joindate: Date;
}

export type EmployeeProperties = '_id' | 'firstname' | 'lastname' | 'email' | 'phonenumber' | 'jobdesk' | 'joindate' | 'status' | 'password' | 'days' | 'hours';
