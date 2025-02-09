import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function JasaGratisPreview({ refresh }) {
    const [features, setFeatures] = useState([]);

    // Fungsi untuk mengambil data jasa dari API
    const fetchJasaData = async () => {
        try {
            const response = await fetch('/api/v2/admin/sd/service');
            if (!response.ok) {
                throw new Error('Failed to fetch jasa data');
            }
            const data = await response.json();
            setFeatures(data.data);
        } catch (error) {
            console.error('Error fetching jasa data:', error);
        }
    };

    // Mengambil data jasa saat komponen pertama kali dirender
    useEffect(() => {
        fetchJasaData();
    }, []);

    // Mengambil data jasa setiap kali refresh berubah
    useEffect(() => {
        fetchJasaData();
    }, [refresh]);

    return (
        <section className="bg-white">
            <div className="container mx-auto py-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Kostumisasi Produk <br /> Sesuai Kebutuhan Usaha Anda.
                </h2>
                <div className="flex justify-center mb-8">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Gratis!
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group flex flex-col items-center overflow-hidden"
                        >
                            <div className="w-full h-[300px] bg-cover bg-center transform group-hover:scale-105 transition duration-300">
                                <Image
                                    src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${feature.image_path}`}
                                    alt="Jasa Gratis"
                                    width={300}
                                    height={400}
                                    className="object-contain"
                                />
                            </div>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                                {feature.service_name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}