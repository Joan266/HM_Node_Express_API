import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getUserList();
    res.json({ users });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUser(id);
    res.json({ user });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updateParameters = req.body;
    const updateduser = await UserService.updateuser(id, updateParameters);
    res.json({ updateduser });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await UserService.deleteuser(id);
    res.json({ message: `user with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
});

export default router;
