import React, { useEffect, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
import { Trash2, Loader2 } from 'lucide-react';

// Zod schema validation
const formSchema = z.object({
    products_name: z.string().min(1, { message: "Tidak boleh kosong" }),
    // categories_name: z.string().min(1, { message: "Kategori produk harus dipilih" }),
    category: z.object({
        categories_id: z.string().min(1, { message: "Kategori produk harus dipilih" }),
        categories_name: z.string().min(1, { message: "Kategori produk harus dipilih" }),
    }),
    stock: z.number().min(1, { message: "Harus lebih dari 0" }),
    products_description: z.string().min(1, { message: "Tidak boleh kosong" }),
    price_type: z.enum(["fixed", "wholesale"]),
    fixed_price: z.number().optional(),
    wholesalePrices: z.array(z.object({
        min_quantity: z.number().min(1, { message: "Harus lebih dari 0" }),
        max_quantity: z.number().min(1, { message: "Harus lebih dari 0" }),
        price: z.number().min(1, { message: "harus lebih dari 0" })
    })).optional(),
    product_images: z.array(z.any()).min(1, { message: "Setidaknya ada 1 gambar produk" }),
}).superRefine((data, ctx) => {
    if (data.price_type === 'fixed') {
        if (data.fixed_price === undefined || data.fixed_price <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Harga tetap harus diisi dan lebih besar dari 0",
                path: ["fixed_price"],
            });
        }
    } else if (data.price_type === 'wholesale') {
        if (!data.wholesalePrices || data.wholesalePrices.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Harga grosir harus diisi",
                path: ["wholesalePrices"],
            });
        }
    }
});

export default function ProductForm({ mode, product, onSubmit }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            products_name: "",
            // categories_name: "",
            category: {
                categories_id: "",
                categories_name: "",
            },
            stock: 0,
            products_description: "",
            price_type: "wholesale",
            fixed_price: 0,
            wholesalePrices: [{ min_quantity: 0, max_quantity: 0, price: 0 }],
            product_images: [],
        },
    });

    const price_type = useWatch({
        control: form.control,
        name: "price_type",
    });

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (mode === 'edit' && product) {
            const formattedProduct = {
                products_name: product.products_name,
                // categories_name: product.categories_name,
                category: {
                    categories_id: product.categories_id,
                    categories_name: product.categories_name,
                },
                stock: product.stock,
                products_description: product.products_description,
                price_type: product.price_type,
                fixed_price: product.price_type === 'fixed' ? product.fixed_price : 0,
                wholesalePrices: product.price_type === 'wholesale' ? product.wholesale_prices : [{ min_quantity: 0, max_quantity: 0, price: 0 }],
                product_images: product.product_images,
            };
            form.reset(formattedProduct);
        }
    }, [mode, product, form]);

    useEffect(() => {
        async function GetData() {
            try {
                const response = await fetch('http://localhost:3000/api/dashboard/products/categories');
                const data = await response.json();
                setCategories(data); // Simpan data kategori ke dalam state
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }
        GetData();
    }, []);

    // reset form values and clear errors when price type changes
    useEffect(() => {
        if (price_type === 'fixed') {
            form.setValue("wholesalePrices", []);
            form.clearErrors("wholesalePrices"); // Clear errors for wholesalePrices
        } else if (price_type === 'wholesale') {
            form.setValue("fixed_price", 0);
            form.clearErrors("fixed_price"); // Clear errors for fixed_price
        }
    }, [price_type, form]);

    const [categories, setCategories] = useState([]);

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

    const handleSubmit = (data) => {
        startTransition(async () => {
            try {
                await onSubmit(data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="lg:w-4/6">
                <div className="border">
                    <div className="flex justify-between items-center pb-4">
                        <h1 className="text-xl font-semibold">{mode === 'add' ? 'Tambah Produk' : 'Edit Produk'}</h1>
                        <div className="flex gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button
                                variant="default"
                                type="submit"
                                className="bg-rose-600 hover:bg-rose-500"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {mode === 'add' ? 'Menambahkan...' : 'Menyimpan...'}
                                    </>
                                ) : (
                                    mode === 'add' ? 'Tambah' : 'Simpan Perubahan'
                                )}
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
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori Produk</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                const selectedCategory = categories.find(category => category.categories_id === value);
                                                field.onChange(selectedCategory ? { categories_id: selectedCategory.categories_id, categories_name: selectedCategory.categories_name } : { categories_id: "", categories_name: "" });
                                            }}
                                            value={field.value.categories_id}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(category => (
                                                    <SelectItem key={category.categories_id} value={category.categories_id}>
                                                        {category.categories_name}
                                                    </SelectItem>
                                                ))}
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
                            name="products_description"
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
                            name="product_images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ProductImageUpload
                                            onChange={field.onChange}
                                            value={field.value}
                                            error={form.formState.errors.product_images?.message}
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
                                {form.watch("wholesalePrices").length === 0 && (
                                    <p className="text-gray-400">Minimal ada 1 variant harga</p>
                                )}
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
                                {form.watch("wholesalePrices").length < 3 && (
                                    <Button type="button" onClick={addWholesalePrice}>
                                        Tambah Variant Harga Grosir
                                    </Button>
                                )}
                            </div>
                        )}
                        {price_type === "fixed" && (
                            <FormField
                                control={form.control}
                                name="fixed_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Harga</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Harga"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (!isNaN(value)) {
                                                        field.onChange(Number(value));
                                                    } else {
                                                        field.onChange(0);
                                                    }
                                                }} />
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

