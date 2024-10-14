import { ReviewInterface } from '../interfaces/review';
import Review from '../models/review';
import { APIError } from '../app';

export class ReviewService {
  static async all() {
    const reviewData = await Review.find();
    return reviewData;
  }

  static async get(id: string) {
    const review = await Review.findById(id);
    if (!review) {
      throw new APIError('Cannot find review', 404, true);
    }
    return review;
  }

  static async create(newReview: {
    firstname: string;
    lastname: string;
    reviewdate: Date;
    status: boolean;
    rate: number;
    comment?: string;
  }) {
    const { firstname, lastname, rate, reviewdate, comment, status } = newReview;

    if (!firstname || !lastname || !rate || !reviewdate || status === undefined) {
      throw new APIError('All required fields must be filled', 400, true);
    }

    try {
      const review = await Review.create({
        firstname,
        lastname,
        reviewdate,
        comment,
        rate,
        status
      });

      return review;
    } catch (err) {
      throw new APIError('Error creating review', 500, false);
    }
  }

  static async update(id: string, updateParameters: Partial<ReviewInterface>) {
    const updatedReview = await Review.findByIdAndUpdate(id, updateParameters, { new: true });
    if (!updatedReview) {
      throw new APIError('Cannot find review to update', 404, true);
    }
    return updatedReview;
  }

  static async delete(id: string) {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      throw new APIError('Cannot find review to delete', 404, true);
    }
    console.log(`Review with id ${id} deleted`);
  }
}
