// components/customer/Navbar/CategoryMenu.js
'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryMenu({ isRootPath }) {
    const categories = [
        { name: "Sayuran 🥬", href: "/kategori/sayuran" },
        { name: "Buah-Buahan 🍎", href: "/kategori/buah-buahan" },
        { name: "Sembako 🛒", href: "/kategori/sembako" },
        { name: "Unggas dan Telur 🥚", href: "/kategori/unggas-telur" },
        { name: "Ikan dan Makanan Laut 🐟", href: "/kategori/ikan-laut" },
    ];

    return (
        <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
                <div className="flex items-center space-x-4 cursor-pointer">
                    <AlignJustify className={`${isRootPath ? "text-white" : "text-gray-950"}`} />
                    <span className={`${isRootPath ? "text-white" : "text-gray-950"}`}>Kategori Produk</span>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="p-3 w-56 bg-white rounded-md shadow-md">
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        className="w-full text-left mt-2 text-gray-950 bg-white hover:bg-rose-100 hover:outline hover:outline-2 hover:outline-rose-600"
                        asChild
                    >
                        <Link href={category.href}>{category.name}</Link>
                    </Button>
                ))}
            </HoverCardContent>
        </HoverCard>
    );
}
