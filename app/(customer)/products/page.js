"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle, ChevronDown, Filter, Search, X } from "lucide-react"; // Ikon untuk fallback
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
    const [productsData, setProductsData] = useState([]);
    console.log("🚀 ~ Product ~ productsData:", productsData)
    const [categoryName, setCategoryName] = useState('');
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const categoriesQuery = searchParams.get('categories');
    const productsQuery = searchParams.get('products');
    const allProductsQuery = searchParams.get('all_product');
    const query = categoriesQuery || productsQuery || '';
    const type = categoriesQuery ? 'categories' : (productsQuery ? 'products' : 'all');
    const formattedQuery = categoriesQuery;  // Hapus formatting tambahan

    console.log('Formatted Query:', formattedQuery);
    console.log('Query:', query);
    console.log('Type:', type);

    useEffect(() => {
        async function fetchProducts() {
            const url = type === 'categories'
                ? `/api/customer/products?categories=${formattedQuery}`
                : (type === 'products' ? `/api/customer/products?products=${query}` : `/api/customer/products?all_product=true`);
            const result = await fetch(url, {
                method: "GET",
            });
            if (result.ok) {
                const data = await result.json();
                setProductsData(data);
                if (data.length > 0) {
                    setCategoryName(allProductsQuery ? 'Semua Produk' : data[0].categories_name);
                } else {
                    setCategoryName(allProductsQuery ? 'Semua Produk' : '');
                }
            }
        }
        if (query || type === 'all') {
            fetchProducts();
        }
    }, [query, formattedQuery, type, allProductsQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?products=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="mt-4 px-4 container mx-auto">
            {/* Mobile & Medium Layout */}
            <div className="flex flex-col gap-2 py-2 lg:hidden">

                {/* Search Input */}
                <form onSubmit={handleSearch} className="flex items-center gap-4 w-full">
                    <div className="relative flex items-center w-full">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Cari produk"
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
                        Cari
                    </Button>
                </form>

                {/* Hasil Pencarian, Filter, dan Sort By */}
                <div className="flex justify-between items-center w-full">
                    <p className="text-xl font-semibold text-gray-800">
                        {allProductsQuery ? 'Semua Produk' : (categoryName ? categoryName : (formattedQuery ? formattedQuery : 'Kategori tidak tersedia'))} ({productsData.length})
                    </p>
                    <div className="flex items-center gap-4">
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <Filter className="w-4 h-4 text-gray-950" />
                            <span className="text-gray-950">Filter</span>
                        </Button>
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <span className="text-gray-950">Short By</span>
                            <ChevronDown className="w-4 h-4 text-gray-950" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center lg:w-full py-4">
                <div>
                    <p className="text-sm text-gray-800">Hasil pencarian:</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {allProductsQuery ? 'Semua Produk' : (categoryName ? categoryName : (formattedQuery ? formattedQuery : 'Kategori tidak tersedia'))} ({productsData.length})
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <Button variant="outline">
                        <Link href="/products?all_product=true">Semua Produk</Link>
                    </Button>
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="flex items-center gap-2 flex-grow lg:flex-grow-0 w-full lg:w-auto">
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
                    {/* Filter dan Sort By Buttons */}
                    <div className="flex items-center gap-2">
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <Filter className="w-4 h-4 text-gray-950" />
                            <span className="text-gray-950">Filter</span>
                        </Button>
                        <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                            <span className="text-gray-950">Sort By</span>
                            <ChevronDown className="w-4 h-4 text-gray-950" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid Produk */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {productsData.length > 0 ? (
                    productsData.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            imageSrc={product.images[0] || "/placeholder-image.png"}
                            name={product.products_name || "Nama tidak tersedia"}
                            category={product.categories_name || "Kategori tidak tersedia"}
                            priceType={product.price_type}
                            fixedPrice={product.fixed_price}
                            wholesalePrices={product.wholesale_prices || []}
                            product_id={product.product_id}
                            stock={product.stock}
                        />
                    ))
                ) : (
                    <NoProduct />
                )}
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, name, category, priceType, fixedPrice, wholesalePrices, product_id, stock }) {
    let priceRange;

    if (priceType === 'wholesale' && wholesalePrices && wholesalePrices.length > 0) {
        const prices = wholesalePrices.map(price => price.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
            priceRange = `Rp ${minPrice.toLocaleString()}`;
        } else {
            priceRange = `Rp ${minPrice.toLocaleString()} - Rp ${maxPrice.toLocaleString()}`;
        }
    } else if (priceType === 'fixed' && fixedPrice !== null) {
        priceRange = `Rp ${Number(fixedPrice).toLocaleString()}`;
    } else {
        priceRange = "Harga tidak tersedia";
    }

    const cardContent = (
        <Card className="w-full border-0 shadow-none">
            <CardHeader className="p-0">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        width={200}
                        height={200}
                        src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${imageSrc}`}
                        alt={name}
                        className={`object-cover w-full h-full ${stock === 0 ? 'grayscale' : ''}`}
                    />
                    {stock === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white text-2xl font-bold">Stok Habis</span>
                        </div>
                    )}
                </AspectRatio>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-base font-bold text-rose-600">{priceRange}</p>
            </CardContent>
        </Card>
    );

    return stock === 0 ? (
        <div className="pointer-events-none">{cardContent}</div>
    ) : (
        <Link href={`/products/${product_id}`}>{cardContent}</Link>
    );
}

function NoProduct() {
    return (
        <Card className="flex items-center justify-center w-full h-64 bg-gray-100">
            <div className="flex flex-col items-center text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-gray-500" />
                <p className="text-gray-500">Tidak ada produk!</p>
            </div>
        </Card>
    );
}