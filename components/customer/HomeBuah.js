"use client";

import { GetProducts } from "@/app/api/customer/products/Aproducts";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function HomeBuah() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await GetProducts();
                console.log("DATA PRODUK =", data); // Debugging
                if (data) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-16">
                {/* Judul */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Buah Buahan &gt;</h2>
                
                {/* ScrollArea */}
                <ScrollArea className="pb-4 ">
                    <div className="flex w-max space-x-2">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.product_id}
                                    imageSrc={product.product_images?.[0]?.image_url || "/placeholder-image.png"}
                                    name={product.product_name || "Nama tidak tersedia"}
                                    category="Buah-buahan"
                                    priceRange="Rp 290,000 - Rp 440,000"
                                />
                            ))
                        ) : (
                        <NoProduct/>
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
        <div className="flex flex-col w-[250px] overflow-hidden">
            {/* Kontainer Gambar */}
            <div className="w-full h-[400px]">
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Konten Teks */}
            <div className="flex flex-col justify-start items-start gap-2 pt-3 px-4">
                <p className="text-lg font-bold text-gray-800 w-full">{name}</p>
                <p className="text-base text-gray-600 w-full">{category}</p>
                <p className="text-base font-bold text-red-500   w-full">{priceRange}</p>
            </div>
        </div>
    );
}

function NoProduct() {
    return (
        <div className="flex flex-col w-[365px] overflow-hidden justify-center items-center h-[480] bg-slate-300">
            {/* Kontainer Gambar */}
            <p>
                Tidak ada Product!!!
            </p>
        </div>
    );
}
