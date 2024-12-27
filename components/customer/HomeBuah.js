"use client";


import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle } from "lucide-react"; // Ikon untuk fallback
import Image from "next/image";

export default function HomeBuah() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // async function fetchProducts() {
        //     try {
        //         const data = await GetProducts();
        //         setProducts(data || []);
        //     } catch (error) {
        //         console.error("Error fetching products:", error);
        //     }
        // }

        // fetchProducts();
    }, []);

    return (
        <section className="py-8 px-8 bg-white">
            <div className="container mx-auto">
                {/* Judul */}
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Buah Buahan</h2>

                {/* Scrollable Area */}
                <ScrollArea className="pb-4">
                    <div className="flex gap-4">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.product_id}
                                    imageSrc={product.product_images?.[0]?.image_url || "/placeholder-image.png"}
                                    name={product.product_name || "Nama tidak tersedia"}
                                    category="Buah-buahan"
                                    priceRange="Rp 210,000 - Rp 980,000"
                                />
                            ))
                        ) : (
                            <NoProduct />
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </section>
    );
}

function ProductCard({ imageSrc, name, category, priceRange }) {
    return (
        <Card className="flex-shrink-0 w-80">
            <CardHeader className="p-0">
                {/* Komponen Aspect Ratio dari ShadCN */}
                <AspectRatio ratio={1}>
                    <Image
                        src={imageSrc}
                        alt={name}
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
        <Card className="flex items-center justify-center flex-shrink-0 w-80 h-80 bg-gray-100">
            <div className="flex flex-col items-center text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-gray-500" />
                <p className="text-gray-500">Tidak ada produk!</p>
            </div>
        </Card>
    );
}
