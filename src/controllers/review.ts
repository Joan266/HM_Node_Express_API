import express, { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/review';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await ReviewService.all();
    res.json({ reviews });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const review = await ReviewService.get(id);
    res.json(review);
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReview = req.body;
    const createdreview = await ReviewService.create(newReview);
    return res.json(createdreview);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const review = req.body;
    const updatedReview = await ReviewService.update(id, review);
    res.json(updatedReview);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await ReviewService.delete(id);
    res.json(id);
  } catch (e) {
    next(e);
  }
});

export default router;
