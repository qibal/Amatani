"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function FaqCategories({ onSelectCategory, selectedCategory }) {
    const [categories, setCategories] = useState([]);

    // Ambil data kategori dari API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/customer/faq");
                const data = await response.json();

                // Ambil kategori unik
                const uniqueCategories = [
                    { id: "all", name: "Semua Pertanyaan" }, // Tambahkan opsi "Semua"
                    ...Array.from(new Set(data.map(faq => faq.category_name))).map(category => ({
                        id: category,
                        name: category.charAt(0).toUpperCase() + category.slice(1), // Format nama kategori
                    })),
                ];

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-4">Kategori</h2>
            {categories.map((category) => (
                <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onSelectCategory(category.id)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    );
}
