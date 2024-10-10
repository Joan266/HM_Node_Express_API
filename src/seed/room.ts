import { RoomService } from "../services/room"; 
import Room from "../models/room"; 
import { faker } from '@faker-js/faker';

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

const statuses = ['available', 'booked', 'maintenance', 'unavailable'] as const;

interface FakeRoom {
  name: string;
  bedtype: string;
  code: string;
  facilities: string[];
  rate: number;
  offer: number; 
  status: typeof statuses[number]; 
}

const generateFakeRooms = (ROOMS_NUM: number): FakeRoom[] => {
  const fakeRooms: FakeRoom[] = [];
  for (let i = 0; i < ROOMS_NUM; i++) {
    const fakeRoom: FakeRoom = {
      name: faker.commerce.productName(),
      bedtype: faker.helpers.arrayElement(bedTypes),
      code: faker.string.numeric({ length: 5 }),
      facilities: faker.helpers.arrayElements(facilitiesEnum, { min: 2, max: 5 }),
      rate: faker.number.float({ min: 50, max: 500, multipleOf: 0.01 }),
      offer: faker.number.int({ min: 0, max: 50 }),
      status: faker.helpers.arrayElement(statuses) 
    };

    fakeRooms.push(fakeRoom);
  }

  return fakeRooms;
};

const createRooms = async (ROOMS_NUM: number): Promise<void> => {
  const fakeRoomsData = generateFakeRooms(ROOMS_NUM);
  for (let i = 0; i < ROOMS_NUM; i++) {
    console.log(fakeRoomsData[i])
    await RoomService.create(fakeRoomsData[i]);
  }
};

export const seedRooms = async (): Promise<void> => {
  try {
    await Room.deleteMany({});
    console.log('All existing rooms deleted.');

    const ROOMS_NUM = 30;

    console.log('Creating rooms...');
    await createRooms(ROOMS_NUM);
    console.log('Rooms created successfully.');

    console.log('Seed data successfully added!');
  } catch (error) {
    console.error('Error seeding rooms:', error);
  }
};
