'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, ShoppingCart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavbarSheet({ isLoggedIn, scrolled }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <AlignJustify
                    className={`block md:hidden cursor-pointer ${scrolled ? "text-gray-950" : "text-white"
                        }`}
                />
            </SheetTrigger>
            <SheetContent side="right" className="w-[90%] max-w-md py-12 bg-white h-full">
                {/* Conditional Rendering for Buttons */}
                <div className="flex justify-between space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Button className="bg-white border border-rose-600 text-gray-900 w-full rounded-md hover:bg-rose-100">
                                <Link href="/profile" className="flex justify-center items-center py-2">
                                    Profile
                                </Link>
                            </Button>
                            <Button className="bg-rose-600 text-white w-full rounded-md hover:bg-rose-700">
                                <Link href="/logout">Logout</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="bg-rose-600 text-white w-full rounded-md hover:bg-rose-700">
                                <Link href="/masuk">Masuk</Link>
                            </Button>
                            <Button className="bg-rose-600 text-white w-full rounded-md hover:bg-rose-700">
                                <Link href="/daftar">Daftar</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Shopping Cart */}
                <div className="flex items-center mt-6 space-x-2">
                    <ShoppingCart className="w-6 h-6 text-gray-950" />
                    <span className="text-gray-950">Keranjang</span>
                </div>

                {/* Links */}
                <div className="mt-6 space-y-4">
                    <Link href="/about" className="block text-gray-950 hover:underline">
                        Tentang Kami
                    </Link>
                    <Link href="/help" className="block text-gray-950 hover:underline">
                        Pusat Bantuan
                    </Link>
                    <Link href="/collaboration" className="block text-gray-950 hover:underline">
                        Bekerja Sama
                    </Link>
                </div>

                {/* Language Option */}
                <div className="flex items-center mt-6 space-x-2">
                    <Globe className="w-6 h-6 text-gray-950" />
                    <span className="text-gray-950">Bahasa Indonesia</span>
                </div>
            </SheetContent>
        </Sheet>
    );
}
