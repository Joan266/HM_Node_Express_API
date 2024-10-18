"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRooms = void 0;
const room_1 = require("../services/room");
const room_2 = __importDefault(require("../models/room"));
const faker_1 = require("@faker-js/faker");
const bedTypes = [
    "King Bed",
    "Queen Bed",
    "Twin Beds",
    "Double Bed",
    "Single Bed",
    "Bunk Beds",
    "California King",
    "Full Bed"
];
const facilitiesEnum = [
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
const statuses = ['available', 'booked', 'maintenance', 'unavailable'];
const generateFakeRooms = (ROOMS_NUM) => {
    const fakeRooms = [];
    for (let i = 0; i < ROOMS_NUM; i++) {
        const fakeRoom = {
            name: faker_1.faker.commerce.productName(),
            bedtype: faker_1.faker.helpers.arrayElement(bedTypes),
            facilities: faker_1.faker.helpers.arrayElements(facilitiesEnum, { min: 2, max: 5 }),
            rate: faker_1.faker.number.float({ min: 50, max: 500, multipleOf: 0.01 }),
            offer: faker_1.faker.number.int({ min: 0, max: 50 }),
            status: faker_1.faker.helpers.arrayElement(statuses)
        };
        fakeRooms.push(fakeRoom);
    }
    return fakeRooms;
};
const createRooms = async (ROOMS_NUM) => {
    const fakeRoomsData = generateFakeRooms(ROOMS_NUM);
    for (let i = 0; i < ROOMS_NUM; i++) {
        console.log(fakeRoomsData[i]);
        await room_1.RoomService.create(fakeRoomsData[i]);
    }
};
const seedRooms = async () => {
    try {
        await room_2.default.deleteMany({});
        console.log('All existing rooms deleted.');
        const ROOMS_NUM = 30;
        console.log('Creating rooms...');
        await createRooms(ROOMS_NUM);
        console.log('Rooms created successfully.');
        console.log('Seed data successfully added!');
    }
    catch (error) {
        console.error('Error seeding rooms:', error);
    }
};
exports.seedRooms = seedRooms;
