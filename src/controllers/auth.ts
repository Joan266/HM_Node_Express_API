import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';
import jwt from 'jsonwebtoken';
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
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });
    return res.json({ token, ...user });
  } catch (e) {
    next(e);
  }
});


export default router;
