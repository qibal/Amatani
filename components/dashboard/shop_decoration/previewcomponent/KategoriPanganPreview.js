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

export default function HomeKPanganP() {
    return (
        <section className="px-3.5 py-3.5 bg-white">
            <div className="container mx-auto">
                {/* Judul */}
                <h2 className="text-[0.875rem] font-semibold mb-[1.8rem] text-gray-800">
                    Kategori Pangan
                </h2>
                {/* Grid Produk */}
                <div
                    className="flex overflow-x-auto space-x-[1.8px] py-[1.8px] w-full scroll-snap-x"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {categories.map((product, index) => (
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
            className="flex flex-col justify-start items-center flex-none w-[108px] sm:w-[126px] md:w-[164.25px] h-[144px] sm:h-[180px] md:h-[216px] relative"
            style={{ scrollSnapAlign: "center" }}
        >
            {/* Gambar Background */}
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
            {/* Label Nama Kategori */}
            <div className="absolute bottom-[1.8px] sm:bottom-[2.7px] md:bottom-[3.6px] left-[1.8px] flex justify-start items-center px-[1.8px] py-[0.9px] rounded-full bg-white bg-opacity-90">
                <p className="text-[0.9rem] sm:text-[0.975rem] font-semibold text-left text-gray-800">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}
