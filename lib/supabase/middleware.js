import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { jwtDecode } from 'jwt-decode'

export async function UpdateSession(request) {
    let supabaseResponse = NextResponse.next({
        request,
    })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // cek user sudah login atau belum dan request ke server supabase
    // melihat session dan user_role di acces token
    // inisialisasi url
    const { data: user } = await supabase.auth.getUser()
    const { data: session } = await supabase.auth.getSession()
    const url = request.nextUrl.clone()

    let jwt = ''
    let user_role = ''

    if (session && session.access_token) {
        jwt = jwtDecode(session.access_token)
        user_role = jwt.user_role
    }

    console.log('md masss', user_role)

    if (url.pathname.startsWith('/dashboard')) {
        if (!user || !user_role) {
            url.pathname = '/login'
        } else if (user && user_role) {
            if (user_role === 'admin') {
                url.pathname = '/dashboard'
                return NextResponse.redirect(url)
            } else if (user_role === 'customer') {
                url.pathname = '/'
                return NextResponse.redirect(url)
            }
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        '/dashboard:pathname*',
    ],
}