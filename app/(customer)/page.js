

import HomeBuah from "@/components/customer/HomeBuah";
import HomeKPangan from "@/components/customer/HomeKPangan";
import HomeTestimoni from "@/components/customer/HomeTestimoni";
import Footer from "@/components/customer/Footer";



import Image from "next/image";
import CompanyLogosCarousel from "@/components/customer/CarouselCompanyLogos";

import SearchHomeCustomer from "@/components/customer/SearchProduct";

// Komponen Statistik Reusable
const Statistics = ({ stats }) => {

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4">
                {/* Grid untuk mobile dan tablet, flex untuk desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center py-8"
                        >
                            <p className="text-3xl font-bold text-gray-800">{stat.number}</p>
                            <p className="text-gray-600 text-sm mt-2">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// Komponen Fitur Reusable
const FeatureGrid = ({ features }) => (
    <section className="px-24 py-8 bg-white">
        <div className="container  mx-auto py-12">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Kostumisasi Produk <br /> Sesuai Kebutuhan Usaha Anda.
            </h2>
            <div className="flex justify-center mb-8">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Gratis!
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="relative group flex flex-col items-center overflow-hidden">
                        <div
                            className="w-full h-[400px] bg-cover bg-center transform group-hover:scale-105 transition duration-300"
                            style={{ backgroundImage: `url(${feature.imageSrc})` }}
                        ></div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-sm font-semibold py-1 px-4 rounded-full shadow-md">
                            {feature.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


export default function CustomerPage() {

    // async function getuser(params) {

    //     const supabase = await createClient()
    //     const { data } = await supabase.auth.getSession()
    //     console.log("data", data);
    //     console.log("data", data.session.access_token);
    //     const token = data.session.access_token;
    //     const user = jwtDecode(token);
    //     console.log("user", user);


    // }
    // getuser()


    const stats = [
        { number: "18,000+", description: "Serving Culinary Businesses" },
        { number: "1,000+", description: "Petani, Peternak, Nelayan" },
        { number: "100+", description: "Produk Hasil Panen" },
        { number: "20th+", description: "Berpengalaman" },
    ];

    const features = [
        { name: "Kupas", imageSrc: "/FE/img01.jpg" },
        { name: "Potong", imageSrc: "/FE/img01.jpg" },
        { name: "Giling", imageSrc: "/FE/img01.jpg" },
        { name: "Bersihkan", imageSrc: "/FE/img01.jpg" },
    ];


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
                <div className="relative h-full flex items-center px-4">
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
            <Statistics stats={stats} />

            {/* Business Highlight Section */}
            <CompanyLogosCarousel />

            {/* Home Buah dan Home KPangan */}
            <main>
                <HomeBuah />
                <HomeKPangan />
            </main>

            {/* Kostumisasi Produk Section */}
            <FeatureGrid features={features} />

            {/* Packing Facilities Section */}
            <section>
                <div className="container  mx-auto px-4 py-8 bg-white">
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
                <HomeTestimoni />
                <Footer />
            </main>
        </div>
    );
}
