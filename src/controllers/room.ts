import express, { Request, Response, NextFunction } from 'express';
import { RoomService } from '../services/room';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await RoomService.all();
    res.json({ rooms });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const room = await RoomService.get(id);
    res.json(room);
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newRoom = req.body;
    const createdroom = await RoomService.create(newRoom);
    return res.json(createdroom);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const room = req.body;
    const updatedRoom = await RoomService.update(id, room);
    res.json(updatedRoom);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await RoomService.delete(id);
    res.json(id);
  } catch (e) {
    next(e);
  }
});

export default router;
