import Navbar from "@/components/customer/Navbar/Navbar";
import { Suspense } from "react";
import { headers } from "next/headers";

async function getPathname() {
    const headersList = headers();
    const pathname = await headersList.get("x-pathname");
    return pathname || "/";
}

export default async function RootLayout({ children }) {
    const pathname = await getPathname();
    const isRootPath = pathname === "/";

    return (
        <>
            <Suspense fallback={<p className="text-center py-4">Loading...</p>}>
                <Navbar isRootPath={isRootPath} />
                <main>{children}</main>
            </Suspense>
        </>
    );
}
