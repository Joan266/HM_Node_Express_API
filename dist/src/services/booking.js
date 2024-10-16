"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const app_1 = require("../app");
class BookingService {
    static async all() {
        const bookingData = await booking_1.default.find();
        return bookingData;
    }
    static async get(id) {
        const booking = await booking_1.default.findById(id);
        if (!booking) {
            throw new app_1.APIError('Cannot find room', 404, true);
        }
        return booking;
    }
    static async create(newBooking) {
        const { firstname, lastname, orderdate, checkin, checkout, status, ...rest } = newBooking;
        if (!firstname || !lastname || !orderdate || !checkin || !checkout || !status) {
            throw new app_1.APIError('All required fields must be filled', 400, true);
        }
        try {
            const booking = await booking_1.default.create({
                firstname,
                lastname,
                orderdate,
                checkin,
                checkout,
                status,
                ...rest
            });
            return booking;
        }
        catch (err) {
            throw new app_1.APIError('Error creating booking', 500, false);
        }
    }
    static async update(id, updateParameters) {
        const updatedBooking = await booking_1.default.findByIdAndUpdate(id, updateParameters, { new: true });
        if (!updatedBooking) {
            throw new app_1.APIError('Cannot find booking to update', 404, true);
        }
        return updatedBooking;
    }
    static async delete(id) {
        const deletedBooking = await booking_1.default.findByIdAndDelete(id);
        if (!deletedBooking) {
            throw new app_1.APIError('Cannot find booking to delete', 404, true);
        }
        console.log(`Booking with id ${id} deleted`);
    }
}
exports.BookingService = BookingService;
