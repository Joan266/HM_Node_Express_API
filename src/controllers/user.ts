import express, { Request, Response } from 'express';
import { UserService } from '../services/user';
import { generateAccessToken } from '../utils/generateAccesToken';

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

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserService.login(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateAccessToken(user.password);
    return res.json({ ...user, token });
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
      message: error,
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const newuser = req.body;
  try {
    const createduser = await UserService.signup(newuser);
    res.status(201).json({ createduser });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
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
