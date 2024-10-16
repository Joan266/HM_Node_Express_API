"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = require("../services/review");
const router = express_1.default.Router();
router.get('/', async (_req, res, next) => {
    try {
        const reviews = await review_1.ReviewService.all();
        console.log(reviews);
        res.json({ reviews });
    }
    catch (e) {
        next(e);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const review = await review_1.ReviewService.get(id);
        res.json(review);
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', async (req, res, next) => {
    try {
        const newReview = req.body;
        const createdreview = await review_1.ReviewService.create(newReview);
        return res.json(createdreview);
    }
    catch (e) {
        next(e);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const review = req.body;
        const updatedReview = await review_1.ReviewService.update(id, review);
        res.json(updatedReview);
    }
    catch (e) {
        next(e);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await review_1.ReviewService.delete(id);
        res.json(id);
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
