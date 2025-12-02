import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const callbackUrl = searchParams.get('callbackUrl');

    // Default to 'id' locale since it's the primary language
    const locale = 'id';

    let destination = `/${locale}/auth/login`;
    if (callbackUrl) {
        destination += `?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    }

    redirect(destination);
}
