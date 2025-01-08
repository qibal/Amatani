import React from "react";

export default function StatikPreview() {
    const stats = [
        { number: "18,000+", description: "Serving Culinary Businesses" },
        { number: "1,000+", description: "Petani, Peternak, Nelayan" },
        { number: "100+", description: "Produk Hasil Panen" },
        { number: "20th+", description: "Berpengalaman" },
    ];

    return (
        <section className="bg-white">
            <div className="container mx-auto ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center ">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col"
                        >
                            <p className="text-xl md:text-2xl font-bold text-gray-800">
                                {stat.number}
                            </p>
                            <p className="text-gray-600 text-sm md:text-base">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
