import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.all();
    res.json({ users });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await UserService.get(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;
    const createduser = await UserService.create(newUser);
    return res.json(createduser);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await UserService.update(id, user);
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await UserService.delete(id);
    res.json(id);
  } catch (e) {
    next(e);
  }
});

export default router;
