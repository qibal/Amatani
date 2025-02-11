'use client'

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/shadcnUi/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/shadcnUi/scroll-area"

export default function CarouselWithThumbnails({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainCarouselRef, mainEmbla] = useEmblaCarousel({ loop: true })
  const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const scrollToIndex = useCallback(
    (index) => {
      if (mainEmbla) mainEmbla.scrollTo(index)
    },
    [mainEmbla],
  )

  const onThumbClick = useCallback(
    (index) => {
      if (!mainEmbla) return
      scrollToIndex(index)
    },
    [mainEmbla, scrollToIndex],
  )

  const onSelect = useCallback(() => {
    if (!mainEmbla || !thumbEmbla) return
    setSelectedIndex(mainEmbla.selectedScrollSnap())
    thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap())
  }, [mainEmbla, thumbEmbla])

  useEffect(() => {
    if (!mainEmbla) return
    onSelect()
    mainEmbla.on("select", onSelect)
    return () => {
      mainEmbla.off("select", onSelect)
    }
  }, [mainEmbla, onSelect])

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 h-[500px] md:h-[700px]">
      {/* Thumbnails */}
      <div className="w-full md:w-28 h-28 md:h-full order-2 md:order-1 mt-4 md:mt-0">
        <ScrollArea className="w-full h-full">
          <div className="flex md:flex-col" ref={thumbCarouselRef}>
            <div className="flex md:flex-col">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={`relative flex-shrink-0 w-24 h-24 m-1 ${index === selectedIndex
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:ring-2 hover:ring-muted hover:ring-offset-2"
                    }`}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="md:hidden" />
          <ScrollBar orientation="vertical" className="hidden md:flex" />
        </ScrollArea>
      </div>

      {/* Main Carousel */}
      <div className="relative w-full md:w-[600px] order-1 md:order-2 bg-muted/5 rounded-lg flex-1">
        <div className="overflow-hidden rounded-lg h-full" ref={mainCarouselRef}>
          <div className="flex h-full">
            {images.map((image, index) => (
              <div key={index} className="relative flex-[0_0_100%] h-full">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" />
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