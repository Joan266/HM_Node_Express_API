import express, { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/booking';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await BookingService.all();
    res.json({ bookings });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const booking = await BookingService.get(id);
    res.json(booking);
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBooking = req.body;
    const createdbooking = await BookingService.create(newBooking);
    return res.json(createdbooking);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const booking = req.body;
    const updatedBooking = await BookingService.update(id, booking);
    res.json(updatedBooking);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await BookingService.delete(id);
    res.json(id);
  } catch (e) {
    next(e);
  }
});

export default router;
