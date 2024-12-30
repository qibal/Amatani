"use client"

import { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// Dummy data berdasarkan schema yang diberikan, dengan tambahan field kategori
const dummyFaqData = [
    {
        faq_id: 1,
        title: "Bagaimana cara membuat akun?",
        content: "Untuk membuat akun, klik tombol 'Daftar' di pojok kanan atas halaman. Isi formulir dengan informasi yang diperlukan dan ikuti petunjuk yang diberikan.",
        category: "account",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
    },
    {
        faq_id: 2,
        title: "Berapa lama waktu pengiriman?",
        content: "Waktu pengiriman biasanya memakan waktu 3-5 hari kerja untuk pesanan domestik dan 7-14 hari kerja untuk pesanan internasional.",
        category: "shipping",
        created_at: "2023-01-02T00:00:00Z",
        updated_at: "2023-01-02T00:00:00Z",
    },
    {
        faq_id: 3,
        title: "Apakah Anda menyediakan pengiriman internasional?",
        content: "Ya, kami menyediakan pengiriman internasional ke sebagian besar negara. Biaya pengiriman dan waktu pengiriman dapat bervariasi tergantung pada tujuan.",
        category: "shipping",
        created_at: "2023-01-03T00:00:00Z",
        updated_at: "2023-01-03T00:00:00Z",
    },
    {
        faq_id: 4,
        title: "Bagaimana cara melacak pesanan saya?",
        content: "Setelah pesanan Anda dikirim, Anda akan menerima nomor pelacakan melalui email. Anda dapat menggunakan nomor ini untuk melacak paket Anda di situs web kami atau situs web kurir.",
        category: "orders",
        created_at: "2023-01-04T00:00:00Z",
        updated_at: "2023-01-04T00:00:00Z",
    },
    {
        faq_id: 5,
        title: "Metode pembayaran apa yang Anda terima?",
        content: "Kami menerima kartu kredit utama (Visa, MasterCard, American Express), PayPal, dan transfer bank.",
        category: "payment",
        created_at: "2023-01-05T00:00:00Z",
        updated_at: "2023-01-05T00:00:00Z",
    },
    {
        faq_id: 6,
        title: "Bagaimana cara mengembalikan barang?",
        content: "Untuk mengembalikan barang, masuk ke akun Anda, pilih pesanan yang ingin Anda kembalikan, dan ikuti petunjuk pengembalian. Pastikan barang dalam kondisi asli dan belum digunakan.",
        category: "returns",
        created_at: "2023-01-06T00:00:00Z",
        updated_at: "2023-01-06T00:00:00Z",
    },
]

export default function FaqAccordion({ searchTerm, selectedCategory }) {
    const [faqItems, setFaqItems] = useState(dummyFaqData)

    useEffect(() => {
        let filteredItems = dummyFaqData

        if (selectedCategory !== 'all') {
            filteredItems = filteredItems.filter(item => item.category === selectedCategory)
        }

        if (searchTerm) {
            filteredItems = filteredItems.filter(
                item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFaqItems(filteredItems)
    }, [searchTerm, selectedCategory])

    return (
        <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
                <AccordionItem key={item.faq_id} value={`item-${item.faq_id}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

