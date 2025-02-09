"use client";

import ProductForm from "@/components/dashboard/product/ProductForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcnUi/breadcrumb";
import { Separator } from "@/components/shadcnUi/separator";
import { SidebarTrigger } from "@/components/shadcnUi/sidebar";

import { toast, Toaster } from "sonner"; // P9260

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
    
        const maxRetries = 3;
        let attempt = 0;
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
        while (attempt < maxRetries) {
            try {
                const result = await fetch('/api/v2/admin/products', {
                    method: 'POST',
                    body: formData
                });
    
                const data = await result.json();
    
                if (result.ok) {
                    toast.success("Produk berhasil ditambahkan");
                    return { success: true, data };
                }
    
                throw new Error(data.message || "Gagal menambahkan produk");
            } catch (error) {
                attempt++;
                console.error(`Attempt ${attempt} failed:`, error);
    
                if (attempt === maxRetries) {
                    toast.error("Gagal menambahkan produk setelah beberapa percobaan");
                    return { success: false, message: error.message };
                }
    
                await delay(1000 * attempt); // Exponential backoff
            }
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
                                <BreadcrumbLink href="#">Produk</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Tambah Produk</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <Toaster position="top-right" />
            <div className="mx-auto px-12 py-6">
                <div className="lg:flex justify-between sm:gap-x-12 xl:gap-x-20">
                    <ProductForm mode="add" onSubmit={handleAddProduct} />
                </div>
            </div>
        </div>
    );
}