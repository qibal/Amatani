"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductForm from "@/components/dashboard/product/ProductForm";

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

    const handleEditProduct = async (productData) => {
        console.log('Editing product:', productData);

        const formData = new FormData();
        formData.append('product_id', productData.product_id); // Perbaiki key menjadi 'product_id'
        formData.append('products_name', productData.products_name);
        formData.append('products_description', productData.products_description);
        formData.append('stock', productData.stock);
        formData.append('fixed_price', productData.fixed_price);
        formData.append('price_type', productData.price_type);
        formData.append('category', JSON.stringify(productData.category));
        formData.append('wholesalePrices', JSON.stringify(productData.wholesalePrices));

        productData.product_images.forEach((image) => {
            if (typeof image === 'string') {
                // Skip strings, only append files
                return;
            }
            formData.append('product_images', image);
        });

        try {
            const result = await fetch('/api/dashboard/products/edit', {
                method: 'POST',
                body: formData
            });

            if (!result.ok) {
                const errorData = await result.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const data = await result.json();
            console.log('result =', data);
            console.log('berhasil di Update');
        } catch (error) {
            console.error('Error updating product:', error.message);
            alert(`Error updating product: ${error.message}`);
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

