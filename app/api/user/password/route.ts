import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { userDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const body = await req.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
        }

        // Verify current password
        const storedPassword = userDb.getPasswordById(userId);
        if (!storedPassword) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isCorrect = await bcrypt.compare(currentPassword, storedPassword);
        if (!isCorrect) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }

        // Hash and update new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        userDb.updatePassword(userId, hashedPassword);

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password update error:', error);
        return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }
}
