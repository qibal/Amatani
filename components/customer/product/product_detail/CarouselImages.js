'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function CarouselWithThumbnails() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [mainCarouselRef, mainEmbla] = useEmblaCarousel({ skipSnaps: false })
    const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    })
    const images = [
        { src: '/buah-buahan/img01.png', alt: 'Image 1' },
        { src: '/buah-buahan/img01.png', alt: 'Image 2' },
        { src: '/buah-buahan/img01.png', alt: 'Image 3' },
        { src: '/buah-buahan/img01.png', alt: 'Image 4' },
        { src: '/buah-buahan/img01.png', alt: 'Image 5' },
        { src: '/buah-buahan/img01.png', alt: 'Image 6' },
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
        <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="overflow-hidden w-1/6" ref={thumbCarouselRef}>
                <div className="flex flex-col gap-2" style={{ height: '500px' }}>
                    {images.map((src, index) => (
                        <button
                            key={index}
                            className={`relative flex-[0_0_calc(100%/6)] rounded-lg overflow-hidden ${index === selectedIndex ? 'ring-2 ring-primary' : ''
                                }`}
                            onClick={() => onThumbClick(index)}
                            type="button"
                        >
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={src.src}
                                    alt={src.alt}
                                    fill
                                    className="object-cover"
                                />
                            </AspectRatio>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Carousel */}
            <div className="relative bg-black/5 rounded-lg flex-grow">
                <AspectRatio ratio={1 / 1} className="w-full">
                    <div className="overflow-hidden" ref={mainCarouselRef}>
                        <div className="flex">
                            {images.map((src, index) => (
                                <div className="relative flex-[0_0_100%]" key={index}>
                                    <AspectRatio ratio={1 / 1} className="w-full">
                                        <Image
                                            src={src.src}
                                            alt={src.alt}
                                            fill
                                            className="object-cover w-full h-full"
                                        />
                                    </AspectRatio>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white"
                        onClick={() => mainEmbla?.scrollPrev()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white"
                        onClick={() => mainEmbla?.scrollNext()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </AspectRatio>
            </div>
        </div>
    )
}

