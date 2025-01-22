"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductForm from "@/components/dashboard/product/ProductForm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditProductPage({ params }) {
    const router = useRouter();
    const { product_id } = React.use(params);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Log untuk debugging
    console.log('EditProductPage rendered, product_id:', product_id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/dashboard/products/edit/${product_id}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil data produk');
                }
                const data = await response.json();
                console.log('Fetched product data:', data[0]); // Log data produk
                setProduct(data[0]);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
                toast.error("Gagal mengambil data produk");
            } finally {
                setIsLoading(false);
            }
        };

        if (product_id) {
            fetchProduct();
        }
    }, [product_id]);

    const handleEditProduct = async (params) => {
        console.log('handleEditProduct called with params:', params); // Log parameter
        const toastId = toast.loading("Sedang memperbarui produk...");

        try {
            const formData = new FormData();
            formData.append('product_id', params.product_id);
            formData.append('products_name', params.products_name);
            formData.append('products_description', params.products_description);
            formData.append('stock', params.stock);
            formData.append('fixed_price', params.fixed_price);
            formData.append('price_type', params.price_type);
            formData.append('category', JSON.stringify(params.category));
            formData.append('wholesalePrices', JSON.stringify(params.wholesalePrices));

            // Handle existing and new images
            params.product_images.forEach((image) => {
                if (typeof image === 'string') {
                    formData.append('existing_images', image);
                } else {
                    formData.append('product_images', image);
                }
            });

            console.log('FormData created:', Object.fromEntries(formData)); // Log FormData

            const result = await fetch('/api/dashboard/products/edit', {
                method: 'POST',
                body: formData
            });

            const data = await result.json();
            console.log('API response:', data); // Log response

            if (!result.ok) {
                throw new Error(data.message || 'Gagal memperbarui produk');
            }

            toast.success("Produk berhasil diperbarui", { id: toastId });
            router.push('/dashboard/products');
            return { success: true, data };
        } catch (error) {
            console.error('Error in handleEditProduct:', error);
            toast.error(error.message || "Gagal memperbarui produk", { id: toastId });
            return { success: false, message: error.message };
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

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
                                <BreadcrumbPage>Edit Produk</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="mx-auto px-12 pb-10">
                <div className="lg:flex justify-between sm:gap-x-12 xl:gap-x-20">
                    {product ? (
                        <ProductForm
                            mode="edit"
                            product={product}
                            onSubmit={handleEditProduct}
                        />
                    ) : (
                        <div className="text-center">Produk tidak ditemukan</div>
                    )}
                </div>
            </div>
        </div>
    );
}

