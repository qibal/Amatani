'use client'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CompanyLogosPreview({ refresh }) {
    const [logos, setLogos] = useState([]);
    const [api, setApi] = useState(null);

    const fetchCompanyLogos = async () => {
        try {
            const response = await fetch('/api/dashboard/shop_decoration/company_logos');
            if (!response.ok) {
                throw new Error('Failed to fetch company logos');
            }
            const data = await response.json();
            setLogos(data);
        } catch (error) {
            console.error('Error fetching company logos:', error);
        }
    };

    useEffect(() => {
        fetchCompanyLogos();
    }, [refresh]);

    useEffect(() => {
        if (!api) {
            return;
        }
        const interval = setInterval(() => {
            api.scrollNext();
        }, 2000); // Change slide every 2.5 seconds

        return () => {
            clearInterval(interval);
        };
    }, [api]);

    return (
        <section className="bg-white">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight">
                        Mulai Dari Kedai Kopi Hingga Restoran
                    </h2>
                    <p className="mt-4 text-gray-500 text-xs md:text-sm leading-relaxed">
                        Produk Hasil Panen Kami Telah Dipercaya Oleh Para Pengusaha Bisnis Kuliner Untuk
                        Menyediakan Bahan Baku Segar Dan Berkualitas, Mendukung Cita Rasa Terbaik Dalam
                        Setiap Hidangan.
                    </p>
                </div>
                <Carousel
                    setApi={setApi}
                    className="w-full max-w-4xl mx-auto"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {logos.map((logo) => (
                            <CarouselItem key={logo.id} className="pl-2 md:pl-4 basis-1/3">
                                <Card className="border-none shadow-none">
                                    <CardContent className="p-2">
                                        <AspectRatio ratio={1 / 1} className="bg-white">
                                            <Image
                                                src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${logo.image_path}`}
                                                alt="Company Logo"
                                                width={200}
                                                height={200}
                                                className="object-contain"
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
    );
}