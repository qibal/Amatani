'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GetUserCustomers() {
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                }
            }
        }
    )

    try {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: { session } } = await supabase.auth.getSession()

        return {
            isAuthenticated: !!user,
            user_id: user?.id || null,
        }
    } catch (error) {
        console.error('Auth error:', error)
        return {
            isAuthenticated: false,
            user_id: null,
        }
    }
}