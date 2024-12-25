"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectSeparator, SelectValue } from "@/components/ui/select";
import { Trash, Trash2, Upload } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductImageUpload } from "@/components/dashboard/product/DropProductImage";
import Image from "next/image";

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

export default function AddProductPage() {
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



    const price_type = form.watch("price_type");
    console.log('type harga mas', price_type);


    const [images, setimage] = useState([]);



    // Fungsi untuk menambahkan item wholesalePrices
    const addWholesalePrice = () => {
        form.setValue("wholesalePrices", [...form.watch("wholesalePrices"), { min_quantity: 0, max_quantity: 0, price: 0 }]);
    };

    // Fungsi untuk menghapus item wholesalePrices
    const removeWholesalePrice = (index) => {
        const wholesalePrices = form.watch("wholesalePrices");
        if (wholesalePrices.length > 1 && index > 0) {
            wholesalePrices.splice(index, 1);
            form.setValue("wholesalePrices", [...wholesalePrices]);
        }
    };





    // Fungsi untuk navigasi setelah pengiriman data
    const onSubmit = (data) => {
        alert('data berhasil di submit', data)
        // Data yang dikirimkan saat submit
        console.log("Data Form Submitted:", data);
        // Anda dapat menambahkan logika untuk menyimpan data atau mengarahkan pengguna ke halaman lain
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

            <div className="  mx-auto px-12 py-6">
                <div className="lg:flex justify-between  sm:gap-x-12 xl:gap-x-20">
                    {/* Kolom Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-4/6">
                            <div className="   border">
                                {/* Header */}
                                <div className="flex  justify-between items-center -b pb-4">
                                    <h1 className="text-xl font-semibold">Tambah produk</h1>
                                    <div className="flex gap-3">
                                        <Button variant="outline">Cancel</Button>
                                        <Button
                                            variant="default"
                                            type="submit"

                                            className="bg-rose-600 hover:bg-rose-500"
                                        >
                                            Simpan
                                        </Button>
                                    </div>
                                </div>
                                {/* form */}
                                <div className=" container mx-auto space-y-6">

                                    {/* Nama Produk */}
                                    <FormField
                                        control={form.control}
                                        name="products_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Produk</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Pisang muli" {...field} />
                                                </FormControl>
                                                {/* <FormDescription>
                                                    Masukkan nama produk yang akan dijual.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Kategori Produk */}
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
                                                        {/* Pastikan hanya ada satu child untuk SelectContent */}
                                                        <SelectContent>
                                                            <SelectItem value="buah">Buah</SelectItem>
                                                            <SelectItem value="sayur">Sayur</SelectItem>
                                                            <SelectItem value="minuman">Minuman</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                {/* <FormDescription>
                                                    Pilih kategori yang sesuai untuk produk Anda.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Stock */}
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
                                                {/* <FormDescription>
                                                    Masukkan jumlah stok yang tersedia untuk produk ini.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Deskripsi Produk */}
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
                                                {/* <FormDescription>
                                                    Deskripsikan produk Anda secara singkat, seperti fitur, manfaat, atau bahan utama.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Gambar */}
                                    <div className="space-y-2">
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
                                                    {/* <FormMessage className="-pt-1" /> */}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {/* radio piliha harga */}
                                    <div className="space-y-2">
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
                                                    {/* <FormDescription>
                                                    Deskripsikan produk Anda secara singkat, seperti fitur, manfaat, atau bahan utama.
                                                </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>


                                    {price_type === "wholesale" && (
                                        <div className="space-y-2">
                                            {form.watch("wholesalePrices").map((_, index) => (
                                                <div key={index} className="flex gap-2 items-end">
                                                    {/* Min Quantity */}
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

                                                    {/* Max Quantity */}
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

                                                    {/* Harga Grosir */}
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

                                                    {/* Tombol Hapus */}
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
                                    {/* Harga tetap */}
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
                    {/* Kolom Pratinjau Produk card */}
                    <div className="flex flex-col  grow gap-y-10 border">
                        {/* Pratinjau 1 */}
                        {/* <div className="space-y-6">
                            <p className="text-xl font-semibold">Pratinjau Card produk</p>
                            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden flex justify-center items-center">
                                <AspectRatio ratio={1 / 1}>
                                    <img
                                        src={images?.length > 0 ? images[0] : "/FE/img02.png"}
                                        alt="Pratinjau Produk"
                                        className="object-cover w-full h-full"
                                    />
                                </AspectRatio>
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold">Apel Gala</p>
                                <p className="text-sm text-gray-400">Buah buahan</p>
                                <p className="text-base font-bold text-rose-600">Rp 210,000 - Rp 980,000</p>
                            </div>
                        </div>
                        <SelectSeparator /> */}

                        {/* Pratinjau 2 */}
                        <div className="space-y-6 grow">
                            <p className="text-xl font-semibold">Pratinjau Produk</p>
                            <div className="flex flex-col gap-y-4">
                                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden flex justify-center items-center">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image
                                            width={300}
                                            height={300}
                                            src={images?.length > 0 ? images[0] : "/FE/img02.png"}
                                            alt="Pratinjau Produk"
                                            className="object-cover w-full h-full"
                                        />
                                    </AspectRatio>
                                </div>
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {images.slice(1).map((image, index) => (
                                            <div key={index + 1} className="w-24 aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden flex justify-center items-center">
                                                <AspectRatio ratio={1 / 1}>
                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        src={image}
                                                        alt="Pratinjau Produk"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </AspectRatio>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-24 aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden flex justify-center items-center">
                                        <AspectRatio ratio={1 / 1}>
                                            <Image
                                                width={300}
                                                height={300}
                                                src={images?.length > 0 ? images : "/FE/img02.png"}
                                                alt="Pratinjau Produk"
                                                className="object-cover w-full h-full"
                                            />
                                        </AspectRatio>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold">Apel Gala</p>
                                <p className="text-sm text-gray-400">Buah buahan</p>
                                <p className="text-base font-bold text-rose-600">Rp 210,000 - Rp 980,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
