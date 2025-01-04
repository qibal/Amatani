import { AddToCartCustomers } from "@/app/api/server_actions/customer/products/detail_products/D_productActions";
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value)
                        )
                    },
                },
            }
        )

        const { data: user } = await supabase.auth.getUser()
        console.log("🚀 ~ POST ~ user:", user)
        const { data: { session } } = await supabase.auth.getSession()
        console.log("🚀 ~ POST ~ session:", session)

        if (!session || !user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const result = await AddToCartCustomers({
            request: request,
            user: user.user,
            session: session,
            user_id: user.user.id
        })

        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}