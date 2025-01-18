'use client'

import { Carousel, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CompanyLogosCarousel() {
    const [companyLogos, setCompanyLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [api, setApi] = useState(null);

    useEffect(() => {
        const fetchCompanyLogos = async () => {
            try {
                const response = await fetch('/api/dashboard/shop_decoration/company_logos');
                if (!response.ok) {
                    throw new Error('Failed to fetch company logos');
                }
                const data = await response.json();
                setCompanyLogos(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching company logos:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchCompanyLogos();
    }, []);

    useEffect(() => {
        if (!api) {
            return;
        }
        const interval = setInterval(() => {
            api.scrollNext();
        }, 2500); // Change slide every 2.5 seconds

        return () => {
            clearInterval(interval);
        };
    }, [api]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="py-5 bg-white">
            <div className="container py-12 mx-auto px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                        Mulai Dari Kedai Kopi Hingga Restoran
                    </h2>
                    <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                        Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk
                        Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam
                        Setiap Hidangan.
                    </p>
                </div>
                <Carousel
                    setApi={setApi}
                    className="w-full max-w-xl mx-auto"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {companyLogos.map((logo, index) => (
                            <CarouselItem key={logo.id} className="pl-2 md:pl-4 basis-1/4">
                                <Card className="border-none shadow-none">
                                    <CardContent className="p-2">
                                        <AspectRatio ratio={1 / 1} className="bg-white">
                                            <Image
                                                src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${logo.image_path}`}
                                                alt={`Company Logo ${index + 1}`}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </AspectRatio>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}