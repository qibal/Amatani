"use client"
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function faq() {

    const [faqData, setfaqdata] = useState([]); //usestate tidk null - array, nu koneng bebas ngaranna

    useEffect(() => {
        async function fetchPosts() {
            let res = await fetch('https://xmlmcdfzbwjljhaebzna.supabase.co/rest/v1/faq', {
                method: "GET",
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbG1jZGZ6YndqbGpoYWViem5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MzExOTEsImV4cCI6MjA0ODQwNzE5MX0.xpWPOds_NZcssbR_XkhepiNmP0FzccKC80xu9quiu0I",
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbG1jZGZ6YndqbGpoYWViem5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MzExOTEsImV4cCI6MjA0ODQwNzE5MX0.xpWPOds_NZcssbR_XkhepiNmP0FzccKC80xu9quiu0I"
                }
            })
            let data = await res.json()
            setfaqdata(data)
            console.log(data)
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