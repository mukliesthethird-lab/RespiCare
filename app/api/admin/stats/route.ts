import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { userDb, predictionDb } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const role = (session.user as any).role;

        if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const totalUsers = userDb.count();
        const totalPredictions = predictionDb.count();
        const recentUsers = userDb.findAll(10);
        const recentPredictions = predictionDb.getAllRecent(10);

        return NextResponse.json({
            totalUsers,
            totalPredictions,
            recentUsers,
            recentPredictions
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch admin statistics' }, { status: 500 });
    }
}
