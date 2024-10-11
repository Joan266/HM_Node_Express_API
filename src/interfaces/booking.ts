import mongoose from 'mongoose';
export interface BookingInterface {
  _id?: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  orderdate: Date;
  checkin: Date;
  checkout: Date;
  status: 'cancelled' | 'booked' | 'pending' | 'refund'; 
  description?: string;
  photourl?: string;
}

export type BookingProperties = keyof BookingInterface;