export default function ProductGrid2() {
    return (
        <div className="flex flex-col items-center space-y-4 py-4 w-full">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center">
                Kostumisasi Produk Sesuai Kebutuhan Usaha Anda.
            </h2>
            <button className="px-4 py-1.5 bg-red-500 text-white font-semibold rounded-full">
                Gratis!
            </button>

            {/* Container Kartu Produk */}
            <div className="flex space-x-4 py-4">
                <ProductCard
                    imageSrc="/FE/img01.jpg"
                    categoryName="Kupas"
                />
                <ProductCard
                    imageSrc="/FE/img01.jpg"
                    categoryName="Potong"
                />
                <ProductCard
                    imageSrc="/FE/img01.jpg"
                    categoryName="Giling"
                />
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, categoryName }) {
    return (
        <div className="flex-none w-[378px] h-[450px] relative rounded-lg shadow-lg overflow-hidden">
            <div
                className="w-full h-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
            <div
                className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white bg-opacity-90"
            >
                <p className="text-sm font-semibold text-gray-800">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}
