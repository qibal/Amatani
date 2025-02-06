import { Card, CardHeader, CardContent } from "@/components/shadcnUi/card";
import { AspectRatio } from "@/components/shadcnUi/aspect-ratio";
import { AlertCircle, Users, ShoppingCart, Globe } from "lucide-react";
import Image from "next/image";

export default function TentangKami() {
    return (
        <div className="container mx-auto py-20 px-6 lg:px-16">
            {/* <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Tentang Kami</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                
                <Card>
                    <CardHeader className="p-0">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src="/buah-buahan/img01.png"
                                alt="Kerjasama"
                                className="object-cover w-full h-full rounded-t-lg"
                                width={200}
                                height={200}
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Cerita Kami</h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Kami memulai perjalanan dengan komitmen untuk menyediakan produk berkualitas tinggi, memastikan kepuasan pelanggan, dan mendukung komunitas kami.
                        </p>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader className="p-0">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src="/buah-buahan/img01.png"
                                alt="Kerjasama"
                                className="object-cover w-full h-full rounded-t-lg"
                                width={200}
                                height={200}
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Misi Kami</h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Memberikan pengalaman belanja yang mudah, cepat, dan aman dengan beragam produk pilihan terbaik untuk kebutuhan Anda.
                        </p>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader className="p-0">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src="/buah-buahan/img01.png"
                                alt="Kerjasama"
                                className="object-cover w-full h-full rounded-t-lg"
                                width={200}
                                height={200}
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tim Kami</h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Tim kami terdiri dari para profesional yang berdedikasi untuk memberikan layanan terbaik kepada pelanggan di seluruh dunia.
                        </p>
                    </CardContent>
                </Card>
            </div> */}

            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Mengapa Memilih Kami?</h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Kami berkomitmen untuk menyediakan pengalaman belanja yang luar biasa dengan fokus pada kualitas, layanan, dan inovasi.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Customers */}
                <Card className="text-center">
                    <CardHeader className="p-6">
                        <Users className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">Pelanggan Puas</h3>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-gray-600">
                            Kami selalu mengutamakan kepuasan pelanggan dengan layanan yang ramah dan solusi tepat waktu.
                        </p>
                    </CardContent>
                </Card>

                {/* High-Quality Products */}
                <Card className="text-center">
                    <CardHeader className="p-6">
                        <ShoppingCart className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">Produk Berkualitas</h3>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-gray-600">
                            Semua produk kami dipilih dengan cermat untuk memastikan standar kualitas tertinggi.
                        </p>
                    </CardContent>
                </Card>

                {/* International Shipping */}
                <Card className="text-center">
                    <CardHeader className="p-6">
                        <Globe className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">Pengiriman Internasional</h3>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-gray-600">
                            Layanan pengiriman kami menjangkau seluruh dunia dengan cepat dan aman.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
