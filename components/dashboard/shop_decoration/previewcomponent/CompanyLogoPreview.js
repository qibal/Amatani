'use client'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CompanyLogosPreview() {
    const companyLogos = [
        { src: "/FE/img02.png", alt: "Company 1 Logo" },
        { src: "/FE/img02.png", alt: "Company 2 Logo" },
        { src: "/FE/img02.png", alt: "Company 3 Logo" },
        { src: "/FE/img02.png", alt: "Company 4 Logo" },
        { src: "/FE/img02.png", alt: "Company 5 Logo" },
        { src: "/FE/img02.png", alt: "Company 6 Logo" },
        { src: "/FE/img02.png", alt: "Company 7 Logo" },
        { src: "/FE/img02.png", alt: "Company 8 Logo" },
    ];

    const [api, setApi] = useState(null);

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
                        {companyLogos.map((logo, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3">
                                <Card className="border-none shadow-none">
                                    <CardContent className="p-2">
                                        <AspectRatio ratio={1 / 1} className="bg-white">
                                            <Image
                                                src={logo.src}
                                                alt={logo.alt}
                                                fill
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
