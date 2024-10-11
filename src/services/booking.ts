import { BookingInterface } from '../interfaces/booking';
import Booking from '../models/booking';
import { APIError } from '../app';

export class BookingService {
  static async all() {
    const bookingData = await Booking.find();
    return bookingData;
  }

  static async get(id: string) {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new APIError('Cannot find room', 404, true);
    }
    return booking;
  }

  static async create(newBooking: {
    firstname: string;
    lastname: string;
    orderdate: Date;
    checkin: Date;
    checkout: Date;
    status: 'cancelled' | 'booked' | 'pending' | 'refund';
  }) {
    const { firstname, lastname, orderdate, checkin, checkout, status } = newBooking;

    if (!firstname || !lastname || !orderdate || !checkin || !checkout || !status) {
      throw new APIError('All required fields must be filled', 400, true);
    }

    try {
      const booking = await Booking.create({
        firstname,
        lastname,
        orderdate,
        checkin,
        checkout,
        status,
      });

      return booking;
    } catch (err) {
      throw new APIError('Error creating booking', 500, false);
    }
  }

  static async update(id: string, updateParameters: Partial<BookingInterface>) {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updateParameters, { new: true });
    if (!updatedBooking) {
      throw new APIError('Cannot find booking to update', 404, true);
    }
    return updatedBooking;
  }

  static async delete(id: string) {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new APIError('Cannot find booking to delete', 404, true);
    }
    console.log(`Booking with id ${id} deleted`);
  }
}
