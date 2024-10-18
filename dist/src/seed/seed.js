"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./user");
const room_1 = require("./room");
const booking_1 = require("./booking");
const review_1 = require("./review");
dotenv_1.default.config();
const start = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the .env file");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
start();
const seed = async () => {
    try {
        await (0, review_1.seedReviews)();
        await (0, booking_1.seedBookings)();
        await (0, room_1.seedRooms)();
        await (0, user_1.seedEmployees)();
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
    finally {
        mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};
seed();
