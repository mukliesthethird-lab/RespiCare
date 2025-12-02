import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { predictionDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const predictions = predictionDb.findByUserId(userId, 10);
        const totalPredictions = predictionDb.countByUserId(userId);

        return NextResponse.json({
            predictions,
            totalPredictions
        });
    } catch (error) {
        console.error('User stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch user statistics' }, { status: 500 });
    }
}
