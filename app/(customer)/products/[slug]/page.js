import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductDetails() {
    return (
        <div className="container mx-auto px-4 lg:px-8 py-8">
            {/* Layout Utama */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Bagian Kiri - Gambar Thumbnail */}
                <div className="hidden lg:flex flex-col gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200"
                        >
                            <Image
                                src="/buah-buahan/img02.png"
                                alt={`Thumbnail ${i + 1}`}
                                className="object-cover rounded-md"
                                width={64}
                                height={64}
                            />
                        </div>
                    ))}
                </div>

                {/* Bagian Tengah - Gambar Utama */}
                <div className="flex-1">
                    <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <Image
                            src="/buah-buahan/img02.png"
                            alt="Gambar Utama"
                            className="object-contain rounded-md"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>

                {/* Bagian Kanan - Detail Produk */}
                <div className="flex-1 space-y-6">
                    {/* Harga Berdasarkan Berat */}
                    <div className="flex justify-between items-center space-x-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">2 - 19 kg</p>
                            <p className="text-xl font-bold text-gray-900">Rp 10.000</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">20 - 99 kg</p>
                            <p className="text-xl font-bold text-gray-900">Rp 9.500</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">≥ 100 kg</p>
                            <p className="text-xl font-bold text-gray-900">Rp 9.000</p>
                        </div>
                    </div>

                    {/* Kontrol Jumlah */}
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="w-12 h-12">
                            -
                        </Button>
                        <input
                            type="text"
                            value="100"
                            readOnly
                            className="w-16 text-center border border-gray-300 rounded-md"
                        />
                        <Button variant="outline" className="w-12 h-12">
                            +
                        </Button>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="space-y-4">
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center">
                            <ShoppingCart className="mr-2" />
                            Tambah Ke Keranjang
                        </Button>
                        <Button variant="outline" className="w-full flex items-center justify-center">
                            <Heart className="mr-2 text-red-500" />
                            Tambah Ke Favorit
                        </Button>
                    </div>

                    {/* Informasi Tambahan */}
                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-500">Lakukan Pembayaran di Keranjang</p>
                        <p className="text-sm text-gray-500">
                            <span className="mr-1">📦</span>Dikirim dari gudang Tangerang
                        </p>
                    </div>
                </div>
            </div>

            {/* Deskripsi Produk */}
            <div className="mt-12 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Deskripsi Produk</h3>
                <p className="text-gray-700">
                    Desain berpori dan nyaman: sepatu berjalan kami menghadirkan desain bersirkulasi,
                    memastikan pengalaman aus yang nyaman bagi pengguna, terutama untuk jalan-jalan jauh
                    selama musim panas dan musim semi.
                </p>
                <p className="text-gray-700">
                    Sol dalam yang lembut dan empuk: sepatunya memiliki Sol dalam yang lembut dan empuk yang
                    terbuat dari kain katun, memberikan kenyamanan dan dukungan yang sangat baik untuk kaki
                    Anda.
                </p>
                <p className="text-gray-700">
                    Ideal untuk berbagai Musim: sepatu cocok untuk berbagai musim, termasuk musim dingin,
                    musim panas, musim semi, dan musim gugur, membuat mereka investasi yang bagus untuk
                    lemari pakaian Anda.
                </p>
            </div>

            {/* Atribut Produk */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">Atribut Produk</h3>
                <div className="bg-gray-100 p-4 rounded-lg mt-2 border border-gray-300">Table</div>
            </div>
        </div>
    );
}
