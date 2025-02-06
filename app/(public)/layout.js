import Navbar from "@/components/customers/Navbar/Navbar";
import { Suspense } from "react";

import { CartProvider } from "@/components/customers/Navbar/CartContext";
import { GetUserCustomers } from "@/components/customers/GetUser";




export default async function RootLayout({ children }) {
    const auth = await GetUserCustomers()
    let initialCartCount = 0

    if (auth.isAuthenticated && auth.user_id) {
        // Lakukan fetch server-side ke /api/customer/navbar_cart/{user_id}
        const res = await fetch(`${process.env.DOMAIN_URL}/api/customer/navbar_cart/${auth.user_id}`, {
            cache: "no-store"
        });
        const json = await res.json();
        if (res.ok) {
            initialCartCount = json.data;
        }
    }
    return (
        <>
            <CartProvider initialCartCount={initialCartCount} initialUserId={auth.user_id}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Navbar isAuthenticated={auth.isAuthenticated} user_id={auth.user_id} />
                    <main>{children}</main>
                </Suspense>
            </CartProvider>
        </>
    );
}
