const products = [
    { imageSrc: "/FE/img01.jpg", categoryName: "Buah - Buahan" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Sayuran" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Unggas dan Telur" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Unggas dan Telur" },
    { imageSrc: "/FE/img01.jpg", categoryName: "Unggas dan Telur" },
    // Tambahkan data produk lainnya jika diperlukan
];

export default function ProductGrid() {
    return (
        <div className="flex overflow-x-auto space-x-4 py-4 w-full my-60">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    imageSrc={product.imageSrc}
                    categoryName={product.categoryName}
                />
            ))}
        </div>
    );
}

function ProductCard({ imageSrc, categoryName }) {
    return (
        <div className="flex flex-col justify-start items-center flex-none w-[500px] h-[600px] relative">
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
            <div
                className="absolute bottom-8 left-4 flex justify-start items-center px-4 py-2 rounded-full bg-white bg-opacity-90"
            >
                <p className="text-base font-semibold text-left text-gray-800">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}
