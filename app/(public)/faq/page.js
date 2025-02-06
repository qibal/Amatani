"use client"

import FaqAccordion from '@/components/customers/faq/Faq_accordion'
import FaqCategories from '@/components/customers/faq/Faq_categories'
import FaqSearch from '@/components/customers/faq/Faq_search'
import WhatsappCards from '@/components/customers/faq/Whatssap_card'
import { useState } from 'react'

export default function FaqPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <FaqCategories onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                </div>
                <div className="md:col-span-3">
                    <FaqSearch onSearch={setSearchTerm} />
                    <WhatsappCards />
                    <FaqAccordion searchTerm={searchTerm} selectedCategory={selectedCategory} />
                </div>
            </div>
        </div>
    )
}

