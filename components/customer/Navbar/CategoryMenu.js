// components/customer/Navbar/CategoryMenu.js
'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export default function CategoryMenu({ isRootPath }) {
    const [Categories, SetCategories] = useState([])
    console.log("🚀 ~ CategoryMenu ~ Categories:", Categories)
    useEffect(() => {
        async function GetCategories() {
            const result = await fetch('/api/customer')
            const data = await result.json()
            SetCategories(data)
        }
        GetCategories()
    }, [])


    return (
        <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
                <div className="flex items-center space-x-4 cursor-pointer">
                    <AlignJustify className={`${isRootPath ? "text-white" : "text-gray-950"}`} />
                    <span className={`${isRootPath ? "text-white" : "text-gray-950"}`}>Kategori Produk</span>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="p-3 w-56 bg-white rounded-md shadow-md translate-x-7">
                {Categories.length > 0 ? (
                    Categories.map((category) => {
                        const formattedCategoryName = category.categories_name
                            .toLowerCase()
                            .replace(/[\s-]+/g, '-') // Replace spaces and hyphens with a single hyphen
                            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
                            .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
                        return (
                            <Button
                                key={category.categories_id}
                                className="w-full text-left mt-2 text-gray-950 bg-white hover:bg-rose-100 hover:outline hover:outline-2 hover:outline-rose-600"
                                asChild
                            >
                                <Link href={`/products?query=${formattedCategoryName}`}>{category.categories_name}</Link>
                            </Button>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No categories available</p>
                )}

            </HoverCardContent>
        </HoverCard>
    );
}
