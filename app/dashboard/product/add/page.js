"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function AddProductPage() {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <h1 className="text-xl font-semibold">Edit produk</h1>
                        <div className="flex gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="default" className="bg-rose-600 hover:bg-rose-500">
                                Update produk
                            </Button>
                        </div>
                    </div>

                    {/* Nama Produk */}
                    <div className="space-y-2">
                        <Label>Nama Produk</Label>
                        <Input placeholder="Pisang muli" />
                        <p className="text-sm text-gray-500">Tidak boleh kosong</p>
                    </div>

                    {/* Kategori Produk */}
                    <div className="space-y-2">
                        <Label>Kategori Produk</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <span className="text-gray-500">Pilih Kategori</span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buah">Buah</SelectItem>
                                <SelectItem value="sayur">Sayur</SelectItem>
                                <SelectItem value="minuman">Minuman</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-500">Tidak boleh kosong</p>
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input type="number" placeholder="100" />
                        <p className="text-sm text-gray-500">Tidak boleh kosong</p>
                    </div>

                    {/* Deskripsi Produk */}
                    <div className="space-y-2">
                        <Label>Deskripsi Produk</Label>
                        <Textarea placeholder="Masukan Deskripsi Produk" />
                        <p className="text-sm text-gray-500">Tidak boleh lebih dari 200 huruf</p>
                    </div>

                    {/* Gambar */}
                    <div className="space-y-2">
                        <Label>Gambar</Label>
                        <div className="border border-dashed border-gray-300 rounded-lg flex justify-center items-center h-32">
                            <Upload className="text-gray-500" />
                            <span className="text-sm text-gray-500 ml-2">
                                Drag n drop file here or click to upload
                            </span>
                        </div>
                    </div>

                    {/* Harga */}
                    <div className="space-y-2">
                        <Label>Harga</Label>
                        <div className="flex gap-2">
                            <Input placeholder="Min Jumlah" className="flex-1" />
                            <span className="flex items-center justify-center text-gray-500">&gt;=</span>
                            <Input placeholder="Max Jumlah" className="flex-1" />
                            <span className="flex items-center justify-center text-gray-500">=</span>
                            <Input placeholder="Harga" className="flex-1" />
                        </div>
                        <p className="text-sm text-gray-500">Tidak boleh kosong</p>
                        <Button variant="outline" className="mt-2">
                            Tambah Harga
                        </Button>
                    </div>
                </div>

                {/* Kolom Pratinjau Produk */}
                <div className="space-y-6">
                    <p className="text-xl font-semibold">Pratinjau produk</p>
                    <div className="w-full h-[330px] bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
                        <img
                            src="/buah-buahan/img02.png"
                            alt="Pratinjau Produk"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="space-y-2 text-center">
                        <p className="text-lg font-semibold">Apel Gala</p>
                        <p className="text-sm text-gray-400">Buah buahan</p>
                        <p className="text-base font-bold text-rose-600">Rp 210,000 - Rp 980,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
