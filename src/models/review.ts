import { Schema, model } from 'mongoose';
import { ReviewInterface } from '../interfaces/review';

const reviewSchema = new Schema<ReviewInterface>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  status: {  type: Boolean, required:true},
  comment: {type:String},
  rate: { type:Number, required:true },
  reviewdate: { type: Date, required: true },
});

const Review = model<ReviewInterface>('Review', reviewSchema);

export default Review;
