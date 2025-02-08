'use client';
import React, { useEffect, useState } from "react";

export default function Footer({ fetchTrigger }) {

    const [stats, setStats] = useState([]);

    const fetchStatistics = async () => {
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
        fetchStatistics();
    }, []);

    useEffect(() => {
        fetchStatistics();
    }, [fetchTrigger]); 

    return(
        <section className="bg-white">
            <div className="container mx-auto px-16">
                {/* Grid untuk mobile dan tablet, flex untuk desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center py-8"
                        >
                            <p className="text-3xl font-bold text-gray-800">{stat.number}</p>
                            <p className="text-gray-600 text-sm mt-2">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}