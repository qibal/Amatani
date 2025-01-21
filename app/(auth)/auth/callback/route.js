import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    console.log('masuk GET callback');
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    console.log('searchParams:', searchParams);
    console.log('origin:', origin);
    console.log('code:', code);
    console.log('next:', next);

    if (code) {
        try {
            const supabase = await createClient();
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (!error) {
                const forwardedHost = request.headers.get('x-forwarded-host');
                const isLocalEnv = process.env.NODE_ENV === 'development';
                console.log('forwardedHost:', forwardedHost);
                console.log('isLocalEnv:', isLocalEnv);

                if (isLocalEnv) {
                    console.log('Redirecting to:', `${origin}${next}`);
                    return NextResponse.redirect(`${origin}${next}`);
                } else if (forwardedHost) {
                    console.log('Redirecting to:', `https://${forwardedHost}${next}`);
                    return NextResponse.redirect(`https://${forwardedHost}${next}`);
                } else {
                    console.log('Redirecting to:', `${origin}${next}`);
                    return NextResponse.redirect(`${origin}${next}`);
                }
            } else {
                console.error('Error exchanging code for session:', error);
            }
        } catch (error) {
            console.error('Error in GET callback:', error);
        }
    }

    console.log('Redirecting to auth-code-error');
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}