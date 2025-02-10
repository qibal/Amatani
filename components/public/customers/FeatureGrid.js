'use client'

import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/shadcnUi/skeleton";

export default function FeatureGrid() {
    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                setIsLoading(true); // Mulai loading
                const response = await fetch('/api/v2/public/lp/service');
                if (!response.ok) {
                    throw new Error('Failed to fetch features');
                }
                const data = await response.json();
                setFeatures(data.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching features:', error);
                setError(error.message);
            } finally {
                setIsLoading(false); // Selesai loading
            }
        };

        fetchFeatures();
    }, []);

    if (isLoading) {
        return (
            <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 bg-white">
                <div className="container mx-auto py-12">
                    {/* Judul Skeleton */}
                    <Skeleton className="h-8 w-96 mx-auto mb-4 bg-gray-200 rounded-md" />
                    {/* Label Gratis Skeleton */}
                    <div className="flex justify-center mb-8">
                        <Skeleton className="h-6 w-24 bg-gray-200 rounded-full" />
                    </div>
                    {/* Grid Produk Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Skeleton Card (repeat as needed) */}
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="relative group flex flex-col items-center overflow-hidden">
                                {/* Skeleton Gambar Background */}
                                <Skeleton className="w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-gray-200 rounded-lg transform group-hover:scale-105 transition duration-300" />
                                {/* Skeleton Label Nama Jasa */}
                                <Skeleton className="absolute bottom-2 h-6 w-32 bg-gray-100 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 bg-white">
            <div className="container mx-auto py-12">
                {/* Judul */}
                <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4">
                    Kostumisasi Produk <br /> Sesuai Kebutuhan Usaha Anda.
                </h2>
                {/* Label Gratis */}
                <div className="flex justify-center mb-8">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Gratis!
                    </span>
                </div>
                {/* Grid Produk */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature) => (
                        <div key={feature.service_id} className="relative group flex flex-col items-center overflow-hidden">
                            {/* Gambar Background */}
                            <div
                                className="w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-cover bg-center transform group-hover:scale-105 transition duration-300 rounded-lg"
                                style={{ backgroundImage: `url(https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${feature.image_path})` }}
                            ></div>
                            {/* Label Nama Jasa */}
                            <div className="absolute bottom-2 flex justify-center items-center bg-white text-gray-800 text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                                {feature.service_name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}