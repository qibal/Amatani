import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function BekerjaSama() {
    return (
        <div className="container mx-auto py-20 px-6 lg:px-16">
            {/* <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Bekerja Sama</h1> */}
            
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Mengapa Bekerja Sama dengan Kami?
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Kami menawarkan peluang kerjasama yang saling menguntungkan dengan berbagai manfaat, inovasi, dan dukungan penuh.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-0">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src="/buah-buahan/img01.png"
                                alt="Manfaat Kerjasama"
                                className="object-cover w-full h-full rounded-t-lg"
                                width={200}
                                height={200}
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manfaat Kerjasama</h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Nikmati akses ke jaringan luas kami, dukungan pemasaran strategis, serta solusi bisnis yang inovatif.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-0">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src="/buah-buahan/img01.png"
                                alt="Dukungan Kami"
                                className="object-cover w-full h-full rounded-t-lg"
                                width={200}
                                height={200}
                            />
                        </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Dukungan Kami</h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Kami menyediakan dukungan penuh untuk memastikan keberhasilan semua mitra kerja kami.
                        </p>
                    </CardContent>
                </Card>
            </div> */}

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Hubungi Kami</h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Hubungi kami untuk informasi lebih lanjut mengenai peluang kerjasama dan manfaat yang kami tawarkan.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Phone */}
                <Card className="text-center">
                    <CardHeader className="p-6 flex flex-col items-center">
                        <Phone className="w-12 h-12 text-rose-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">Telepon</h3>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-gray-600">
                            Hubungi kami di <strong>+62 123 456 789</strong> untuk pertanyaan lebih lanjut.
                        </p>
                    </CardContent>
                </Card>

                {/* Email */}
                <Card className="text-center">
                    <CardHeader className="p-6 flex flex-col items-center">
                        <Mail className="w-12 h-12 text-rose-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-gray-600">
                            Kirim email ke <strong>info@ecommerce.com</strong> untuk kolaborasi dan pertanyaan.
                        </p>
                    </CardContent>
                </Card>

                {/* Address */}
                <Card className="text-center">
                    <CardHeader className="p-6 flex flex-col items-center">
                        <MapPin className="w-12 h-12 text-rose-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">Alamat</h3>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-gray-600">
                            Kunjungi kantor kami di <strong>Jl. Merdeka No. 123, Jakarta</strong>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
