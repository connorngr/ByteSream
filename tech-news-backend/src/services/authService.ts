import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your actual secret

export const getCurrentUser = async (req: Request) : Promise<any> => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader!.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        console.log(decoded);
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
        throw new Error('Failed to fetch user due to an unknown error');
    }
};