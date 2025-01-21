"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import FAQForm from "@/components/dashboard/faq/FaqForm";
import { toast, Toaster } from "sonner";

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

    const handleEditFaq = async (params) => {
        console.log('Editing FAQ:', params);

        const formData = new FormData();
        formData.append('faq_id', faq_id);
        formData.append('title', params.title);
        formData.append('content', params.content);
        formData.append('category_id', params.category.category_id);

        try {
            const result = await fetch(`/api/dashboard/faq/edit/`, {
                method: 'POST',
                body: formData
            });

            if (result.ok) {
                const data = await result.json();
                console.log('result =', data);
                console.log('FAQ berhasil diupdate');
                // toast.success("FAQ updated successfully");
            } else {
                const errorData = await result.json();
                console.error('Error:', errorData);
                toast.error("Failed to update FAQ");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to update FAQ");
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
            <Toaster position="top-right" />
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