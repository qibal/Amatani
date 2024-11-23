"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle, ChevronDown, Filter, Search, X } from "lucide-react"; // Ikon untuk fallback
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Product() {
    // Data Dummy
    const products = [
        {
            product_id: 1,
            product_name: "Buah Apel",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 290,000 - Rp 440,000",
        },
        {
            product_id: 2,
            product_name: "Buah Mangga",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 300,000 - Rp 500,000",
        },
        {
            product_id: 3,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 4,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 5,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 6,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 7,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 8,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 9,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
        {
            product_id: 10,
            product_name: "Buah Jeruk",
            product_images: [{ image_url: "/buah-buahan/img01.png" }],
            category: "Buah-buahan",
            price_range: "Rp 250,000 - Rp 400,000",
        },
    ];

    return (
        <div className="mt-16 px-6 sm:px-0 container mx-auto ">

            {/* Filter dan Search Section */}
            <div className="flex justify-between items-center w-full  mx-auto mb-8">
                <div>
                    <p className="text-sm text-gray-800">Hasil pencarian:</p>
                    <p className="text-xl font-semibold text-gray-800">
                        Apel (20)
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Search Input */}
                    <div className="flex items-center gap-2 w-96">
                        <div className="relative flex items-center">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search..."

                                className="w-[220px] pl-8 pr-8 rounded-full"
                            />
                            <Button
                                size="icon"
                                className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none hover absolute right-1 top-1/2 -translate-y-1/2 transform"

                            >
                                <X className="h-4 w-4 text-gray-950" />
                            </Button>
                        </div>
                        <Button
                            className="bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-full"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Cari
                        </Button>
                    </div>

                    {/* Filter Button */}
                    <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                        <Filter className="w-4 h-4 text-gray-950" />
                        <span className="text-gray-950">Filter</span>
                    </Button>

                    {/* Sort By Button */}
                    <Button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
                        <span className="text-gray-950">Sort By</span>
                        <ChevronDown className="w-4 h-4 text-gray-950" />
                    </Button>
                </div>
            </div>

            {/* Grid Produk */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 ">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            imageSrc={product.product_images?.[0]?.image_url || "/placeholder-image.png"}
                            name={product.product_name || "Nama tidak tersedia"}
                            category={product.category || "Kategori tidak tersedia"}
                            priceRange={product.price_range || "Harga tidak tersedia"}
                        />
                    ))
                ) : (
                    <NoProduct />
                )}
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, name, category, priceRange }) {
    return (
        <Card className="w-full border-0 shadow-none">
            <CardHeader className="p-0 ">
                {/* Aspect Ratio untuk menjaga ukuran gambar */}
                <AspectRatio ratio={1 / 1}>
                    <img
                        src={imageSrc}
                        alt={name}
                        className="object-cover w-full h-full "
                    />
                </AspectRatio>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-base font-bold text-rose-600">{priceRange}</p>
            </CardContent>
        </Card>
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
