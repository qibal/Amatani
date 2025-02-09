"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HomeKPanganPreview({ refresh }) {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/v2/admin/sd/food_categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [refresh]);

    return (
        <section className="bg-white px-4 sm:px-8 py-8">
            <div className="container mx-auto">
                {/* Judul */}
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                    Kategori Pangan
                </h2>
                {/* Grid Produk */}
                <div
                    className="flex overflow-x-auto space-x-4 py-4 w-full scroll-snap-x"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {Array.isArray(categories) && categories.map((category, index) => (
                        <ProductCard
                            key={index}
                            imageSrc={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${category.image_path}`}
                            categoryName={category.categories_name}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ imageSrc, categoryName }) {
    return (
        <div
            className="flex flex-col justify-start items-center flex-none w-[140px] sm:w-[180px] md:w-[220px] lg:w-[250px] h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] relative"
            style={{ scrollSnapAlign: "center" }}
        >
            {/* Gambar Background */}
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
            {/* Label Nama Kategori */}
            <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-2 flex justify-start items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white bg-opacity-90">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-left text-gray-800">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}