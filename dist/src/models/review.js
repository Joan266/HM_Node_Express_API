"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    status: { type: Boolean, required: true },
    comment: { type: String },
    rate: { type: Number, required: true },
    reviewdate: { type: Date, required: true },
});
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
