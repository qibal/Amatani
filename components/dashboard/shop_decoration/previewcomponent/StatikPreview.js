import React, { useEffect, useState } from "react";

export default function StatikPreview({ fetchStatistics }) {
    const [stats, setStats] = useState([]);

    const fetchStatisticsInternal = async () => {
        try {
            const response = await fetch('/api/dashboard/shop_decoration/statistics');
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const data = await response.json();
            setStats(data);
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
        <section className="bg-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col">
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