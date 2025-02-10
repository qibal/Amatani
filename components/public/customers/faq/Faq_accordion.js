"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcnUi/accordion";

export default function FaqAccordion({ searchTerm, selectedCategory }) {
    const [faqItems, setFaqItems] = useState([]);

    // Fungsi untuk mengambil data FAQ dari API
    const fetchFaqs = useCallback(async () => {
        try {
            // Buat URL dengan query parameter
            const url = new URL("/api/v2/public/faq", window.location.origin);

            // Tambahkan parameter kategori jika kategori dipilih (selain "all")
            if (selectedCategory !== "all" && selectedCategory) {
                // Fetch data kategori dari API
                const responseCategory = await fetch(`/api/v2/public/faq/categories`);
                const dataCategory = await responseCategory.json();

                if (dataCategory && dataCategory.success && Array.isArray(dataCategory.data)) {
                    // Cari nama kategori berdasarkan ID
                    const categoryName = dataCategory.data.find(cat => cat.category_id === selectedCategory)?.category_name;

                    if (categoryName) {
                        url.searchParams.append("category", categoryName);
                    }
                }
            }

            // Tambahkan parameter pencarian jika ada
            if (searchTerm) {
                url.searchParams.append("search", searchTerm);
            }

            const response = await fetch(url);
            const data = await response.json();
            console.log("🚀 ~ fetchFaqs ~ data:", data);

            if (data && data.success && Array.isArray(data.data)) {
                setFaqItems(data.data);
            } else {
                console.error("Invalid data format from API");
                setFaqItems([]);
            }
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
            setFaqItems([]);
        }
    }, [searchTerm, selectedCategory]);

    // Efek untuk memanggil fetchFaqs setiap kali searchTerm atau selectedCategory berubah
    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    return (
        <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
                <AccordionItem key={item.faq_id} value={`item-${item.faq_id}`}>
                    <AccordionTrigger className="w-full">{item.title}</AccordionTrigger>
                    <AccordionContent className="w-full">{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}