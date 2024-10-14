import { BookingService } from "../services/booking";
import Booking from "../models/booking";
import { faker } from '@faker-js/faker';

const statuses = ['cancelled', 'booked', 'pending', 'refund'] as const;

interface FakeBooking {
  firstname: string;
  lastname: string;
  orderdate: Date;
  checkin: Date;
  checkout: Date;
  status: typeof statuses[number];
  description?: string;
  photourl?: string;
}

const generateFakeBookings = (BOOKINGS_NUM: number): FakeBooking[] => {
  const fakeBookings: FakeBooking[] = [];

  for (let i = 0; i < BOOKINGS_NUM; i++) {
    const checkin = faker.date.soon({ days: 30 }); 
    const checkout = faker.date.soon({ days: 10, refDate: checkin }); 

    const fakeBooking: FakeBooking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      orderdate: faker.date.past({ years: 1 }), 
      checkin,
      checkout,
      status: faker.helpers.arrayElement(statuses),
      description: faker.lorem.sentence(),
    };

    fakeBookings.push(fakeBooking);
  }

  return fakeBookings;
};

const createBookings = async (BOOKINGS_NUM: number): Promise<void> => {
  const fakeBookingsData = generateFakeBookings(BOOKINGS_NUM);
  for (let i = 0; i < BOOKINGS_NUM; i++) {
    console.log(fakeBookingsData[i]);
    await BookingService.create(fakeBookingsData[i]);
  }
};

export const seedBookings = async (): Promise<void> => {
  try {
    await Booking.deleteMany({});
    console.log('All existing bookings deleted.');

    const BOOKINGS_NUM = 50; 

    console.log('Creating bookings...');
    await createBookings(BOOKINGS_NUM);
    console.log('Bookings created successfully.');

    console.log('Seed data successfully added!');
  } catch (error) {
    console.error('Error seeding bookings:', error);
  }
};
