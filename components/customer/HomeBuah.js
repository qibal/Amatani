"use client";


import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle } from "lucide-react"; // Ikon untuk fallback
import Image from "next/image";

export default function HomeBuah() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const result = await fetch('/api/customer/home/home_buah');
                const data = await result.json();
                setCategories(data); // Simpan data kategori di state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className="py-8 px-16 bg-white">
            <div className="container mx-auto">
                {/* Judul */}
                {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800">Buah-Buahan</h2> */}

                {/* Scrollable Area */}
                <div className="flex flex-col gap-y-8">

                    {Array.isArray(categories) && categories.map((category, index) => (
                        <div
                            key={category.categories_id}
                            className={index > 0 ? "gap-y-4" : "gap-y-0"} // Atur jarak berdasarkan indeks
                        >
                            {/* Nama Kategori */}
                            {category.products && category.products.length > 0 && (
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                                    {category.categories_name}
                                </h2>
                            )}

                            <ScrollArea className="pb-4">
                                {/* Produk dalam kategori */}
                                {category.products && category.products.length > 0 ? (
                                    <div className="flex gap-4">
                                        {category.products.map((product) => (
                                            <ProductCard
                                                key={product.product_id}
                                                imageSrc={product.images?.[0] || "/placeholder-image.png"}
                                                name={product.products_name || "Nama tidak tersedia"}
                                                category={category.categories_name}
                                                priceRange={
                                                    product.wholesale_prices?.length > 0
                                                        ? `Rp ${product.wholesale_prices[0].price.toLocaleString()}`
                                                        : "Harga tidak tersedia"
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : null}
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    ))}
                </div>
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
                        src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${imageSrc}`}
                        alt={name}
                        width={300}
                        height={300}
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

// function NoProduct() {
//     return (
//         <Card className="flex items-center justify-center flex-shrink-0 w-80 h-80 bg-gray-100">
//             <div className="flex flex-col items-center text-center space-y-2">
//                 <AlertCircle className="w-8 h-8 text-gray-500" />
//                 <p className="text-gray-500">Tidak ada produk!</p>
//             </div>
//         </Card>
//     );
// }
