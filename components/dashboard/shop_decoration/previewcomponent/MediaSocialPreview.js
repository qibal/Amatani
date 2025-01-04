import React from "react";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

export default function PreviewMediaSocial() {
    const paymentIcons = [
        { src: "/icon-payment/bca.png", alt: "BCA" },
        { src: "/icon-payment/bluepay.png", alt: "BluePay" },
        { src: "/icon-payment/BNI.png", alt: "BNI" },
        { src: "/icon-payment/dana.png", alt: "Dana" },
        { src: "/icon-payment/gopay.png", alt: "Gopay" },
        { src: "/icon-payment/gpay.png", alt: "Google Pay" },
        { src: "/icon-payment/mandiri.png", alt: "Mandiri" },
        { src: "/icon-payment/paypal.png", alt: "PayPal" },
    ];

    return (
        <footer className="bg-white border-t py-8">
            <div className="max-w-7xl mx-auto px-4 md:px-16">
                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center space-x-4 text-gray-600 text-sm mb-8">
                    <a href="#" className="hover:text-gray-800">
                        Tentang Kami
                    </a>
                    <a href="#" className="hover:text-gray-800">
                        Karir
                    </a>
                    <a href="#" className="hover:text-gray-800">
                        Bekerja Sama
                    </a>
                    <a href="#" className="hover:text-gray-800">
                        Privasi dan Kebijakan
                    </a>
                    <a href="#" className="hover:text-gray-800">
                        Pusat Bantuan
                    </a>
                    <a href="#" className="hover:text-gray-800">
                        Hubungi Kami
                    </a>
                </nav>

                {/* Payment Icons */}
                <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                    {paymentIcons.map((icon, index) => (
                        <Image
                            width={200}
                            height={200}
                            key={index}
                            src={icon.src}
                            alt={icon.alt}
                            className="h-10 w-auto"
                        />
                    ))}
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-800 transition"
                        aria-label="Instagram"
                    >
                        <Instagram size={24} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-800 transition"
                        aria-label="Facebook"
                    >
                        <Facebook size={24} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-800 transition"
                        aria-label="YouTube"
                    >
                        <Youtube size={24} />
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-gray-800 transition"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
