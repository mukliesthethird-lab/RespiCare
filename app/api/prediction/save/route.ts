import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { predictionDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { chronicCough, asthma, copd, respiratoryInfection } = body;

        // Validate input
        if (
            typeof chronicCough !== 'number' ||
            typeof asthma !== 'number' ||
            typeof copd !== 'number' ||
            typeof respiratoryInfection !== 'number'
        ) {
            return NextResponse.json({ error: 'Invalid prediction data' }, { status: 400 });
        }

        const userId = (session.user as any).id;
        const predictionId = randomUUID();

        // Save prediction to database
        predictionDb.create(predictionId, userId, {
            chronicCough,
            asthma,
            copd,
            respiratoryInfection
        });

        return NextResponse.json({
            success: true,
            message: 'Prediction saved successfully',
            predictionId
        });
    } catch (error) {
        console.error('Save prediction error:', error);
        return NextResponse.json({ error: 'Failed to save prediction' }, { status: 500 });
    }
}
