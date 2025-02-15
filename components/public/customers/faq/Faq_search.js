"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/shadcnUi/input"
import { Search } from 'lucide-react'

export default function FaqSearch({ onSearch }) {
    const [search, setSearch] = useState('')

    // Efek untuk memanggil onSearch setiap kali nilai search berubah
    useEffect(() => {
        onSearch(search);
    }, [search, onSearch]);

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
    }

    return (
        <div className="relative mb-8">
            <Input
                type="text"
                placeholder="Cari FAQ..."
                value={search}
                onChange={handleSearch}
                className="w-full h-14 pl-12 text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        </div>
    )
}