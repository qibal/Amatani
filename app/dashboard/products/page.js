"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus, SortDesc, Search, X } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Komponen Reusable untuk Rentang Harga
const PriceRange = ({ label, price }) => (
    <div className="flex flex-col items-center">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-black">{price}</p>
    </div>
);

// Komponen Reusable untuk Tombol Tindakan
const ActionButtons = () => (
    <div className="flex space-x-3">
        <Button variant="outline" className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-md">
            <Edit className="w-4 h-4 mr-2" />
            Edit
        </Button>
        <Button variant="outline" className="flex items-center justify-center w-9 h-9 rounded-md">
            <Trash className="w-5 h-5" />
        </Button>
    </div>
);

// Komponen Reusable untuk Card Produk
const ProductCard = ({ product }) => (
    <div className="flex items-center p-4 sm:p-6 border rounded-lg border-gray-300 gap-6">
        {/* Gambar Produk */}
        <div className="w-24 h-24 bg-gray-200 rounded-lg">
            <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-lg" />
        </div>

        {/* Informasi Produk */}
        <div className="flex-1 space-y-2">
            <div className="flex flex-wrap gap-2">
                <Badge className="text-red-400 bg-red-100 hover:bg-rose-200 hover:text-red-600">
                    {product.status}
                </Badge>
                <Badge className="text-red-400 bg-red-100 hover:bg-rose-200 hover:text-red-600">
                    {product.category}
                </Badge>
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-black">{product.name}</h2>
        </div>

        {/* Rentang Harga */}
        <div className="flex flex-1 justify-between gap-4">
            <PriceRange label="0 - 99" price={product.price} />
            <PriceRange label="100 - 199" price={product.price} />
            <PriceRange label=">= 200" price={product.price} />
        </div>

        {/* Stok Produk */}
        <p className="text-sm sm:text-base text-black flex-shrink-0">Stock: {product.stock}</p>

        {/* Tombol Aksi */}
        <ActionButtons />
    </div>
);

// Komponen Dialog Manage Categories
const ManageCategoriesDialog = () => {
    const [categories, setCategories] = useState(["Buah Buahan", "Sayuran"]);
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState("");

    // Tambah Kategori
    const handleAddCategory = () => {
        if (!categoryName.trim()) {
            setError("Must Enter Value");
            return;
        }
        setCategories([...categories, categoryName.trim()]);
        setCategoryName("");
        setError("");
    };

    // Hapus Kategori
    const handleRemoveCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        Manage Categories
                    </Button>
                </DialogTrigger >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Manage Your Categories</DialogTitle>
                        <DialogDescription>
                            Add or delete categories your products.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Tambah Kategori */}
                    <div className="space-y-2">
                        <h3 className="font-medium text-sm">Create Categories</h3>
                        <div className="flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <Button onClick={handleAddCategory} className="bg-red-600 hover:bg-rose-500">
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </Button>
                        </div>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                    </div>

                    {/* Daftar Kategori */}
                    <div className="mt-4 space-y-2">
                        <h3 className="font-medium text-sm">Manage Categories</h3>
                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                                <p className="text-sm">{category}</p>
                                <Button
                                    variant="outline"
                                    className="w-8 h-8 flex items-center justify-center"
                                    onClick={() => handleRemoveCategory(index)}
                                >
                                    <Trash className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    );
};

// Halaman Utama
export default function ProductPage() {
    const products = [
        {
            id: 1,
            name: "Apple Merah Merona",
            price: "Rp 200.000",
            stock: "200 kg",
            category: "Buah - Buahan",
            image: "/buah-buahan/img01.png",
            status: "draft",
        },
        {
            id: 2,
            name: "Apple Merah Merona",
            price: "Rp 200.000",
            stock: "200 kg",
            category: "Buah - Buahan",
            image: "/buah-buahan/img01.png",
            status: "draft",
        },
    ];

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
                    <p className="text-xs text-gray-500">Total ada 200 produk</p>
                </div>

                {/* Kontrol */}
                <div className="flex flex-wrap gap-4 items-center justify-between">

                    <ManageCategoriesDialog />

                    <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
                        <div className="flex items-center w-full sm:w-72 border border-gray-300 rounded-full px-4">
                            <Search className="w-4 h-4 text-gray-500 flex-shrink-0 mr-2" />
                            <Input type="text" placeholder="Value" className="w-full text-sm sm:text-base border-none outline-none focus:ring-0" />
                            <X className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2 cursor-pointer" />
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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
