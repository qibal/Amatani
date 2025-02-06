'use client'
import { Button } from "@/components/shadcnUi/button"
import { Card } from "@/components/shadcnUi/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Minus, Plus, Search, Star, Truck, X } from 'lucide-react'
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcnUi/form"
import { Input } from "@/components/shadcnUi/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from "../../Navbar/CartContext"
import CarouselWithThumbnails from "./CarouselImages"
import { Separator } from "@/components/shadcnUi/separator"

export default function ProductDetailComponent({ product_id }) {

    const [productsData, setProductsData] = useState(null);
    console.log("🚀 ~ Product ~ productsData:", productsData)

    useEffect(() => {
        async function fetchProducts(product_id) {
            console.log("🚀 ~ fetchProducts ~ product_id:", product_id)
            const result = await fetch(`/api/customer/products/products_detail/${product_id}`);
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

    // Pemetaan gambar untuk digabungkan dengan URL Supabase
    const images = productsData.images
        ? productsData.images.map((img) => ({
            src: `https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${img}`, // Gabungkan URL dasar dengan path gambar
            alt: productsData.products_name,
        }))
        : [];

    return (
        <div className="container mx-auto px-16 py-6">
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

                    {/* Carousel with Thumbnails */}
                    <CarouselWithThumbnails images={images} />

                    {/* Product Info Card for Mobile */}
                    <div className="lg:hidden mt-4">
                        <ProductInfoCard productsData={productsData} />
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="hidden lg:block">
                            <h1 className="text-3xl font-bold">{productsData.products_name}</h1>
                            {/* <div className="flex items-center gap-0.5 mt-2">
                                {Array(4).fill(0).map((_, index) => (
                                    <Star key={index} className="w-5 h-5 fill-primary text-primary" />
                                ))}
                                <Star className="w-5 h-5 fill-muted text-muted-foreground" />
                            </div> */}
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
                                                    <td className="py-2">Stock</td>
                                                    <td className="py-2">{productsData.stock}</td>
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
                            {/* <div className="space-y-4">
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
                            </div> */}
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
    const [searchQuery, setSearchQuery] = useState('');
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
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?products=${encodeURIComponent(searchQuery)}`;
        }
    };
    const wholesalePrices = Array.isArray(productsData?.wholesale_prices)
        ? productsData.wholesale_prices
        : []

    return (
        <div className="w-full max-w-lg mx-auto p-4 ">
            {/* Search Section */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-grow lg:flex-grow-0 w-full lg:w-auto mb-12">
                <div className="relative flex items-center w-full lg:w-[300px]">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-8 rounded-full"
                    />
                    <Button
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                    >
                        <X className="h-4 w-4 text-gray-950" />
                    </Button>
                </div>

                <Button type="submit" className="bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-full">
                    <Search className="w-4 h-4 mr-2" />
                    Cari
                </Button>
            </form>
            <div className="flex flex-col justify-start items-center w-full gap-10 bg-white rounded-lg">
                {/* Price Tiers */}
                <div className="flex flex-col justify-start items-center w-full gap-6">
                    <div className="grid grid-cols-3 gap-4 text-center w-full">
                        {productsData.price_type === 'fixed' ? (
                            <div className="col-span-3 text-center">
                                <div className="text-sm text-muted-foreground">
                                    Harga
                                </div>
                                <div className="font-semibold">
                                    Rp {productsData.fixed_price}
                                </div>
                            </div>
                        ) : (
                            wholesalePrices.map((price, index) => (
                                <div key={index}>
                                    <div className="text-sm text-muted-foreground">
                                        {price.max_quantity === null ? `> ${price.min_quantity} kg` : `${price.min_quantity} - ${price.max_quantity === Infinity ? '∞' : price.max_quantity} kg`}                                    </div>
                                    <div className="font-semibold">
                                        Rp {price.price}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Separator className="w-full" />
                </div>

                {/* Quantity Selector and Action Buttons */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <div className="flex items-center gap-2 pb-5">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleMinus}
                                className="w-14 h-10 "
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

                        <div className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base bg-rose-600 hover:bg-rose-700 rounded-full"
                                disabled={isPending}
                            >
                                {isPending ? "Adding..." : "Tambah Ke Keranjang"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 text-base rounded-full"
                            >
                                Tambah Ke Favorit
                            </Button>
                        </div>
                    </form>
                </Form>

                {/* Shipping Info */}
                <div className="flex justify-start items-center w-full gap-3 text-gray-500">
                    <Truck className="w-4 h-4" />
                    <p className="text-sm">Dikirim dari gudang Tanggerang</p>
                </div>
            </div>
        </div>
    )
}