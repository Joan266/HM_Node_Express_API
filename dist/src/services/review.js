"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const review_1 = __importDefault(require("../models/review"));
const app_1 = require("../app");
class ReviewService {
    static async all() {
        const reviewData = await review_1.default.find();
        return reviewData;
    }
    static async get(id) {
        const review = await review_1.default.findById(id);
        if (!review) {
            throw new app_1.APIError('Cannot find review', 404, true);
        }
        return review;
    }
    static async create(newReview) {
        const { firstname, lastname, rate, reviewdate, comment, status } = newReview;
        if (!firstname || !lastname || !rate || !reviewdate || status === undefined) {
            throw new app_1.APIError('All required fields must be filled', 400, true);
        }
        try {
            const review = await review_1.default.create({
                firstname,
                lastname,
                reviewdate,
                comment,
                rate,
                status
            });
            return review;
        }
        catch (err) {
            throw new app_1.APIError('Error creating review', 500, false);
        }
    }
    static async update(id, updateParameters) {
        const updatedReview = await review_1.default.findByIdAndUpdate(id, updateParameters, { new: true });
        if (!updatedReview) {
            throw new app_1.APIError('Cannot find review to update', 404, true);
        }
        return updatedReview;
    }
    static async delete(id) {
        const deletedReview = await review_1.default.findByIdAndDelete(id);
        if (!deletedReview) {
            throw new app_1.APIError('Cannot find review to delete', 404, true);
        }
        console.log(`Review with id ${id} deleted`);
    }
}
exports.ReviewService = ReviewService;
