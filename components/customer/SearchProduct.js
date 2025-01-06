'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchHomeCustomer() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?query=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-lg h-9 mt-14">
            <Input
                type="text"
                placeholder="Cari produk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow rounded-full bg-gray-50 text-gray-500 text-sm px-3 py-2"
            />
            <Button
                type="submit"
                className="px-4 py-2 rounded-full bg-rose-600 text-white text-sm font-medium"
            >
                Cari
            </Button>
        </form>
    );
}