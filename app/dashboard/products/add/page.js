"use client";

import ProductForm from "@/components/dashboard/product/ProductForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AddProductPage() {


    const handleAddProduct = async (params) => {
        console.log('Adding product:', params);

        const formData = new FormData();
        formData.append('products_name', params.products_name);
        formData.append('products_description', params.products_description);
        formData.append('stock', params.stock);
        formData.append('fixed_price', params.fixed_price);
        formData.append('price_type', params.price_type);
        formData.append('category', JSON.stringify(params.category));
        formData.append('wholesalePrices', JSON.stringify(params.wholesalePrices));

        params.product_images.forEach((image) => {
            formData.append(`product_images`, image);
        });

        const result = await fetch('/api/dashboard/products/insert', {
            method: 'POST',
            body: formData
        });

        const data = await result.json();
        console.log('result =', data);
        console.log('berhasil di upload');
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
                    <ProductForm mode="add" onSubmit={handleAddProduct} />
                </div>
            </div>
        </div>
    );
}