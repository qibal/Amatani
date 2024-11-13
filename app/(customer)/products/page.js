export default function Product() {
    const products = [
        { imageSrc: "/FE/img01.jpg", name: "Apel Gala", category: "Buah-buahan", type: "3 Jenis", priceRange: "Rp 210,000 - Rp 980,000" },
        { imageSrc: "/FE/img01.jpg", name: "Pisang Ambon", category: "Buah-buahan", type: "7 Jenis", priceRange: "Rp 210,000 - Rp 980,000" },
        { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
        { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
        { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
        { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
        // ... Produk lainnya ...
    ];

    return (
        <div className="my-16 px-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Buah Buahan &gt;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        imageSrc={product.imageSrc}
                        name={product.name}
                        category={product.category}
                        type={product.type}
                        priceRange={product.priceRange}
                    />
                ))}
            </div>
        </div>
    );
}

function ProductCard({ imageSrc, name, category, type, priceRange }) {
    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}></div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600">{category}</p>
                <p className="text-sm text-gray-600">{type}</p>
                <p className="text-sm text-red-600 font-semibold mt-2">{priceRange}</p>
            </div>
        </div>
    );
}
