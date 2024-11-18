"use client";

import HomeBuah from "@/components/customer/HomeBuah";
import HomeKPangan from "@/components/customer/HomeKPangan";
import { useState } from "react";
import { Search, Menu, X, Globe, ShoppingCart, ArrowDown, AlignJustify, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/customer/Navbar";


export default function CustomerPage() {

    async function fetchData() {
        try {
            const data = await fetchProducts();
            console.log("Data fetched:", data); // Debugging
            if (data) {
                setProducts(data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    }

    const features = [
        { name: "Kupas", imageSrc: "/FE/img01.jpg" },
        { name: "Potong", imageSrc: "/FE/img01.jpg" },
        { name: "Giling", imageSrc: "/FE/img01.jpg" },
        { name: "Bersihkan", imageSrc: "/FE/img01.jpg" },
    ];


    return (
        <div className="relative">

            <Navbar />
            {/* Main Content */}
            <main
                className="h-screen bg-cover bg-center flex items-center justify-end px-4 md:px-16"
                style={{ backgroundImage: "url('/FE/img01.jpg')" }}
            >
                <div className="text-right w-full">
                    {/* Heading */}
                    <h1 className="text-white font-bold leading-tight">
                        <span className="block text-5xl md:text-6xl">Sumber Segar</span>
                        <span className="block text-5xl md:text-6xl">Untuk Usaha Anda</span>
                    </h1>

                    {/* Search Bar */}
                    <div className="mt-8 flex items-center bg-white/80 rounded-full shadow-lg overflow-hidden max-w-md ml-auto">
                        <div className="px-4">
                            <Search className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Cari produk"
                            className="border-none outline-none flex-1 bg-transparent text-gray-700 placeholder-gray-400"
                        />
                        <Button className="rounded-full bg-[#DB2439] text-white px-6 py-2">
                            Cari
                        </Button>
                    </div>
                </div>
            </main>

            <section className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-16">
                    {/* Grid Statistik */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                        {/* Statistik 1 */}
                        <div className="text-center pb-6 lg:pb-0">
                            <h2 className="text-3xl font-bold text-gray-800">18,000+</h2>
                            <p className="text-gray-600 text-sm mt-2">Serving Culinary Businesses</p>
                        </div>
                        {/* Statistik 2 */}
                        <div className="text-center pb-6 lg:pb-0">
                            <h2 className="text-3xl font-bold text-gray-800">1,000+</h2>
                            <p className="text-gray-600 text-sm mt-2">Petani, Peternak, Nelayan</p>
                        </div>
                        {/* Statistik 3 */}
                        <div className="text-center pb-6 lg:pb-0">
                            <h2 className="text-3xl font-bold text-gray-800">100+</h2>
                            <p className="text-gray-600 text-sm mt-2">Produk Hasil Panen</p>
                        </div>
                        {/* Statistik 4 */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800">20th+</h2>
                            <p className="text-gray-600 text-sm mt-2">Berpengalaman</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Bagian Kiri */}
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

                        {/* Bagian Kanan */}
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(12)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-center ${index >= 8 ? 'hidden md:flex' : ''
                                        }`}
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
                </div>
            </section>

            <main>
                <HomeBuah />
            </main>

            <main>
                <HomeKPangan />
            </main>

            <section className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-16">
                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                        Kostumisasi Produk <br /> Sesuai Kebutuhan Usaha Anda.
                    </h2>
                    {/* Subheading */}
                    <div className="flex justify-center mb-8">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Gratis!
                        </span>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                name={feature.name}
                                imageSrc={feature.imageSrc}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
    function FeatureCard({ name, imageSrc }) {
        return (
            <div className="flex flex-col items-center justify-center">
                {/* Gambar */}
                <div
                    className="w-full h-[180px] md:h-[200px] bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                ></div>
                {/* Nama */}
                <div className="mt-4 bg-black text-white text-sm font-semibold py-1 px-3 rounded-full">
                    {name}
                </div>
            </div>
        );
    }
}