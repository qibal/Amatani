"use client"

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import supabase from '@/lib/supabase';

export default function faq() {

    const [faqData, setfaqdata] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            let { data: faq, error } = await supabase
                .from('faq')
                .select('*')
            setfaqdata(faq)
            console.log(faq)
        }
        fetchPosts()
    }, [])

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqData.map((faq) => (
                    <div key={faq.faq_id} className="border rounded-lg shadow-md">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                        >
                            <p>{faq.faq_id}{faq.created_at}</p>
                            <h3 className="text-lg font-semibold">{faq.title}</h3>
                            <p>{faq.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}