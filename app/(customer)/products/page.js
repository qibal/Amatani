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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                    products.map((p, index, array) => {
                        return (
                            <ProductCard
                                key={p.product_id}
                                imageSrc={p.product_images[0].image_url}
                                name={p.product_name}
                                category="Buah-buahan"
                                // type="2 Jenis"
                                priceRange="Rp 290,000 - Rp 440,000"
                            />
                        )
                    })
                ) : (
                    <p>Tidak ada data</p>
                )}
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, name, category, priceRange }) {
    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div
                className="w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600">{category}</p>
                {/* <p className="text-sm text-gray-600">{type}</p> */}
                <p className="text-sm text-red-600 font-semibold mt-2">{priceRange}</p>
            </div>
        </div>
    );
}
