"use client";

import { GetProducts } from "@/app/api/customer/products/Aproducts";
import { useEffect, useState } from "react";

export default function Product() {
    const [products, setProducts] = useState([]);
    console.log("DATA PRODUK = ", products);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await GetProducts();
                if (data) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("🚨 ~ GetProducts ~ error", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="my-16 px-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Buah Buahan &gt;
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-12">
                {products.length > 0 ? (
                    products.map((p) => (
                        <ProductCard
                            key={p.product_id}
                            imageSrc={p.product_images[0].image_url}
                            name={p.product_name}
                            category="Buah-buahan"
                            // type="2 Jenis"
                            priceRange="Rp 290,000 - Rp 440,000"
                        />
                    ))
                ) : (
                    <p>Tidak ada data</p>
                )}
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, name, category, type, priceRange }) {
    return (
        <div className="flex flex-col justify-center items-start w-full  ">
            {/* Image Container */}
            <div className="flex justify-start items-center w-full h-[550px] bg-gray-100">
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Text Content */}
            <div className="flex flex-col justify-start items-start gap-2 pt-3">
                <p className="text-lg font-bold text-center text-gray-800">{name}</p>
                <p className="text-base text-center text-gray-600">{category}</p>
                <p className="text-base text-center font-bold text-red-500">{priceRange}</p>
            </div>
        </div>
    );
}
