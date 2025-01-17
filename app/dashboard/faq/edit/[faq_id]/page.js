"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import FAQForm from "@/components/dashboard/faq/FaqForm";

export default function EditFaqPage() {
    const router = useRouter();
    const { faq_id } = useParams();
    const [faq, setFaq] = useState(null);

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const response = await fetch(`/api/dashboard/faq/edit/${faq_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQ');
                }
                const data = await response.json();
                setFaq(data);
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                alert('Failed to fetch FAQ');
            }
        };
        fetchFaq();
    }, [faq_id]);

    const handleEditFaq = async (faqData) => {
        try {
            const formData = new FormData();
            formData.append('faq_id', faq_id);
            formData.append('title', faqData.title);
            formData.append('content', faqData.content);
            formData.append('category_id', faqData.category.category_id);
            formData.append('category_name', faqData.category.category_name);

            const response = await fetch('/api/dashboard/faq/edit', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update FAQ');
            }

            const result = await response.json();
            console.log('FAQ updated successfully:', result);
            router.push('/dashboard/faq');
        } catch (error) {
            console.error('Error updating FAQ:', error);
            alert('Failed to update FAQ');
        }
    };

    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard/faq">FAQ</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit FAQ</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="mx-auto px-12 pb-10">
                <div className="lg:flex justify-between sm:gap-x-12 xl:gap-x-20">
                    {faq ? (
                        <FAQForm mode="edit" faq={faq} onSubmit={handleEditFaq} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}