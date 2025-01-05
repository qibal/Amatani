'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CarouselWithThumbnails() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [mainCarouselRef, mainEmbla] = useEmblaCarousel({ skipSnaps: false })
    const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        axis: 'y'
    })

    const images = [
        { src: '/buah-buahan/img01.png', alt: 'Image 1' },
        { src: '/buah-buahan/img01.png', alt: 'Image 2' },
        { src: '/buah-buahan/img01.png', alt: 'Image 3' },
        { src: '/buah-buahan/img01.png', alt: 'Image 4' },
        { src: '/buah-buahan/img01.png', alt: 'Image 5' },
        { src: '/buah-buahan/img01.png', alt: 'Image 6' },
        { src: '/buah-buahan/img01.png', alt: 'Image 7' },
        { src: '/buah-buahan/img01.png', alt: 'Image 8' },
        { src: '/buah-buahan/img01.png', alt: 'Image 9' },
        { src: '/buah-buahan/img01.png', alt: 'Image 10' },
        { src: '/buah-buahan/img01.png', alt: 'Image 11' },
        { src: '/buah-buahan/img01.png', alt: 'Image 12' },
    ]

    const onThumbClick = useCallback(
        (index) => {
            if (!mainEmbla || !thumbEmbla) return
            mainEmbla.scrollTo(index)
        },
        [mainEmbla, thumbEmbla]
    )

    const onSelect = useCallback(() => {
        if (!mainEmbla || !thumbEmbla) return
        setSelectedIndex(mainEmbla.selectedScrollSnap())
        thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap())
    }, [mainEmbla, thumbEmbla])

    useEffect(() => {
        if (!mainEmbla) return
        onSelect()
        mainEmbla.on('select', onSelect)
        return () => {
            mainEmbla.off('select', onSelect)
        }
    }, [mainEmbla, onSelect])

    return (
        <div className="flex gap max-w-5xl mx-auto h-[650px]">
            {/* Thumbnails with ScrollArea */}
            <div className="w-32 h-full relative">
                <ScrollArea className="h-full">
                    <div className="p-4" ref={thumbCarouselRef}>
                        <div className="flex flex-col gap-4 pb-3">
                            {images.map((src, index) => (
                                <button
                                    key={index}
                                    className={`relative w-24 h-24 shrink-0 rounded-md overflow-hidden transition-all ${
                                        index === selectedIndex 
                                        ? 'ring-2 ring-primary ring-offset-2' 
                                        : 'hover:ring-2 hover:ring-muted hover:ring-offset-2'
                                    }`}
                                    onClick={() => onThumbClick(index)}
                                    type="button"
                                >
                                    <Image
                                        src={src.src}
                                        alt={src.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Main Carousel */}
            <div className="relative bg-muted/5 rounded-lg flex-1 h-full">
                <div className="overflow-hidden rounded-lg h-full" ref={mainCarouselRef}>
                    <div className="flex h-full">
                        {images.map((src, index) => (
                            <div className="relative flex-[0_0_100%] h-full" key={index}>
                                <Image
                                    src={src.src}
                                    alt={src.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={() => mainEmbla?.scrollPrev()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={() => mainEmbla?.scrollNext()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

