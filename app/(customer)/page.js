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
        <nav className="flex justify-between items-center py-2 px-4 fixed top-0 left-0 w-full z-10 bg-transparent">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img src="/FE/img02.png" alt="Logo kitaPanen" width={40} height={40} className="w-[40px] h-[40px]" />
            <p className="text-xl text-white font-semibold">kitaPanen</p>
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
                className="w-4 h-4 text-white"
              >
                <path
                  d="M9.99935 18.8333C14.6017 18.8333 18.3327 15.1023 18.3327 10.5C18.3327 5.89759 14.6017 2.16663 9.99935 2.16663C5.39698 2.16663 1.66602 5.89759 1.66602 10.5C1.66602 15.1023 5.39698 18.8333 9.99935 18.8333Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.66602 10.5H18.3327"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99935 2.16663C12.0837 4.44859 13.2683 7.40999 13.3327 10.5C13.2683 13.5899 12.0837 16.5513 9.99935 18.8333C7.91495 16.5513 6.73039 13.5899 6.66602 10.5C6.73039 7.40999 7.91495 4.44859 9.99935 2.16663Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-white">Bahasa Indonesia</p>
            </div>

            {/* Sign In */}
            <Button variant="ghost" className="flex items-center gap-1 w-16 h-8 rounded-2xl text-xs text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
              >
                <path
                  d="M16.6673 18V16.3333C16.6673 15.4493 16.3161 14.6014 15.691 13.9763C15.0659 13.3512 14.218 13 13.334 13H6.66732C5.78326 13 4.93542 13.3512 4.31029 13.9763C3.68517 14.6014 3.33398 15.4493 3.33398 16.3333V18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99935 9.66667C11.8403 9.66667 13.3327 8.17428 13.3327 6.33333C13.3327 4.49238 11.8403 3 9.99935 3C8.1584 3 6.66602 4.49238 6.66602 6.33333C6.66602 8.17428 8.1584 9.66667 9.99935 9.66667Z"
                  stroke="#fff"
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

        <footer className="py-8 bg-gray-50">
  <div className="container mx-auto px-4">
    {/* Garis pemisah */}
    <hr className="border-gray-200 mb-4" />

    {/* Bagian ikon pembayaran */}
    <div className="flex justify-center gap-4 mb-6">
      <img src="/icon-payment/bca.png" alt="BCA" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/bluepay.png" alt="Bluepay" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/BNI.png" alt="BNI" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/dana.png" alt="Dana" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/gopay.png" alt="GoPay" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/gpay.png" alt="Google Pay" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/mandiri.png" alt="Mandiri" className="w-12 h-8 object-contain" />
      <img src="/icon-payment/paypal.png" alt="PayPal" className="w-12 h-8 object-contain" />
    </div>

    {/* Bagian ikon media sosial */}
    <div className="flex justify-center gap-4">
      <a href="#" className="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.96 3.63 9.06 8.36 9.86v-6.99H8.47v-2.87h2.94v-2.2c0-2.92 1.79-4.51 4.4-4.51 1.25 0 2.34.09 2.66.14v3.09h-1.83c-1.43 0-1.71.68-1.71 1.67v1.81h2.88l-.38 2.87h-2.5V22c4.72-.8 8.35-4.9 8.35-9.86 0-5.5-4.46-9.96-9.96-9.96z" />
        </svg>
      </a>
      <a href="#" className="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16z" />
        </svg>
      </a>
      <a href="#" className="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43 1a9.05 9.05 0 01-2.88 1.1A4.52 4.52 0 0016.16 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.1 1.03A12.81 12.81 0 011 1.75a4.48 4.48 0 001.4 6.03 4.43 4.43 0 01-2.04-.56v.06c0 2.2 1.56 4.04 3.64 4.46a4.42 4.42 0 01-2.02.08 4.48 4.48 0 004.19 3.11 9 9 0 01-5.56 1.91A9.36 9.36 0 010 18.29 12.8 12.8 0 006.92 21c8.26 0 12.75-6.84 12.75-12.76v-.58A9.35 9.35 0 0023 3z" />
        </svg>
      </a>
      <a href="#" className="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.022 3.657 9.162 8.438 10.333-.115-.883-.219-2.234.046-3.193.234-.855 1.516-5.453 1.516-5.453s-.38-.76-.38-1.88c0-1.757 1.02-3.068 2.29-3.068 1.081 0 1.605.81 1.605 1.78 0 1.084-.692 2.703-1.048 4.207-.299 1.268.635 2.304 1.888 2.304 2.265 0 4.003-2.38 4.003-5.8 0-3.04-2.187-5.155-5.32-5.155-3.622 0-5.756 2.716-5.756 5.676 0 1.044.402 2.167.905 2.774.1.12.113.225.085.347-.094.381-.31 1.226-.352 1.394-.057.229-.187.278-.438.168-1.645-.734-2.674-3.042-2.674-4.894 0-4.014 3.004-7.698 8.685-7.698 4.559 0 8.101 3.252 8.101 7.593 0 4.51-2.842 8.149-6.78 8.149-1.325 0-2.571-.69-2.991-1.502 0 0-.656 2.601-.813 3.17-.248.947-.73 1.892-1.177 2.615C10.24 23.97 11.11 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  </div>
</footer>


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
