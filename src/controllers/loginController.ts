import express, { Request, Response } from 'express';
import { EmployeeService } from '../services/employeeServices';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

export const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET as string, { expiresIn: '1d' });
};

router.post('/', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const employee = EmployeeService.validateEmployeeCredentials(email, password);
    if (!employee) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateAccessToken(email);
    return res.json({ ...employee, token });
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
      message: error.message,
    });
  }
});

export default router;
