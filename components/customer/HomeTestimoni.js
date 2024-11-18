import React from "react";

const testimonials = [
    {
        name: "Iqbal Herlambang",
        username: "@qibal.h",
        message:
            "Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam Setiap Hidangan.",
    },
    {
        name: "Iqbal Herlambang",
        username: "@qibal.h",
        message:
            "Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam Setiap Hidangan.",
    },
    {
        name: "Iqbal Herlambang",
        username: "@qibal.h",
        message:
            "Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam Setiap Hidangan.",
    },
    {
        name: "Iqbal Herlambang",
        username: "@qibal.h",
        message:
            "Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam Setiap Hidangan.",
    },
    {
        name: "Iqbal Herlambang",
        username: "@qibal.h",
        message:
            "Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam Setiap Hidangan.",
    },
    {
        name: "Iqbal Herlambang",
        username: "@qibal.h",
        message:
            "Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam Setiap Hidangan.",
    },
];

export default function HomeTestimoni() {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-16">
                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Disukai oleh Pedagang seperti Anda
                </h2>
                {/* Testimonial Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-gray-100 rounded-lg shadow-md flex flex-col gap-4 ${
                                index >= 4 ? "hidden md:block" : ""
                            }`}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {testimonial.username}
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 21h9m-9-3h9m-9-3h9m-9-3h9m-9-3h9m-9-3h9M4.5 3h15a2.25 2.25 0 012.25 2.25v15A2.25 2.25 0 0119.5 21H4.5A2.25 2.25 0 014.5 3z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* Message */}
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {testimonial.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
