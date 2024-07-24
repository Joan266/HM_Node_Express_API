import mongoose from 'mongoose';
export interface UserInterface {
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

export type UserProperties = keyof UserInterface;
