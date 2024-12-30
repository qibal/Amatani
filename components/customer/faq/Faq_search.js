"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export default function FaqSearch({ onSearch }) {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        onSearch(value)
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

