'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ProductImageUpload } from './product-image-upload'

// Definisikan skema validasi menggunakan Zod
const formSchema = z.object({
    name: z.string().min(1, { message: "Product name is required" }),
    price: z.string().min(1, { message: "Price is required" }).refine((val) => !isNaN(Number(val)), {
        message: "Price must be a valid number",
    }),
    images: z.array(z.any()).min(1, { message: "At least one product image is required" }),
})

export function ProductForm() {
    // Inisialisasi form dengan react-hook-form dan validasi menggunakan Zod
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "",
            images: [],
        },
    })

    // Fungsi untuk menangani pengiriman form
    function onSubmit(values) {
        console.log(values)
        // Biasanya, data form dikirim ke backend di sini
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Form input untuk nama produk */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed for your product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Form input untuk harga produk */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter price" type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the price of your product in your local currency.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Form untuk upload gambar produk */}
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ProductImageUpload
                                    onChange={field.onChange}
                                    value={field.value}
                                    error={form.formState.errors.images?.message}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tombol kirim */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
