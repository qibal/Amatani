import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { jwtDecode } from 'jwt-decode';
import chalk from 'chalk';

export async function middleware(request) {
    console.log('masuk middleware');
    let supabaseResponse = NextResponse.next({
        request,
    });

    try {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                        supabaseResponse = NextResponse.next({
                            request,
                        });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        );
                    },
                },
            }
        );

        // cek user sudah login atau belum dan request ke server supabase
        // melihat session dan user_role di acces token
        const url = request.nextUrl.clone();
        const { data: user } = await supabase.auth.getUser();
        const { data: { session } } = await supabase.auth.getSession();

        // inisialisasi user_role
        let user_role = null;
        if ((user.user != null) && (session.access_token != null)) {
            const jwt = jwtDecode(session.access_token);
            user_role = jwt['user_role'];
            console.log('ada user dan session');
            // console.log('access_token:', session.access_token);
        }

        console.log('berhasil decode acces token');
        console.log('cek user ?');
        console.log("User_role:", user_role);
        // console.log("Get user:", user.user);

        // Check for x-forwarded-proto header
        const forwardedProto = request.headers.get('x-forwarded-proto');
        console.log('forwardedProto:', forwardedProto);

        //router admin
        if (url.pathname.startsWith('/dashboard')) {
            console.log('masuk halamanan dashboard');
            if (user.user == null) {
                console.log('user belum login, tidak boleh masuk, arahkan ke /');
                url.pathname = '/';
                return NextResponse.redirect(url);
            } else if (user.user != null) {
                console.log('user sudah login');
                if (user_role === 'admin') {
                    console.log('user adalah admin, boleh masuk');
                    return NextResponse.next();
                } else if (user_role === 'customer') {
                    console.log('user adalah customer, tidak boleh masuk, arahkan ke /');
                    url.pathname = '/';
                    return NextResponse.redirect(url);
                }
            }
        }

        // router guest and customer
        if (url.pathname === '/') {
            console.log('masuk halamanan /');
            if (user.user == null) {
                console.log('user belum login, boleh masuk');
                return NextResponse.next({ request });
            } else if (user.user != null) {
                console.log('user sudah login');
                if (user_role === 'admin') {
                    console.log('user adalan admin, pindahkan ke /dashboard');
                    url.pathname = '/dashboard';
                    return NextResponse.redirect(url);
                } else if (user_role === 'customer') {
                    console.log('user adalah customer, masuk halaman /');
                    return NextResponse.next({ request });
                }
            }
        }

        // router customer
        if (url.pathname.startsWith('/profile')) {
            console.log('masuk halamanan /profile');
            if (user.user == null) {
                console.log('user belum login, tidak boleh masuk, arahkan ke /login');
                url.pathname = '/login';
                return NextResponse.redirect(url);
            } else if (user.user != null) {
                console.log('user sudah login');
                if (user_role === 'admin') {
                    console.log('user adalan admin,tidak boleh masuk, pindahkan ke /dashboard');
                    url.pathname = '/dashboard';
                    return NextResponse.redirect(url);
                } else if (user_role === 'customer') {
                    console.log('user adalah customer, boleh masuk, arahkan ke /profile');
                    return NextResponse.next({ request });
                }
            }
        }

        if (url.pathname.startsWith('/orders')) {
            console.log('masuk halamanan /orders');
            if (user.user == null) {
                console.log('user belum login, tidak boleh masuk, arahkan ke /login');
                url.pathname = '/login';
                return NextResponse.redirect(url);
            } else if (user.user != null) {
                console.log('user sudah login');
                if (user_role === 'admin') {
                    console.log('user adalan admin,tidak boleh masuk, pindahkan ke /dashboard');
                    url.pathname = '/dashboard';
                    return NextResponse.redirect(url);
                } else if (user_role === 'customer') {
                    console.log('user adalah customer, boleh masuk, arahkan ke /profile');
                    return NextResponse.next({ request });
                }
            }
        }

        if (url.pathname.startsWith('/cart')) {
            console.log('masuk halamanan /cart');
            if (user.user == null) {
                console.log('user belum login, tidak boleh masuk, arahkan ke /login');
                url.pathname = '/login';
                return NextResponse.redirect(url);
            } else if (user.user != null) {
                console.log('user sudah login');
                if (user_role === 'admin') {
                    console.log('user adalan admin,tidak boleh masuk, pindahkan ke /dashboard');
                    url.pathname = '/dashboard';
                    return NextResponse.redirect(url);
                } else if (user_role === 'customer') {
                    console.log('user adalah customer, boleh masuk, arahkan ke /profile');
                    return NextResponse.next({ request });
                }
            }
        }
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        // admin
        '/dashboard/:path*',
        //customer
        '/profile/:path*',
        '/orders/:path*',
        //guest and customer
        '/',
        '/cart'
    ],
};