"use client";

import FaqForm from "@/components/dashboard/faq/FaqForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AddFaqPage() {

    const handleAddFaq = async (params) => {
        console.log('Adding FAQ:', params);

        const formData = new FormData();
        formData.append('title', params.title);
        formData.append('content', params.content);
        formData.append('category_id', params.category.category_id);

        const result = await fetch('/api/dashboard/faq/insert', {
            method: 'POST',
            body: formData
        });

        const data = await result.json();
        console.log('result =', data);
        console.log('FAQ berhasil ditambahkan');
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
                                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="mx-auto px-12 py-6">
                <div className="lg:flex justify-between sm:gap-x-12 xl:gap-x-20">
                    <FaqForm mode="add" onSubmit={handleAddFaq} />
                </div>
            </div>
        </div>
    );
}