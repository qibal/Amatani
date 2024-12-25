'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Globe } from "lucide-react";
import NavbarSheet from "@/components/customer/Navbar/Sheet";
import { Button } from "@/components/ui/button";
import CategoryMenu from "./CategoryMenu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isRootPath, setIsRootPath] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.1);
        };

        // Set isRootPath based on pathname
        setIsRootPath(pathname === "/");

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    // Class untuk teks di navbar
    const textClass = isRootPath && !scrolled ? "text-white" : "text-gray-950";
    // Class untuk background navbar
    const navbarClass = isRootPath
        ? scrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
        : "bg-white shadow-md";

    return (
        <header
            className={`navbar w-full z-50 transition-all duration-300 px-8 ${isRootPath ? "fixed" : "relative"} ${navbarClass}`}
        >
            <div className="container mx-auto flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/FE/IconAmatani.svg"
                            alt="Logo AMATANI"
                            width={42}
                            height={42}
                        />
                        <span className={`font-bold text-lg ${textClass}`}>
                            AMATANI
                        </span>
                    </div>
                </Link>

                {/* Icon dan Button */}
                <div className="flex items-center space-x-4">
                    {/* Bahasa */}
                    <HoverCard openDelay={0} closeDelay={100}>
                        <HoverCardTrigger asChild>
                            <div className={`flex items-center space-x-1 cursor-pointer ${textClass}`}>
                                <Globe className="w-5 h-5" />
                                <span className="text-sm">Bahasa</span>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-2 w-40 bg-white rounded-md shadow-md">
                            <Button className="w-full text-left text-gray-950 bg-white hover:bg-rose-100 hover:outline hover:outline-2 hover:outline-rose-600">
                                Bahasa Indonesia 🇮🇩
                            </Button>
                            <Button className="w-full text-left text-gray-950 mt-4 bg-white hover:bg-rose-100 hover:outline hover:outline-2 hover:outline-rose-600">
                                Bahasa Inggris 🇺🇸
                            </Button>
                        </HoverCardContent>
                    </HoverCard>

                    {/* Shopping Cart */}
                    <Link href="/products"><ShoppingCart className={`w-5 h-5 cursor-pointer ${textClass}`} /></Link>

                    {/* Login and Register Buttons */}
                    <Button
                        className={`hidden md:block outline outline-1 outline-rose-600 rounded-md hover:outline hover:bg-transparent hover:outline-2 hover:outline-rose-500 ${isRootPath && !scrolled ? "bg-transparent text-white" : "bg-white text-gray-950"
                            }`}
                    >
                        <Link href="/login">Masuk</Link>
                    </Button>

                    <Button className="bg-rose-600 text-white rounded-md hover:bg-rose-700">
                        <Link href="/signup">Daftar</Link>
                    </Button>
                    {/* Sheet Trigger */}
                    <NavbarSheet isLoggedIn={isLoggedIn} scrolled={scrolled} />
                </div>
            </div>

            {/* Tingkatan 2 - Hanya tampil jika di root path */}
            {isRootPath && (
                <div className="hidden md:flex container mx-auto items-center justify-between pb-4 text-sm">
                    <CategoryMenu isRootPath={isRootPath && !scrolled} />
                    <div className="flex items-center space-x-6">
                        <Link className={`hover:underline ${textClass}`} href="/tentang-kami">
                            Tentang Kami
                        </Link>
                        <Link className={`hover:underline ${textClass}`} href="/pusat-bantuan">
                            Pusat Bantuan
                        </Link>
                        <Link className={`hover:underline ${textClass}`} href="/bekerja-sama">
                            Bekerja Sama
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
