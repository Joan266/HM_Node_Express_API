import mongoose from 'mongoose';

export interface ReviewInterface {
  _id?: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  reviewdate: Date;
  status: Boolean; 
  comment?: string;
  rate: number;
}

export type ReviewProperties = keyof ReviewInterface;