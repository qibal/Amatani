'use client';
import { useState } from 'react';
import { Button } from "@/components/shadcnUi/button"
import { Input } from "@/components/shadcnUi/input"
import { useRouter } from 'next/navigation';

export default function SearchHomeCustomer() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-3xl h-9 mt-14">
            <Input
                type="text"
                placeholder="Cari produk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow rounded-full bg-gray-50 text-gray-500 text-sm px-3 py-2 w-full"
            />
            <Button
                type="submit"
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium"
            >
                Cari
            </Button>
        </form>
    );
}
