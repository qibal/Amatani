'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
    try {
        console.log("masuk");
        const supabase = await createClient();

        const redirectTo = `${process.env.DOMAIN_URL}/auth/callback`;
        console.log("Redirect URL:", redirectTo);

        const { data } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo,
            },
        });

        return data.url;
    } catch (e) {
        console.error("Error during signInWithGoogle:", e);
    }
}

export async function login(formData) {
    const supabase = await createClient()

    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData) {
    const supabase = await createClient()

    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function Logout() {
    const supabase = await createClient();
    const { } = await supabase.auth.signOut()
}