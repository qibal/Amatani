'use server'


import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';


export async function signInWithGoogle() {
    try {
        console.log("masuk");
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: 'http://localhost:3000/auth/callback',
            },
        });

        // console.log(data);
        return data.url


    } catch (e) {
        // console.log("error", e);
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

export async function Logout(params) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut()

}