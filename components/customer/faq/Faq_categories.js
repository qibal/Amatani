"use client"

import { Button } from "@/components/ui/button"

const categories = [
    { id: 'all', name: 'Semua Pertanyaan' },
    { id: 'account', name: 'Akun' },
    { id: 'orders', name: 'Pesanan' },
    { id: 'shipping', name: 'Pengiriman' },
    { id: 'returns', name: 'Pengembalian' },
    { id: 'payment', name: 'Pembayaran' },
]

export default function FaqCategories({ onSelectCategory, selectedCategory }) {
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
    )
}

