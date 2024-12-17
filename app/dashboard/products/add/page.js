"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectSeparator, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import MultiImageUploader from "@/components/dashboard/product/InputDropZone/MultiImageUploader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Zod schema validation
const formSchema = z.object({
    namaProduk: z.string().min(1, { message: "Nama produk tidak boleh kosong" }),
    kategoriProduk: z
        .string()
        .min(1, { message: "Kategori produk harus dipilih" })
        .refine((val) => ["buah", "sayur", "minuman"].includes(val), {
            message: "Kategori produk yang dipilih tidak valid",
        }),
    stock: z.number().min(1, { message: "Stock produk harus lebih dari 0" }),
    deskripsiProduk: z.string().min(1, { message: "Deskripsi produk tidak boleh kosong" }),
    stockMin: z.number().min(1, { message: "Jumlah min tidak boleh kurang dari 1" }),
    stockMax: z.number().min(1, { message: "Harga max tidak boleh kurang dari 1" }),
    harga: z.number().min(1, { message: "Harga produk tidak boleh kurang dari 1" }),
    // hargaMaxGreaterThanMin: z
    //     .boolean()
    //     .refine((value, ctx) => {
    //         const hargaMin = ctx.parent.hargaMin;
    //         const hargaMax = ctx.parent.hargaMax;
    //         if (hargaMax <= hargaMin) {
    //             return false;
    //         }
    //         return true;
    //     }, { message: "Harga max harus lebih besar dari harga min" }),
});

export default function AddProductPage() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            namaProduk: "",
            kategoriProduk: "",
            stock: 0,
            deskripsiProduk: "",
            stockMin: 0,
            stockMax: 0,
            harga: 0,
        },
    });
    const onSubmit = (data) => {
        // Data yang dikirimkan saat submit
        console.log("Data Form Submitted:", data);
        // Anda dapat menambahkan logika untuk menyimpan data atau mengarahkan pengguna ke halaman lain
    };

    const [images, setimage] = useState([]);
    const router = useRouter();

    // Fungsi untuk navigasi setelah pengiriman data
    function SimpanData(data) {
        console.log('Form Data:', data); // Tampilkan data form yang valid
        router.push('/dashboard');
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

            <div className="p-6 container mx-auto space-y-6">
                <div className="lg:flex justify-between sm:gap-x-4 xl:gap-x-20">
                    {/* Kolom Form */}
                    <div className="space-y-6 lg:w-4/6">
                        {/* Header */}
                        <div className="flex justify-between items-center -b pb-4">
                            <h1 className="text-xl font-semibold">Tambah produk</h1>
                            <div className="flex gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button
                                    variant="default"
                                    onClick={form.handleSubmit(SimpanData)} // Panggil handleSubmit yang mengarah ke SimpanData
                                    className="bg-rose-600 hover:bg-rose-500"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </div>
                        <div className="p-6 container mx-auto space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(SimpanData)} className="space-y-8">
                                    {/* Nama Produk */}
                                    <FormField
                                        control={form.control}
                                        name="namaProduk"
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
                                        name="kategoriProduk"
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
                                        name="deskripsiProduk"
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
                                        <FormLabel>Gambar Produk</FormLabel>
                                        <MultiImageUploader image={setimage} />
                                        {/* <FormDescription>
                                            Unggah gambar produk untuk memberikan gambaran visual kepada pembeli.
                                        </FormDescription> */}
                                    </div>

                                    {/* Harga */}
                                    <div className="space-y-2">
                                        <Label>Harga Grosir</Label>
                                        <div className="flex gap-2">
                                            {/* Harga Min */}
                                            <FormField
                                                control={form.control}
                                                name="stockMin"
                                                render={({ field }) => (
                                                    <FormItem>
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
                                                        <FormDescription>
                                                            Minimal barang
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* <span className="flex items-center justify-center text-gray-500">=</span> */}
                                            {/* Harga Max */}
                                            <FormField
                                                control={form.control}
                                                name="stockMax"
                                                render={({ field }) => (
                                                    <FormItem>
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
                                                        <FormDescription>
                                                            Maksimal barang
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {/* <span className="flex items-center justify-center text-gray-500">=</span> */}
                                            {/* Harga Produk */}
                                            <FormField
                                                control={form.control}
                                                name="harga"
                                                render={({ field }) => (
                                                    <FormItem>
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
                                                        <FormDescription>
                                                            Harga produk
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button variant="outline" className="mt-2">
                                            Tambah Harga
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>

                    {/* Kolom Pratinjau Produk card */}
                    <div className="flex flex-col grow gap-y-10">
                        {/* Pratinjau 1 */}
                        <div className="space-y-6">
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
                        <SelectSeparator />

                        {/* Pratinjau 2 */}
                        <div className="space-y-6 grow">
                            <p className="text-xl font-semibold">Pratinjau Android</p>
                            <div className="flex flex-col gap-y-4">
                                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden flex justify-center items-center">
                                    <AspectRatio ratio={1 / 1}>
                                        <img
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
                                                    <img
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
                                            <img
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
        </div>
    );
}
