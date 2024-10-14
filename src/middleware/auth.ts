import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ error: 'Token is invalid', details: err.message });
        }
        next();
    });
};