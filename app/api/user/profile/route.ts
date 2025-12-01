import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { userDb } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const user = userDb.findById(userId);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.created_at
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const body = await req.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        // Check if email is already taken by another user
        const existingUser = userDb.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        try {
            userDb.updateProfile(userId, name.trim(), email.trim());

            const updatedUser = userDb.findById(userId);
            return NextResponse.json({
                id: updatedUser?.id,
                name: updatedUser?.name,
                email: updatedUser?.email,
                role: updatedUser?.role,
                createdAt: updatedUser?.created_at
            });
        } catch (error: any) {
            if (error.message?.includes('UNIQUE constraint failed')) {
                return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
            }
            throw error;
        }
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
