import passport from "passport";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        next();
    });
};

export const checkUserRole = (role: string) => (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }

        if (decoded.role === role) {
            return next();
        } else {
            return res.status(403).send('Forbidden');
        }
    });
};