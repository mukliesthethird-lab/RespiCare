import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { userDb } from '@/lib/db';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = userDb.findByEmail(email);

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate unique ID
        const userId = randomBytes(16).toString('hex');

        // Create user
        userDb.create(userId, email, hashedPassword, name);

        return NextResponse.json(
            { message: 'User created successfully', userId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
