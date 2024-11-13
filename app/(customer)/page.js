'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProductGrid from './page2';
import ProductGrid2 from './page3';

export default function Home() {
  const [namaProduk, setnamaProduk] = useState('');
  const [message, setMessage] = useState('');
  const [listProduk, setListProduk] = useState([]);
  console.log("🚀 ~ Home ~ listProduk:", listProduk);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!namaProduk) {
      setMessage('nama_produk tidak boleh kosong');
      return;
    }

    const response = await fetch('/api/be/produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama_produk: namaProduk }),
    });

    const data = await response.json();
    console.log("🚀 ~ handleSubmit ~ data:", data);

    if (response.ok) {
      setMessage(data.message);
    } else {
      setMessage('produk gagal ditambah');
    }
  }

  async function ListDocument() {
    const response = await fetch('/api/be/produk', { method: 'GET' });
    const data = await response.json();
    console.log("🚀 ~ ListDocument ~ data:", data);
    setListProduk(data.documents);
  }

  useEffect(() => {
    ListDocument();
  }, []);

  // Dummy product data for the Product Section
  const products = [
    { imageSrc: "/FE/img01.jpg", name: "Apel Gala", category: "Buah-buahan", type: "3 Jenis", priceRange: "Rp 210,000 - Rp 980,000" },
    { imageSrc: "/FE/img01.jpg", name: "Pisang Ambon", category: "Buah-buahan", type: "7 Jenis", priceRange: "Rp 210,000 - Rp 980,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
    { imageSrc: "/FE/img01.jpg", name: "Anggur Lemberger", category: "Buah-buahan", type: "2 Jenis", priceRange: "Rp 290,000 - Rp 440,000" },
  ];

  return (
    <div>
      {/* Form Section */}
      {/* <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          className="text-black"
          placeholder="nama_produk"
          name="nama_produk"
          value={namaProduk}
          onChange={(e) => setnamaProduk(e.target.value)}
          required
        />
        {message && <p className="text-white">{message}</p>}
        <button type="submit" className="p-4 outline outline-rose-600">Submit</button>
      </form>

      <h1 className="font-bold text-lg">List Data (refresh halaman kalo sudah submit)</h1>
      <div>
        {listProduk.map((produk) => (
          <p className="text-white" key={produk.$id}>
            {produk.nama_produk}
          </p>
        ))}
      </div> */}

      {/* HOMEPAGE */}
      <div>
        {/* Navbar Header */}
        <nav className="flex justify-between items-center py-2 bg-white shadow-sm px-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img src="/FE/img02.png" alt="Logo kitaPanen" width={40} height={40} className="w-[40px] h-[40px]" />
            <p className="text-xl text-gray-800 font-semibold">kitaPanen</p>
          </div>

          {/* Right: Language, Sign In, Sign Up */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-800"
              >
                <path
                  d="M9.99935 18.8333C14.6017 18.8333 18.3327 15.1023 18.3327 10.5C18.3327 5.89759 14.6017 2.16663 9.99935 2.16663C5.39698 2.16663 1.66602 5.89759 1.66602 10.5C1.66602 15.1023 5.39698 18.8333 9.99935 18.8333Z"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.66602 10.5H18.3327"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99935 2.16663C12.0837 4.44859 13.2683 7.40999 13.3327 10.5C13.2683 13.5899 12.0837 16.5513 9.99935 18.8333C7.91495 16.5513 6.73039 13.5899 6.66602 10.5C6.73039 7.40999 7.91495 4.44859 9.99935 2.16663Z"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-gray-800">Bahasa Indonesia</p>
            </div>

            {/* Sign In */}
            <Button variant="ghost" className="flex items-center gap-1 w-16 h-8 rounded-2xl text-xs">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-800"
              >
                <path
                  d="M16.6673 18V16.3333C16.6673 15.4493 16.3161 14.6014 15.691 13.9763C15.0659 13.3512 14.218 13 13.334 13H6.66732C5.78326 13 4.93542 13.3512 4.31029 13.9763C3.68517 14.6014 3.33398 15.4493 3.33398 16.3333V18"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99935 9.66667C11.8403 9.66667 13.3327 8.17428 13.3327 6.33333C13.3327 4.49238 11.8403 3 9.99935 3C8.1584 3 6.66602 4.49238 6.66602 6.33333C6.66602 8.17428 8.1584 9.66667 9.99935 9.66667Z"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-gray-800">Masuk</p>
            </Button>

            {/* Sign Up */}
            <Button variant="default" className="w-16 h-8 rounded-2xl bg-[#dc253b] text-white text-xs">
              Daftar
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/FE/img01.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative flex flex-col justify-center items-start h-full px-8 lg:px-16">
            <h1 className="text-white text-4xl font-bold mb-2">Sumber Segar Untuk Usaha Anda</h1>
          </div>
        </div>

        {/* Culinary Businesses Section */}
        <div className="flex flex-col items-center py-16 bg-white">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
            Serving 18,000+ Culinary Businesses From <br /> Small Cafes To Full-Scale Restaurants.
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {Array(8).fill().map((_, index) => (
              <img
                key={index}
                src="/FE/img02.png"
                alt={`Logo ${index + 1}`}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="my-16 px-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Buah Buahan &gt;
          </h2>
          <div className="flex overflow-x-auto space-x-4 py-4 w-full">
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


        {/* page2.js */}
        <ProductGrid />
        <ProductGrid2 />
      </div>
    </div>
  );
}

// ProductCard Component
function ProductCard({ imageSrc, name, category, type, priceRange }) {
  return (
    <div className="w-[400px] h-[500px] flex-none bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-[400px] h-[370px] bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}></div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-sm text-gray-600">{type}</p>
        <p className="text-sm text-red-600 font-semibold mt-2">{priceRange}</p>
      </div>
    </div>
  );
}
