import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateAccessToken = (password: string): string => {
  return jwt.sign({ password }, process.env.TOKEN_SECRET as string, { expiresIn: '1d' });
};
