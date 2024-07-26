import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';
import { generateAccessToken } from '../utils/generateAccesToken';

const router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserService.login(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateAccessToken(password);
    return res.json({ user, token });
  } catch (e) {
    next(e);
  }
});

router.post('/newuser', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newuser = req.body;
    const createduser = await UserService.newuser(newuser);
    return res.json({ createduser });
  } catch (e) {
    next(e);
  }
});

export default router;
