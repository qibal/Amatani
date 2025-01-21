"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductForm from "@/components/dashboard/product/ProductForm";
import { toast, Toaster } from "sonner";

export default function EditProductPage({ params }) {
    const router = useRouter();
    const { product_id } = React.use(params)
    // const { productId } = useParams();
    const [product, setProduct] = useState(null);
    console.log("🚀 ~ EditProductPage ~ product:", product)

    useEffect(() => {
        // Fetch product data by productId
        const fetchProduct = async () => {
            const response = await fetch(`/api/dashboard/products/edit/${product_id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [product_id]);

    const handleEditProduct = async (params) => {
        console.log('Editing product:', params);

        const formData = new FormData();
        formData.append('product_id', params.product_id);
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

        try {
            const result = await fetch('/api/dashboard/products/edit', {
                method: 'POST',
                body: formData
            });

            if (result.ok) {
                const data = await result.json();
                console.log('result =', data);
                console.log('berhasil di update');
                toast.success("Product updated successfully");
            } else {
                const errorData = await result.json();
                console.error('Error:', errorData);
                toast.error("Failed to update product");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to update product");
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
                                <BreadcrumbPage>Edit Produk</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <Toaster position="top-right" />
            <div className="mx-auto px-12 pb-10">
                <div className="lg:flex justify-between sm:gap-x-12 xl:gap-x-20">
                    {product && product.length > 0 ? (
                        <ProductForm mode="edit" product={product[0]} onSubmit={handleEditProduct} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

