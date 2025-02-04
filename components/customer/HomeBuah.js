"use client";


import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle } from "lucide-react"; // Ikon untuk fallback
import Image from "next/image";
import Link from "next/link";

export default function HomeBuah() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const maxRetries = 3;

    useEffect(() => {
        async function fetchProducts(retryCount = 0) {
            try {
                setIsLoading(true);
                const result = await fetch('/api/customer/home/home_buah');
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const data = await result.json();
                console.log("Data Kategori:", data);
                console.log("Jumlah Kategori:", data.length);
                setCategories(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching products:", error);
                if (retryCount < maxRetries) {
                    // Tunggu sebentar sebelum mencoba lagi
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return fetchProducts(retryCount + 1);
                }
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <section className="py-8 px-16 bg-white">
            <div className="container mx-auto">
                {/* Judul */}
                {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800">Buah-Buahan</h2> */}

                {/* Scrollable Area */}
                <div className="flex flex-col gap-y-8">

                    {Array.isArray(categories) && categories.map((category, index) => (
                        <div key={category.categories_id} className={index > 0 ? "gap-y-4" : "gap-y-0"}>
                            {/* Tambahkan judul kategori */}
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                                {category.categories_name}
                            </h2>

                            {category.products && category.products.length > 0 && (
                                <ScrollArea>
                                    <div className="flex gap-4">
                                        {category.products.map((product) => (
                                            <ProductCard
                                                key={product.product_id}
                                                product_id={product.product_id}
                                                imageSrc={product.images?.[0] || "/placeholder-image.png"}
                                                name={product.products_name || "Nama tidak tersedia"}
                                                category={category.categories_name}
                                                priceType={product.price_type}
                                                fixedPrice={product.fixed_price}
                                                wholesalePrices={product.wholesale_prices || []}
                                            />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product_id, imageSrc, name, category, priceType, fixedPrice, wholesalePrices }) {
    let priceRange;

    if (priceType === 'wholesale' && wholesalePrices && wholesalePrices.length > 0) {
        const prices = wholesalePrices.map(price => price.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
            priceRange = `Rp ${minPrice.toLocaleString()}`;
        } else {
            priceRange = `Rp ${minPrice.toLocaleString()} - Rp ${maxPrice.toLocaleString()}`;
        }
    } else if (priceType === 'fixed' && fixedPrice !== null) {
        priceRange = `Rp ${Number(fixedPrice).toLocaleString()}`;
    } else {
        priceRange = "Harga tidak tersedia";
    }

    return (
        <Link href={`/products/${product_id}`}>
            <Card className="flex-shrink-0 w-80">
                <CardHeader className="p-0">
                    <AspectRatio ratio={1}>
                        <Image
                            src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${imageSrc}`}
                            alt={name}
                            className="object-cover w-full h-full"
                            width={200}
                            height={200}
                        />
                    </AspectRatio>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500">{category}</p>
                    <p className="text-base font-bold text-rose-600">{priceRange}</p>
                </CardContent>
            </Card>
        </Link>
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
