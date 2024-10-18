"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBookings = void 0;
const booking_1 = require("../services/booking");
const booking_2 = __importDefault(require("../models/booking"));
const faker_1 = require("@faker-js/faker");
const statuses = ['cancelled', 'booked', 'pending', 'refund'];
const generateFakeBookings = (BOOKINGS_NUM) => {
    const fakeBookings = [];
    for (let i = 0; i < BOOKINGS_NUM; i++) {
        const checkin = faker_1.faker.date.soon({ days: 30 });
        const checkout = faker_1.faker.date.soon({ days: 10, refDate: checkin });
        const fakeBooking = {
            firstname: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            orderdate: faker_1.faker.date.past({ years: 1 }),
            checkin,
            checkout,
            status: faker_1.faker.helpers.arrayElement(statuses),
            description: faker_1.faker.lorem.sentence(),
        };
        fakeBookings.push(fakeBooking);
    }
    return fakeBookings;
};
const createBookings = async (BOOKINGS_NUM) => {
    const fakeBookingsData = generateFakeBookings(BOOKINGS_NUM);
    for (let i = 0; i < BOOKINGS_NUM; i++) {
        console.log(fakeBookingsData[i]);
        await booking_1.BookingService.create(fakeBookingsData[i]);
    }
};
const seedBookings = async () => {
    try {
        await booking_2.default.deleteMany({});
        console.log('All existing bookings deleted.');
        const BOOKINGS_NUM = 50;
        console.log('Creating bookings...');
        await createBookings(BOOKINGS_NUM);
        console.log('Bookings created successfully.');
        console.log('Seed data successfully added!');
    }
    catch (error) {
        console.error('Error seeding bookings:', error);
    }
};
exports.seedBookings = seedBookings;
