"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedReviews = void 0;
const faker_1 = require("@faker-js/faker");
const review_1 = require("../services/review");
const review_2 = __importDefault(require("../models/review"));
const reviewStatuses = [true, false];
const generateFakeReviews = (REVIEWS_NUM) => {
    const fakeReviews = [];
    for (let i = 0; i < REVIEWS_NUM; i++) {
        const fakeReview = {
            firstname: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            reviewdate: faker_1.faker.date.past({ years: 1 }),
            status: faker_1.faker.helpers.arrayElement(reviewStatuses),
            rate: faker_1.faker.number.int({ min: 1, max: 5 }),
            comment: faker_1.faker.lorem.sentence(),
        };
        fakeReviews.push(fakeReview);
    }
    return fakeReviews;
};
const createReviews = async (REVIEWS_NUM) => {
    const fakeReviewsData = generateFakeReviews(REVIEWS_NUM);
    for (let i = 0; i < REVIEWS_NUM; i++) {
        console.log(fakeReviewsData[i]);
        await review_1.ReviewService.create(fakeReviewsData[i]);
    }
};
const seedReviews = async () => {
    try {
        await review_2.default.deleteMany({});
        console.log('All existing reviews deleted.');
        const REVIEWS_NUM = 50;
        console.log('Creating reviews...');
        await createReviews(REVIEWS_NUM);
        console.log('Reviews created successfully.');
        console.log('Seed data successfully added!');
    }
    catch (error) {
        console.error('Error seeding reviews:', error);
    }
};
exports.seedReviews = seedReviews;
