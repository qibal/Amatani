"use client";

import { useEffect, useState } from 'react';

export default function HomeKPangan() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/dashboard/shop_decoration/kategori_pangan');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <section className="px-16 py-8 bg-white">
            <div className="container mx-auto">
                {/* Judul */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Kategori Pangan
                </h2>
                {/* Grid Produk */}
                <div
                    className="flex overflow-x-auto space-x-4 py-4 w-full scroll-snap-x"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {Array.isArray(categories) && categories.map((category) => (
                        <ProductCard
                            key={category.id_categories_pangan}
                            imageSrc={category.image_path}
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
            className="flex flex-col justify-start items-center flex-none w-[240px] sm:w-[280px] md:w-[365px] h-[320px] sm:h-[400px] md:h-[480px] relative"
            style={{ scrollSnapAlign: "center" }}
        >
            {/* Gambar Background */}
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${imageSrc})` }}
            ></div>
            {/* Label Nama Kategori */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 flex justify-start items-center px-4 py-2 rounded-full bg-white bg-opacity-90">
                <p className="text-sm sm:text-base font-semibold text-left text-gray-800">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}