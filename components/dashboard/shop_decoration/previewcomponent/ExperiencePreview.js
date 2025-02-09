import React, { useEffect, useState } from "react";

export default function ExperiencePreview({ fetchStatistics }) {
    const [stats, setStats] = useState([]);

    // Fungsi untuk mengambil data statistik dari API
    const fetchStatisticsInternal = async () => {
        try {
            const response = await fetch('/api/v2/admin/sd/experience');
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const data = await response.json();
            setStats(data.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    useEffect(() => {
        fetchStatisticsInternal();
    }, []);

    useEffect(() => {
        fetchStatisticsInternal();
    }, [fetchStatistics]);

    return (
        <section className="py-6 w-full">
            <div className="container mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
                        >
                            <p className="text-2xl font-bold text-gray-800">{stat.number}</p>
                            <p className="text-gray-600">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}