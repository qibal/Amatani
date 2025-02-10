"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/shadcnUi/button";

export default function FaqCategories({ onSelectCategory, selectedCategory }) {
    const [categories, setCategories] = useState([]);

    // Ambil data kategori dari API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/v2/public/faq/categories");
                const data = await response.json();
                console.log("🚀 ~ fetchCategories ~ data:", data)

                if (data && data.success && Array.isArray(data.data)) {
                    // Map data dari API ke format yang sesuai
                    const formattedCategories = [
                        {
                            category_id: "all",
                            category_name: "Semua Pertanyaan",
                        },
                        ...data.data.map(category => ({
                            category_id: category.category_id,
                            category_name: category.category_name,
                        }))
                    ];
                    setCategories(formattedCategories);
                } else {
                    console.error("Invalid data format from API");
                    setCategories([]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, [onSelectCategory, selectedCategory]);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-4">Kategori</h2>
            {categories.map((category) => (
                <Button
                    key={category.category_id}
                    variant={selectedCategory === category.category_id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onSelectCategory(category.category_id)}
                >
                    {category.category_name}
                </Button>
            ))}
        </div>
    );
}