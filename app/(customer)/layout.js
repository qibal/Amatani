import Navbar from "@/components/customer/Navbar/Navbar";
import { Suspense } from "react";
import { headers } from "next/headers";

import { CartProvider } from "@/components/customer/Navbar/CartContext";
import { GetUserCustomers } from "@/components/customer/GetUser";

async function getPathname() {
    const headersList = headers();
    const pathname = await headersList.get("x-pathname");
    return pathname || "/";
}

export default async function RootLayout({ children }) {
    // const pathname = await getPathname();
    // const isRootPath = pathname === "/";
    const auth = await GetUserCustomers()
    return (
        <>
            <CartProvider>
                <Suspense fallback={<p className="text-center py-4">Loading...</p>}>
                    <Navbar isAuthenticated={auth.isAuthenticated} user_id={auth.user_id} />
                    <main>{children}</main>
                </Suspense>

            </CartProvider>
        </>
    );
}
