import { Schema, model } from 'mongoose';
import { BookingInterface } from '../interfaces/booking';

const bookingSchema = new Schema<BookingInterface>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['cancelled', 'booked', 'pending', 'refund'], 
    default: 'pending',
    required: true 
  },
  description: {type:String},
  photourl: { type:String },
  orderdate: { type: Date, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
});

const Booking = model<BookingInterface>('Booking', bookingSchema);

export default Booking;
