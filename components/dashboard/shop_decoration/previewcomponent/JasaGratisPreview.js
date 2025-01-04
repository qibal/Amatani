import React from "react";

export default function JasaGratisPreview() {
    const features = [
        { name: "Kupas", imageSrc: "/FE/img01.jpg" },
        { name: "Potong", imageSrc: "/FE/img01.jpg" },
        { name: "Giling", imageSrc: "/FE/img01.jpg" },
        { name: "Bersihkan", imageSrc: "/FE/img01.jpg" },
    ];

    return (
        <section className="px-24 py-8 bg-white">
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
                    {features.map(function (feature, index) {
                        return (
                            <div
                                key={index}
                                className="relative group flex flex-col items-center overflow-hidden"
                            >
                                <div
                                    className="w-full h-[400px] bg-cover bg-center transform group-hover:scale-105 transition duration-300"
                                    style={{ backgroundImage: `url(${feature.imageSrc})` }}
                                ></div>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                                    {feature.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
