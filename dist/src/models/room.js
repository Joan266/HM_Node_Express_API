"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FACILITIES_OPTIONS = [
    'WiFi',
    'Air Conditioning',
    'Breakfast Included',
    'Parking',
    'Swimming Pool',
    'Gym',
    'TV',
    'Mini Bar',
    'Room Service',
    'Laundry Service'
];
const roomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    bedtype: { type: String, required: true },
    facilities: {
        type: [String],
        enum: FACILITIES_OPTIONS,
        validate: [(val) => val.length <= 10, '{PATH} exceeds the limit of 10'],
    },
    rate: { type: Number, required: true },
    offer: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'maintenance', 'unavailable'],
        default: 'unavailable',
        required: true
    },
    photourl: {
        type: String,
    },
});
const Room = (0, mongoose_1.model)('Room', roomSchema);
exports.default = Room;
