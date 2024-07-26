import express, { Request, Response } from 'express';
import { UserService } from '../services/user';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

  try {
    const users = await UserService.getUserList();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const user = await UserService.getUser(id);
    res.json({ user });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {

  const id = req.params.id;
  const updateParameters = req.body;
  try {
    const updateduser = await UserService.updateuser(id, updateParameters);
    res.json({ updateduser });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    await UserService.deleteuser(id);
    res.json({ message: `user with id ${id} deleted` });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
});

export default router;
