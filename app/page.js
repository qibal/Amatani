'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [namaProduk, setnamaProduk] = useState('')
  const [message, setMessage] = useState('')
  const [listProduk, setListProduk] = useState([])
  console.log("🚀 ~ Home ~ listProduk:", listProduk)

  async function handleSubmit(e) {
    e.preventDefault(); // Mencegah halaman refresh

    if (!namaProduk) {
      setMessage('nama_produk tidak boleh kosong')
      return; // Hentikan jika namaProduk kosong
    }

    const response = await fetch('/api/be/produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama_produk: namaProduk }),
    })

    const data = await response.json()
    console.log("🚀 ~ handleSubmit ~ data:", data)

    if (response.ok) {
      setMessage(data.message)
    } else {
      setMessage('produk gagal ditambah')
    }
  }

  async function ListDocument() {
    const response = await fetch('/api/be/produk', {
      method: 'GET',
    })
    const data = await response.json()
    console.log("🚀 ~ ListDocument ~ data:", data)
    setListProduk(data.documents)
  }


  useEffect(() => {
    ListDocument()
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
}
