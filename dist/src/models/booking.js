"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    status: {
        type: String,
        enum: ['cancelled', 'booked', 'pending', 'refund'],
        default: 'pending',
        required: true
    },
    description: { type: String },
    photourl: { type: String },
    orderdate: { type: Date, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
