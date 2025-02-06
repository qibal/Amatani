// File: pages/error.js
'use client'
import { Button } from '@/components/shadcnUi/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Aduhh error, Gimana dong...</h2>
                <div className="flex justify-center mb-4">
                    <Image
                        src="/FE/error.svg"
                        alt="Error SVG"
                        width={200}
                        height={200}
                    />
                </div>
                <Button asChild className="bg-rose-600 text-white hover:bg-rose-700">
                    <Link href="/">Balik</Link>
                </Button>
            </div>
        </div>
    )
}
