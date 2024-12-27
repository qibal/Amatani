import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductImageUpload } from "@/components/dashboard/product/DropProductImage";
import Image from "next/image";
import { Trash2 } from 'lucide-react';

// Zod schema validation
const formSchema = z.object({
    products_name: z.string().min(1, { message: "Tidak boleh kosong" }),
    categories_name: z.string().min(1, { message: "Kategori produk harus dipilih" }),
    stock: z.number().min(1, { message: "Harus lebih dari 0" }),
    produts_description: z.string().min(1, { message: "Tidak boleh kosong" }),
    price_type: z.enum(["fixed", "wholesale"]),
    price: z.number().optional(),
    wholesalePrices: z.array(z.object({
        min_quantity: z.number().min(1, { message: "Harus lebih dari 0" }),
        max_quantity: z.number().min(1, { message: "Harus lebih dari 0" }),
        price: z.number().min(1, { message: "harus lebih dari 0" })
    })).optional(),
    images: z.array(z.any()).min(1, { message: "Setidaknya ada 1 gambar produk" }),
});

const ProductForm = ({ mode, product, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            products_name: "",
            categories_name: "",
            stock: 0,
            produts_description: "",
            price_type: "wholesale",
            price: 0,
            wholesalePrices: [{ min_quantity: 0, max_quantity: 0, price: 0 }],
            images: [],
        },
    });

    useEffect(() => {
        if (mode === 'edit' && product) {
            const formattedProduct = {
                products_name: product.products_name,
                categories_name: product.categories_name,
                stock: product.stock,
                produts_description: product.produts_description,
                price_type: product.price_type,
                price: product.price_type === 'fixed' ? product.fixed_price : 0,
                wholesalePrices: product.price_type === 'wholesale' ? product.wholesale_prices : [{ min_quantity: 0, max_quantity: 0, price: 0 }],
                images: product.images,
            };
            form.reset(formattedProduct);
        }
    }, [mode, product, form]);

    const price_type = form.watch("price_type");

    const addWholesalePrice = () => {
        form.setValue("wholesalePrices", [...form.watch("wholesalePrices"), { min_quantity: 0, max_quantity: 0, price: 0 }]);
    };

    const removeWholesalePrice = (index) => {
        const wholesalePrices = form.watch("wholesalePrices");
        if (wholesalePrices.length > 1 && index > 0) {
            wholesalePrices.splice(index, 1);
            form.setValue("wholesalePrices", [...wholesalePrices]);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-4/6">
                <div className="border">
                    <div className="flex justify-between items-center pb-4">
                        <h1 className="text-xl font-semibold">{mode === 'add' ? 'Tambah Produk' : 'Edit Produk'}</h1>
                        <div className="flex gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button
                                variant="default"
                                type="submit"
                                className="bg-rose-600 hover:bg-rose-500"
                            >
                                {mode === 'add' ? 'Tambah' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </div>
                    <div className="container mx-auto space-y-6">
                        <FormField
                            control={form.control}
                            name="products_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Produk</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Pisang muli" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categories_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori Produk</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="buah">Buah</SelectItem>
                                                <SelectItem value="sayur">Sayur</SelectItem>
                                                <SelectItem value="minuman">Minuman</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="100"
                                            className="flex-1"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (!isNaN(value)) {
                                                    field.onChange(Number(value));
                                                } else {
                                                    field.onChange(0);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="produts_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Produk</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Masukkan Deskripsi Produk"
                                            {...field}
                                            onInput={(e) => {
                                                e.target.style.height = 'auto';
                                                e.target.style.height = `${e.target.scrollHeight}px`;
                                            }}
                                            style={{ overflow: 'hidden' }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type Harga </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="flex space-x-4"
                                        >
                                            <div className={`flex-1 ${price_type === "wholesale" ? "border-gray-600" : "border-gray-200 text-gray-500"} border-2 rounded-md overflow-hidden`}>
                                                <RadioGroupItem value="wholesale" id="wholesale" className="sr-only" />
                                                <Label
                                                    htmlFor="wholesale"
                                                    className={`flex items-center justify-center w-full h-full py-2 px-4 cursor-pointer ${price_type === "wholesale" ? "" : "bg-white hover:bg-gray-50"
                                                        }`}
                                                >
                                                    Harga Grosir
                                                </Label>
                                            </div>
                                            <div className={`flex-1 ${price_type === "fixed" ? "border-gray-600" : "border-gray-200 text-gray-500"} border-2 rounded-md overflow-hidden`}>
                                                <RadioGroupItem value="fixed" id="fixed" className="sr-only" />
                                                <Label
                                                    htmlFor="fixed"
                                                    className={`flex items-center justify-center w-full h-full py-2 px-4 cursor-pointer ${price_type === "fixed" ? "" : "bg-white hover:bg-gray-50"
                                                        }`}
                                                >
                                                    Harga Tetap
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {price_type === "wholesale" && (
                            <div className="space-y-2">
                                {form.watch("wholesalePrices").map((_, index) => (
                                    <div key={index} className="flex gap-2 items-end">
                                        <FormField
                                            control={form.control}
                                            name={`wholesalePrices.${index}.min_quantity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Min Quantity</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Min Jumlah"
                                                            className="flex-1"
                                                            {...field}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (!isNaN(value)) {
                                                                    field.onChange(Number(value));
                                                                } else {
                                                                    field.onChange(0);
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`wholesalePrices.${index}.max_quantity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Max Quantity</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Max Jumlah"
                                                            className="flex-1"
                                                            {...field}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (!isNaN(value)) {
                                                                    field.onChange(Number(value));
                                                                } else {
                                                                    field.onChange(0);
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`wholesalePrices.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Harga</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Harga"
                                                            className="flex-1"
                                                            {...field}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (!isNaN(value)) {
                                                                    field.onChange(Number(value));
                                                                } else {
                                                                    field.onChange(0);
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {form.watch("wholesalePrices").length > 1 && index > 0 && (
                                            <Button type="button" className="bg-white border px-3 hover:bg-gray-100" onClick={() => removeWholesalePrice(index)}>
                                                <Trash2 className="text-gray-900" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" onClick={addWholesalePrice}>
                                    Tambah Variant Harga Grosir
                                </Button>
                            </div>
                        )}
                        {price_type === "fixed" && (
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Harga</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} placeholder="Harga" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;