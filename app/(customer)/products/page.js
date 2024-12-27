"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle, ChevronDown, Filter, Search, X } from "lucide-react"; // Ikon untuk fallback
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react'

import Image from "next/image";

export default function Product() {
    // Data Dummy
    const [productsData, setProductsdata] = useState([]);

    useEffect(() => {
        // async function fetchProducts() {
        //     let { data: productsData, error } = await supabase
        //         .from('products_2')
        //         .select('*');

        //     if (error) {
        //         console.error("Kesalahan dalam Prodes:", error);
        //     } else {
        //         setProductsdata(productsData);
        //         console.log(productsData);
        //     }
        // }
        // fetchProducts();
    }, []);

    return (
        <div className="mt-4 px-4 container mx-auto">
            {/* Mobile & Medium Layout */}
            <div className="flex flex-col gap-2 py-2 lg:hidden">
                {/* Search Input */}
                <div className="flex items-center gap-4 w-full">
                    <div className="relative flex items-center w-full">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Cari produk"
                            className="w-full pl-8 pr-8 rounded-full"
                        />
                        <Button
                            size="icon"
                            className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                        >
                            <X className="h-4 w-4 text-gray-950" />
                        </Button>
                    </div>
                    <Button className="bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-full">
                        Cari
                    </Button>
                </div>

                {/* Hasil Pencarian, Filter, dan Sort By */}
                <div className="flex justify-between items-center w-full">
                    <p className="text-sm text-gray-800 font-medium">Apel (20)</p>
                    <div className="flex items-center gap-4">
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <Filter className="w-4 h-4 text-gray-950" />
                            <span className="text-gray-950">Filter</span>
                        </Button>
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <span className="text-gray-950">Short By</span>
                            <ChevronDown className="w-4 h-4 text-gray-950" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center lg:w-full py-4">
                <div>
                    <p className="text-sm text-gray-800">Hasil pencarian:</p>
                    <p className="text-xl font-semibold text-gray-800">
                        Apel (20)
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    {/* Search Input */}
                    <div className="flex items-center gap-2 flex-grow lg:flex-grow-0 w-full lg:w-auto">
                        <div className="relative flex items-center w-full lg:w-[300px]">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 pr-8 rounded-full"
                            />
                            <Button
                                size="icon"
                                className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                            >
                                <X className="h-4 w-4 text-gray-950" />
                            </Button>
                        </div>
                        <Button
                            className="bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-full"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Cari
                        </Button>
                    </div>
                    {/* Filter dan Sort By Buttons */}
                    <div className="flex items-center gap-2">
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <Filter className="w-4 h-4 text-gray-950" />
                            <span className="text-gray-950">Filter</span>
                        </Button>
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <span className="text-gray-950">Sort By</span>
                            <ChevronDown className="w-4 h-4 text-gray-950" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid Produk */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {productsData.length > 0 ? (
                    productsData.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            imageSrc={product.product_images || "/placeholder-image.png"}
                            name={product.product_name || "Nama tidak tersedia"}
                            category={product.category || "Kategori tidak tersedia"}
                            priceRange={product.price_range || "Harga tidak tersedia"}
                        />
                    ))
                ) : (
                    <NoProduct />
                )}
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, name, category, priceRange }) {
    return (
        <Card className="w-full border-0 shadow-none">
            <CardHeader className="p-0">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        width={200}
                        height={200}
                        src={imageSrc}
                        alt="nadadeafnouabfume"
                        className="object-cover w-full h-full"
                    />
                </AspectRatio>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-base font-bold text-rose-600">{priceRange}</p>
            </CardContent>
        </Card>
    );
}

function NoProduct() {
    return (
        <Card className="flex items-center justify-center w-full h-64 bg-gray-100">
            <div className="flex flex-col items-center text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-gray-500" />
                <p className="text-gray-500">Tidak ada produk!</p>
            </div>
        </Card>
    );
}
