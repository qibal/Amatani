"use client";

const categories = [
    { imageSrc: "/FE/img01.jpg", categoryName: "Buah - Buahan" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Sayuran" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Unggas dan Telur" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Daging Sapi" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Ikan dan Seafood" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Bumbu Dapur" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Produk Olahan" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Minuman" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Makanan Ringan" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Bahan Pokok" },
];

export default function HomeKPangan() {
    return (
        <section className="px-16 py-8 bg-white">
            <div className="container mx-auto">
                {/* Judul */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Kategori Pangan
                </h2>
                {/* Grid Produk */}
                <div
                    className="flex overflow-x-auto space-x-4 py-4 w-full scroll-snap-x"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {Array.isArray(categories) && categories.map((product, index) => (
                        <ProductCard
                            key={index}
                            imageSrc={product.imageSrc}
                            categoryName={product.categoryName}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ imageSrc, categoryName }) {
    return (
        <div
            className="flex flex-col justify-start items-center flex-none w-[240px] sm:w-[280px] md:w-[365px] h-[320px] sm:h-[400px] md:h-[480px] relative"
            style={{ scrollSnapAlign: "center" }}
        >
            {/* Gambar Background */}
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
            {/* Label Nama Kategori */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 flex justify-start items-center px-4 py-2 rounded-full bg-white bg-opacity-90">
                <p className="text-sm sm:text-base font-semibold text-left text-gray-800">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}
