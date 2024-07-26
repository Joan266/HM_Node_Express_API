import express, { Request, Response } from 'express';
import { UserService } from '../services/user';
import { generateAccessToken } from '../utils/generateAccesToken';

const router = express.Router();

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
    return res.json({ user, token });
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
      message: error,
    });
  }
});

router.post('/signup', async (req: Request, res: Response) => {
  const newuser = req.body;
  try {
    const createduser = await UserService.signup(newuser);
    res.json({ createduser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
