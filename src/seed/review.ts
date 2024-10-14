import { faker } from '@faker-js/faker';
import { ReviewService } from "../services/review";
import Review from "../models/review"; 

const reviewStatuses = [true, false];

interface FakeReview {
  firstname: string;
  lastname: string;
  reviewdate: Date;
  status: boolean;
  rate: number;
  comment?: string;
}

const generateFakeReviews = (REVIEWS_NUM: number): FakeReview[] => {
  const fakeReviews: FakeReview[] = [];

  for (let i = 0; i < REVIEWS_NUM; i++) {
    const fakeReview: FakeReview = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      reviewdate: faker.date.past({ years: 1 }), 
      status: faker.helpers.arrayElement(reviewStatuses), 
      rate: faker.number.int({ min: 1, max: 5 }), 
      comment: faker.lorem.sentence(), 
    };

    fakeReviews.push(fakeReview);
  }

  return fakeReviews;
};

const createReviews = async (REVIEWS_NUM: number): Promise<void> => {
  const fakeReviewsData = generateFakeReviews(REVIEWS_NUM);
  for (let i = 0; i < REVIEWS_NUM; i++) {
    console.log(fakeReviewsData[i]);
    await ReviewService.create(fakeReviewsData[i]);
  }
};

export const seedReviews = async (): Promise<void> => {
  try {
    await Review.deleteMany({}); 
    console.log('All existing reviews deleted.');

    const REVIEWS_NUM = 50; 

    console.log('Creating reviews...');
    await createReviews(REVIEWS_NUM);
    console.log('Reviews created successfully.');

    console.log('Seed data successfully added!');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  }
};
