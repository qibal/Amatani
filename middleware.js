import { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(request) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};