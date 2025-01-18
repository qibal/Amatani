'use client'

import { useEffect, useState } from 'react';

export default function FeatureGrid() {
    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await fetch('/api/dashboard/shop_decoration/jasa');
                if (!response.ok) {
                    throw new Error('Failed to fetch features');
                }
                const data = await response.json();
                setFeatures(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching features:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchFeatures();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <section className="px-16 py-8 bg-white">
            <div className="container mx-auto py-12">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Kostumisasi Produk <br /> Sesuai Kebutuhan Usaha Anda.
                </h2>
                <div className="flex justify-center mb-8">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Gratis!
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature) => (
                        <div key={feature.id_jasa} className="relative group flex flex-col items-center overflow-hidden">
                            <div
                                className="w-full h-[400px] bg-cover bg-center transform group-hover:scale-105 transition duration-300"
                                style={{ backgroundImage: `url(https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${feature.image_path})` }}
                            ></div>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                                {feature.jasa_name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

