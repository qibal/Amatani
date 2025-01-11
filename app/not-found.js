// File: pages/404.js
'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Halaman Tidak Ditemukan</h2>
                <div className="flex justify-center mb-4">
                    <Image
                        src="/FE/notfound.svg"
                        alt="Not Found SVG"
                        width={200}
                        height={200}
                    />
                </div>
                <Button asChild className="bg-rose-600 text-white hover:bg-rose-700">
                    <Link href="/">Kembali ke Beranda</Link>
                </Button>
            </div>
        </div>
    )
}
