import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Halaman Ngga Ada nih..</h2>
                <video autoPlay loop muted width="200" height="100" className="mx-auto mb-4">
                    <source src="/FE/error.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Button asChild className="bg-rose-600 text-white hover:bg-rose-700">
                    <Link href="/">Balik</Link>
                </Button>
            </div>
        </div>
    )
}