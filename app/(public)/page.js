import HomeBuah from "@/components/public/customers/HomeBuah";
import HomeKPangan from "@/components/public/customers/HomeKPangan";
import HomeTestimoni from "@/components/public/customers/HomeTestimoni";
import Footer from "@/components/public/customers/Footer";
import Image from "next/image";
import CompanyLogosCarousel from "@/components/public/customers/CarouselCompanyLogos";
import SearchHomeCustomer from "@/components/public/customers/SearchProduct";
import FeatureGrid from "@/components/public/customers/FeatureGrid";
import Experience from "@/components/public/customers/Experience";

export default function CustomerPage() {
    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/FE/img01.jpg')" }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                </div>
                <div className="relative h-full flex items-center px-16">
                    <div className="container mx-auto">
                        <h1 className="text-white font-bold text-5xl md:text-6xl">
                            <span className="block">Sumber Segar</span>
                            <span className="block">Untuk Usaha Anda</span>
                        </h1>
                        <div className="flex items-center gap-2 max-w-lg h-9 mt-14">
                            <SearchHomeCustomer />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistik Section */}
            <Experience />

            {/* Business Highlight Section */}
            <CompanyLogosCarousel />

            {/* Home Buah dan Home KPangan */}
            <main>
                <HomeBuah />
                <HomeKPangan />
            </main>

            {/* Kostumisasi Produk Section */}
            <FeatureGrid />

            {/* Packing Facilities Section */}
            <section>
                <div className="container mx-auto px-16 py-8 bg-white">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Fasilitas Distribusi & Packing House
                    </h2>
                    <div className="relative flex justify-center">
                        <Image width={300} height={300} src="/FE/Map.svg" alt="Map of Indonesia" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* Testimoni dan Footer */}
            <main>
                {/* <HomeTestimoni /> */}
                <Footer />
            </main>
        </div>
    );
}

