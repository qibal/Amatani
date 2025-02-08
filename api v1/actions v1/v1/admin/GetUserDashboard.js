'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function GetUserDashboard() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )

    try {
        const { data: { user } } = await supabase.auth.getUser()
        return {
            isAuthenticated: !!user,
            user,
        }
    } catch (error) {
        console.error('Auth error:', error)
        return {
            isAuthenticated: false,
            user: null,
        }
    }
}