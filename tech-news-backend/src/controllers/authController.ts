import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../config/db';
import passport from 'passport';
import validator from 'validator';
import { getCurrentUser } from '../services/authService';

interface UserRequest {
    email: string;
    password?: string;
    oauthId?: string;
}

const validate = (body: UserRequest): string | null => {
    if (!body.email) return 'Email is required';
    if (!body.password && !body.oauthId) return 'Password is required';
    if (!validator.isEmail(body.email)) return 'Invalid email format';
    if (body.password && body.password.length < 6) return 'Password must be at least 6 characters';
    return null;
};


export const registerUser = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as UserRequest;
    console.log(body);

    const validationError = validate(body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let hashedPassword = null;
        if (body.password) {
            hashedPassword = await bcrypt.hash(body.password, 10);
        }

        const newUser: any = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                oauthId: body.oauthId
            }
        });

        res.status(201).json({ message: 'User created successfully', user: newUser.email });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const body = req.body as UserRequest;

    const validationError = validate(body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            if (!user.password || !body.password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(body.password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }

        const token = jwt.sign(
            { email: user.email, userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await getCurrentUser(req);

        // Exclude sensitive information like password
        const { password, createAt, id, oauthId, ...userWithoutSensitiveInfo } = user;

        res.status(200).json({ user: userWithoutSensitiveInfo });
    } catch (error) {
        res.status(401).json({ message: error instanceof Error ? error.message : 'Unauthorized' });
    }
};
