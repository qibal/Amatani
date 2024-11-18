"use client";

import HomeBuah from "@/components/customer/HomeBuah";
import HomeKPangan from "@/components/customer/HomeKPangan";
import { useState } from "react";
import { Search, Menu, X, Globe, ShoppingCart, ArrowDown, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button"; // Komponen Button dari shadcn
import { Input } from "@/components/ui/input";

export default function CustomerPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            {/* Navbar */}
            <header className="fixed w-full top-0 left-0 z-50 bg-trbansparent">
                {/* Tingkatan 1 */}
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-16 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-500 w-8 h-8 rounded-md" />
                        <span className="text-white font-bold text-lg">KitaPanen</span>
                    </div>

                    {/* Icon dan Daftar */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-white">
                            <Globe className="w-5 h-5" />
                            <span className="text-sm">Bahasa Indonesia</span>
                        </div>
                        <ShoppingCart className="text-white w-5 h-5 cursor-pointer" />
                        <Button
                            variant="outline"
                            className="bg-[#DB2439] text-white rounded-md px-4 py-2 flex items-center space-x-2 border-none shadow-md hover:bg-[#C22235] transition"
                        >
                            <span>Daftar</span>
                            <ArrowDown className="w-4 h-4" />
                        </Button>

                        <Menu
                            className="w-6 h-6 text-white md:hidden cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        />
                    </div>
                </div>

                {/* Tingkatan 2 */}
                <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-4 md:px-16 py-2 text-sm text-white">
                    {/* Sebelah kiri */}
                    <div className="flex items-center space-x-4">
                        <AlignJustify className="w-5 h-5" />
                        <span>Kategori Produk</span>
                    </div>

                    {/* Sebelah kanan */}
                    <div className="flex items-center space-x-6">
                        <button className="hover:text-gray-300">Tentang Kami</button>
                        <button className="hover:text-gray-300">Pusat Bantuan</button>
                        <button className="hover:text-gray-300">Bekerja Sama</button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black/75 z-50 flex flex-col items-center justify-center space-y-6 text-white">
                        <X
                            className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <button>Kategori Produk</button>
                        <button>Tentang Kami</button>
                        <button>Pusat Bantuan</button>
                        <button>Bekerja Sama</button>
                    </div>
                )}
            </header>

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
        );      }
}


