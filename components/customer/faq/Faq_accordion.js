"use client";

import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqAccordion({ searchTerm, selectedCategory }) {
    const [faqItems, setFaqItems] = useState([]);

    // Ambil data FAQ dari API
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch("/api/dashboard/faq");
                const data = await response.json();

                // Filter berdasarkan kategori
                const filteredItems = data.filter(faq =>
                    (selectedCategory === "all" || faq.category_name === selectedCategory) &&
                    (faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        faq.content.toLowerCase().includes(searchTerm.toLowerCase()))
                );

                setFaqItems(filteredItems);
            } catch (error) {
                console.error("Failed to fetch FAQs:", error);
            }
        };

        fetchFaqs();
    }, [searchTerm, selectedCategory]);

    return (
        <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
                <AccordionItem key={item.faq_id} value={`item-${item.faq_id}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
