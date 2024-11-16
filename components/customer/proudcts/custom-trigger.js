'use client'
import { useSidebar } from "@/components/ui/sidebar"
import { SlidersHorizontal } from "lucide-react"

export function CustomTrigger() {
    const { toggleSidebar } = useSidebar()

    return (
        <>
            <button onClick={toggleSidebar} className="flex justify-start items-center gap-1.5 px-3 py-1.5">
                <p className="text-base font-semibold text-center text-gray-800">Filters</p>
                <SlidersHorizontal />
                {/* <Filter className="w-5 h-5 text-gray-800" /> */}
            </button>
        </>
    )
}

