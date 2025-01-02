'use client'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Minus, Plus, Star, Truck } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useTransition } from 'react'
import { createClient } from "@/lib/supabase/server"

import { useRouter } from 'next/navigation'
import { useCart } from "../../Navbar/CartContext"




export default function ProductDetailComponent({ product_id }) {

    const [productsData, setProductsData] = useState(null);
    console.log("🚀 ~ Product ~ productsData:", productsData)


    useEffect(() => {
        async function fetchProducts(product_id) {
            console.log("🚀 ~ fetchProducts ~ product_id:", product_id)
            const result = await fetch(`/api/customer/products/products_detail/${product_id}`, {
                method: "GET",
            });
            if (result.ok) {
                const data = await result.json();
                setProductsData(data[0]); // Assuming data is an array and we need the first item
            }
        }
        fetchProducts(product_id)
    }, [product_id]);

    if (!productsData) {
        return <div>Loading...</div>;
    }

    const images = productsData.images ?
        productsData.images.map((img) => ({
            src: `/${img}`,
            alt: productsData.products_name
        }))
        : []

    return (
        <div className="container mx-auto px-8 py-6">
            <div className="grid gap-4 lg:grid-cols-3 ">
                {/* Image Gallery and Main Image */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="lg:hidden">
                        <h1 className="text-2xl font-bold">{productsData.products_name}</h1>
                        <div className="flex items-center gap-0.5 mt-2">
                            {Array(4).fill(0).map((_, index) => (
                                <Star key={index} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                            <Star className="w-5 h-5 fill-muted text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 ">
                        {/* Main Image */}
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${images[0].src}`} // Gabungkan URL dasar dengan path gambar}
                                alt={images[0].alt}
                                className="object-cover w-full h-full"
                                width={800}
                                height={800}
                            />
                        </AspectRatio>

                        {/* Image Thumbnails */}
                        <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        "relative rounded-lg overflow-hidden w-20 h-20",
                                        index === 0 ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"
                                    )}
                                >
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${image.src}`} // Gabungkan URL dasar dengan path gambar}
                                            alt={image.alt}
                                            className="object-cover w-full h-full"
                                            width={800}
                                            height={800}
                                        />
                                    </AspectRatio>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Card for Mobile */}
                    <div className="lg:hidden mt-4">
                        <ProductInfoCard productsData={productsData} />
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="hidden lg:block">
                            <h1 className="text-3xl font-bold">{productsData.products_name}</h1>
                            <div className="flex items-center gap-0.5 mt-2">
                                {Array(4).fill(0).map((_, index) => (
                                    <Star key={index} className="w-5 h-5 fill-primary text-primary" />
                                ))}
                                <Star className="w-5 h-5 fill-muted text-muted-foreground" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Deskripsi produk</h2>
                            <p className="text-sm text-muted-foreground">
                                {productsData.products_description}
                            </p>
                        </div>

                        {/* Product Attributes Accordion */}
                        <Accordion type="single" collapsible>
                            <AccordionItem value="attributes">
                                <AccordionTrigger>Atribut produk</AccordionTrigger>
                                <AccordionContent>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="py-2">Berat</td>
                                                    <td className="py-2">{productsData.stock}g</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">Kategori</td>
                                                    <td className="py-2">{productsData.categories_name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Reviews Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Nilai dan Ulasan</h2>
                            <div className="space-y-4">
                                {[1, 2].map((review) => (
                                    <div key={review} className="border-b pb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-primary rounded-full" />
                                            <div>
                                                <div className="font-semibold">User{review}</div>
                                                <div className="text-sm text-muted-foreground">14 Nov 2024</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5 mb-2">
                                            {Array(5).fill(0).map((_, index) => (
                                                <Star key={index} className="w-4 h-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                        <p className="text-sm">
                                            barang sampe rumah dengan aman, kualitasnya bagus besar besar
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info Card for Desktop */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-4">
                        <ProductInfoCard productsData={productsData} />
                    </div>
                </div>
            </div>
        </div>
    );
}






const formSchema = z.object({
    quantity: z.number().min(1, "Quantity must be at least 1")
})

function ProductInfoCard({ productsData }) {
    const [isPending, startTransition] = useTransition()
    const { userId, setUserId, fetchCartCount } = useCart()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 1
        }
    })
    const router = useRouter()
    const onSubmit = (data) => {
        startTransition(async () => {
            try {
                const formData = new FormData()
                formData.append('product_id', productsData.product_id)
                formData.append('quantity', data.quantity)

                const response = await fetch('/api/customer/products/products_detail/add_to_cart', {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })

                if (response.status === 401) {
                    router.push('/login')
                    return
                }

                const result = await response.json()
                console.log("🚀 ~ startTransition ~ result:", result)

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to add to cart')
                }

                console.log('Added to cart successfully')
                if (userId) {
                    fetchCartCount(userId)
                } else if (result.data.user_id) {
                    setUserId(result.data.user_id)
                    fetchCartCount(result.data.user_id)
                }
            } catch (error) {
                console.error('Error adding to cart:', error)
            }
        })
    }

    const handleMinus = () => {
        const currentValue = form.getValues("quantity")
        if (currentValue > 1) {
            form.setValue("quantity", currentValue - 1)
        }
    }

    const handlePlus = () => {
        const currentValue = form.getValues("quantity")
        form.setValue("quantity", currentValue + 1)
    }

    const handleChange = (e) => {
        const value = e.target.value
        if (/^\d*$/.test(value) && value !== '') {
            const numValue = parseInt(value)
            if (numValue >= 1) {
                form.setValue("quantity", numValue)
            }
        }
    }
    const wholesalePrices = Array.isArray(productsData?.wholesale_prices)
        ? productsData.wholesale_prices
        : []

    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className="grid grid-cols-3  gap-4 text-center ">
                    {productsData.price_type === 'fixed' ? (
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">
                                Harga
                            </div>
                            <div className="font-semibold">
                                Rp {productsData.fixed_price}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {wholesalePrices.map((price, index) => (
                                <div key={index}>
                                    <div className="text-sm text-muted-foreground">
                                        {price.min_quantity} - {price.max_quantity} kg
                                    </div>
                                    <div className="font-semibold">
                                        Rp {price.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleMinus}
                                className="w-14 h-10"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={handleChange}
                                                className="text-center h-10"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handlePlus}
                                className="w-14 h-10"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button
                                type="submit"
                                className="w-full h-10 bg-red-500 hover:bg-red-600"
                                disabled={isPending}
                            >
                                {isPending ? "Adding..." : "Tambah Ke Keranjang"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-10"
                            >
                                Tambah Ke Favorit
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="text-sm text-muted-foreground text-center">
                    Lakukan Pembayaran di Keranjang
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Dikirim dari gudang Tangerang</span>
                </div>
            </div>
        </Card>
    )
}