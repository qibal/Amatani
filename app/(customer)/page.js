'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HomeBuah from "@/components/customer/HomeBuah";
import HomeKPangan from "@/components/customer/HomeKPangan";
import HomeTestimoni from "@/components/customer/HomeTestimoni";
import Footer from "@/components/customer/Footer";
import supabase from '@/lib/supabase';
import { useEffect } from "react";

// Komponen Statistik Reusable
const Statistics = ({ stats }) => {

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4">
                {/* Grid untuk mobile dan tablet, flex untuk desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col justify-center items-center py-8 ${index % 2 === 0 && 'border-r border-gray-200' // Border kanan kecuali pada elemen terakhir di setiap baris
                                } ${index >= stats.length - 2 ? 'md:border-none' : '' // Hilangkan border kanan di kolom terakhir untuk tablet
                                }`}
                        >
                            <p className="text-3xl font-bold text-gray-800">{stat.number}</p>
                            <p className="text-gray-600 text-sm mt-2">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Komponen Fitur Reusable
const FeatureGrid = ({ features }) => (
    <section className="px-24 py-8 bg-white">
        <div className="container  mx-auto py-12">
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
                    <div key={index} className="relative group flex flex-col items-center overflow-hidden">
                        <div
                            className="w-full h-[400px] bg-cover bg-center transform group-hover:scale-105 transition duration-300"
                            style={{ backgroundImage: `url(${feature.imageSrc})` }}
                        ></div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                            {feature.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default function CustomerPage() {
    useEffect(() => {
        async function getuser(params) {
            const { data: { user } } = await supabase.auth.getUser()

            console.log("sesi", user);
            console.log("metadata", user.user_metadata);
        }
        getuser()
    }, [])

    const stats = [
        { number: "18,000+", description: "Serving Culinary Businesses" },
        { number: "1,000+", description: "Petani, Peternak, Nelayan" },
        { number: "100+", description: "Produk Hasil Panen" },
        { number: "20th+", description: "Berpengalaman" },
    ];

    const features = [
        { name: "Kupas", imageSrc: "/FE/img01.jpg" },
        { name: "Potong", imageSrc: "/FE/img01.jpg" },
        { name: "Giling", imageSrc: "/FE/img01.jpg" },
        { name: "Bersihkan", imageSrc: "/FE/img01.jpg" },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/FE/img01.jpg')" }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                </div>
                <div className="relative h-full flex items-center px-4">
                    <div className="container mx-auto">
                        <h1 className="text-white font-bold text-5xl md:text-6xl">
                            <span className="block">Sumber Segar</span>
                            <span className="block">Untuk Usaha Anda</span>
                        </h1>
                        <div className="flex items-center gap-2 max-w-lg h-9 mt-14">
                            <Input
                                type="text"
                                placeholder="Cari produk"
                                className="flex-grow rounded-full bg-gray-50 text-gray-500 text-sm px-3 py-2  -gray-50"
                            />
                            <Button className="px-4 py-2 rounded-full bg-rose-600 text-white text-sm font-medium">
                                Cari
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistik Section */}
            <Statistics stats={stats} />

            {/* Business Highlight Section */}
            <section className="py-5 bg-white">
                <div className="container  py-12 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                            Mulai Dari Kedai Kopi Hingga Restoran
                        </h2>
                        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                            Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk
                            Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam
                            Setiap Hidangan.
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-center ${index >= 8 ? "hidden md:flex" : ""}`}
                            >
                                <img
                                    src="/FE/img02.png"
                                    alt={`Icon ${index + 1}`}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Home Buah dan Home KPangan */}
            <main>
                <HomeBuah />
                <HomeKPangan />
            </main>

            {/* Kostumisasi Produk Section */}
            <FeatureGrid features={features} />

            {/* Packing Facilities Section */}
            <section>
                <div className="container  mx-auto px-4 py-8 bg-white">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Fasilitas Distribusi & Packing House
                    </h2>
                    <div className="relative flex justify-center">
                        <img src="/FE/Map.svg" alt="Map of Indonesia" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* Testimoni dan Footer */}
            <main>
                <HomeTestimoni />
                <Footer />
            </main>
        </div>
    );
}
