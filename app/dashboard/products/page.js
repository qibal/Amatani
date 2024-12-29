"use client";
import { useState, useEffect } from "react"; // Tambahkan useEffect
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus, SortDesc, Search, X } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useForm } from "react-hook-form"; // Pastikan ini diimpor
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import ManageCategoriesDialog from "@/components/dashboard/product/CategoryDialog";

// Komponen Reusable untuk Rentang Harga
const PriceRange = ({ label, price }) => (
    <div className="flex flex-col items-center">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-black">{price}</p>
    </div>
);

// Komponen Reusable untuk Tombol Tindakan
const ActionButtons = (product_id) => {

    async function HandleDelete(params) {
        // console.log(params);
        try {
            const response = await fetch(`/api/dashboard/products/delete/${params.product_id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data) {
                console.log('data =', data);
                console.log("berhasil delte");
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }

    return (
        <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-md">
                <Edit className="w-4 h-4 mr-2" />
                Edit
            </Button>
            <Button onClick={() => HandleDelete(product_id)} variant="outline" className="flex items-center justify-center w-9 h-9 rounded-md">
                <Trash className="w-5 h-5" />
            </Button>
        </div>
    )
}

// Komponen Reusable untuk Card Produk
const ProductCard = ({ product }) => {
    // Menentukan harga berdasarkan price_type
    let priceRanges;

    if (product.price_type === 'wholesale' && product.wholesale_prices) {
        // Jika price_type adalah wholesale, buat rentang harga dari wholesale_prices
        priceRanges = product.wholesale_prices.map((price, index) => (
            <PriceRange key={index} label={`${price.min_quantity} - ${price.max_quantity}`} price={`Rp ${price.price}`} />
        ));
    } else if (product.price_type === 'fixed') {
        // Jika price_type adalah fixed, tampilkan harga tetap
        priceRanges = (
            <PriceRange label="Harga Tetap" price={`Rp ${product.fixed_price}`} />
        );
    }

    return (
        <div className="flex items-center p-4 sm:p-6 border rounded-lg border-gray-300 gap-6">
            {/* Gambar Produk */}
            <div className="w-24 h-24 bg-gray-200 rounded-lg">
                <Image
                    width={200}
                    height={200}
                    src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${product.images[0]}`} // Gabungkan URL dasar dengan path gambar
                    alt={product.products_name}
                    className="object-cover w-full h-full rounded-lg"
                />
            </div>

            {/* Informasi Produk */}
            <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                    <Badge className="text-red-400 bg-red-100 hover:bg-rose-200 hover:text-red-600">
                        {product.price_type}
                    </Badge>
                    <Badge className="text-red-400 bg-red-100 hover:bg-rose-200 hover:text-red-600">
                        {product.categories_name}
                    </Badge>
                </div>
                <h2 className="text-sm sm:text-base font-semibold text-black">{product.products_name}</h2>
            </div>

            {/* Rentang Harga */}
            <div className="flex flex-1 justify-between gap-4">
                {priceRanges}
            </div>

            {/* Stok Produk */}
            <p className="text-sm sm:text-base text-black flex-shrink-0">Stock: {product.stock}</p>

            {/* Tombol Aksi */}
            <ActionButtons product_id={product.product_id} />
        </div>
    );
};



// Halaman Utama
export default function ProductPage() {
    const [products, setProducts] = useState([]); // State untuk menyimpan produk
    console.log("🚀 ~ ProductPage ~ products:", products)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dashboard/products');
                const data = await response.json();
                setProducts(data); // Simpan data produk ke dalam state
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="p-4 sm:p-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-lg sm:text-xl font-semibold">Semua produk</h1>
                    <p className="text-xs text-gray-500">Total ada {products.length} produk</p>
                </div>

                {/* Kontrol */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <ManageCategoriesDialog />

                    <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
                        <div className="relative flex items-center w-full lg:w-[300px]">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 pr-8 rounded-full"
                            />
                            <Button
                                size="icon"
                                className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                            >
                                <X className="h-4 w-4 text-gray-950" />
                            </Button>
                        </div>

                        <Link href="/dashboard/products/add" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Plus className="w-5 h-5 mr-2" />
                                Add produk
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full sm:w-auto">
                            Sort by
                            <SortDesc className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Daftar Produk */}
                <div className="space-y-4">
                    {products.map((product) => (
                        <ProductCard key={product.product_id} product={{
                            product_id: product.product_id,
                            products_name: product.products_name,
                            products_description: product.products_description,
                            categories_id: product.categories_id,
                            categories_name: product.categories_name,
                            stock: product.stock,
                            categories_id: product.categories_id,
                            images: product.images,
                            price_type: product.price_type, // Menggunakan price_type untuk status
                            fixed_price: product.fixed_price, // Menyimpan fixed_price
                            wholesale_prices: product.wholesale_prices // Menyimpan wholesale_prices
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
