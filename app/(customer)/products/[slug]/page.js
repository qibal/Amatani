import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Minus, Plus, Star, Truck } from 'lucide-react'
import { cn } from "@/lib/utils"


export default function ProductDetail() {
    const images = [
        { src: "/FE/img01.jpg", alt: "Broccoli main view" },
        { src: "/FE/img01.jpg", alt: "Lettuce" },
        { src: "/FE/img01.jpg", alt: "Cabbage" },
        { src: "/FE/img01.jpg", alt: "Chinese Cabbage" },
        { src: "/FE/img01.jpg", alt: "Green Lettuce" },
        { src: "/FE/img01.jpg", alt: "Celery" },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Image Gallery and Main Image */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="lg:hidden">
                        <h1 className="text-2xl font-bold">Sayuran Segar Berkualitas</h1>
                        <div className="flex items-center gap-0.5 mt-2">
                            {Array(4).fill(0).map((_, index) => (
                                <Star key={index} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                            <Star className="w-5 h-5 fill-muted text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Main Image */}
                        <div className="relative order-1 flex-grow">
                            <AspectRatio ratio={1}>
                                <Image
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    className="object-cover rounded-lg "
                                    fill
                                    priority
                                />
                            </AspectRatio>
                        </div>

                        {/* Image Thumbnails */}
                        <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        "relative rounded-lg overflow-hidden w-20 h-20",
                                        index === 0 ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"
                                    )}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        className="object-cover"
                                        fill
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Card for Mobile */}
                    <div className="lg:hidden mt-4">
                        <ProductInfoCard />
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="hidden lg:block">
                            <h1 className="text-3xl font-bold">Sayuran Segar Berkualitas</h1>
                            <div className="flex items-center gap-0.5 mt-2">
                                {Array(4).fill(0).map((_, index) => (
                                    <Star key={index} className="w-5 h-5 fill-primary text-primary" />
                                ))}
                                <Star className="w-5 h-5 fill-muted text-muted-foreground" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Deskripsi produk</h2>
                            <p className="text-sm text-muted-foreground">
                                Desain berpori dan nyaman: sepatu berjalan kami menghadirkan desain bersirkulasi, memastikan
                                pengalaman aus yang nyaman bagi pengguna, terutama untuk jalan-jalan jauh selama musim panas
                                dan musim semi.
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Sol dalam yang lembut dan empuk: sepatunya memiliki Sol dalam yang lembut dan empuk yang
                                terbuat dari kain katun, memberikan kenyamanan dan dukungan yang sangat baik untuk kaki Anda.
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
                                                    <td className="py-2">Berat</td>
                                                    <td className="py-2">500g</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">Kategori</td>
                                                    <td className="py-2">Sayuran Segar</td>
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
                            <div className="space-y-4">
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info Card for Desktop */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-4">
                        <ProductInfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductInfoCard() {
    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-sm text-muted-foreground">2 - 19 kg</div>
                        <div className="font-semibold">Rp 10.000</div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">20 - 99 kg</div>
                        <div className="font-semibold">Rp 9.500</div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">{'>='} 100 kg</div>
                        <div className="font-semibold">Rp 9.000</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-md text-center"
                        defaultValue="100"
                        min="1"
                    />
                    <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                        Tambah Ke Keranjang
                    </Button>
                    <Button variant="outline" className="w-full">
                        Tambah Ke Favorit
                    </Button>
                </div>

                <div className="text-sm text-muted-foreground text-center">
                    Lakukan Pembayaran di Keranjang
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Dikirim dari gudang Tangerang</span>
                </div>
            </div>
        </Card>
    )
}

