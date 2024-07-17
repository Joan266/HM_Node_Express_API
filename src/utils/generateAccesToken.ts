import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET as string, { expiresIn: '1d' });
};
