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
            <div className="container mx-auto px-4">
                {/* Grid untuk mobile dan tablet, flex untuk desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map(function (stat, index) {
                        return (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center py-8"
                            >
                                <p className="text-3xl font-bold text-gray-800">{stat.number}</p>
                                <p className="text-gray-600 text-sm mt-2">{stat.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
