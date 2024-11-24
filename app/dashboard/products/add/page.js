"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectSeparator } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import MultiImageUploader from "@/components/dashboard/product/InputDropZone/MultiImageUploader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const [images, setimage] = useState([])
    const router = useRouter()

    function EditData() {

        router.push('/dashboard')
    }

    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="p-6 container mx-auto space-y-6">
                <div className="lg:flex justify-between sm:gap-x-4 xl:gap-x-20">
                    {/* Kolom Form */}
                    <div className=" space-y-6  lg:w-4/6 ">
                        {/* Header */}
                        <div className="flex justify-between items-center -b pb-4">
                            <h1 className="text-xl font-semibold">Tambah produk</h1>
                            <div className="flex gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button variant="default" onClick={() => { EditData() }} className="bg-rose-600 hover:bg-rose-500">
                                    Simpan
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
                        <MultiImageUploader image={setimage} />

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
                    {/* Kolom Pratinjau Produk card*/}
                    <div className="flex flex-col grow gap-y-10 ">
                        {/* pratinjau 1 */}
                        <div className="space-y-6  ">
                            <p className="text-xl font-semibold">Pratinjau Card produk</p>
                            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100  overflow-hidden flex justify-center items-center">
                                <AspectRatio ratio={1 / 1}>
                                    <img
                                        src={images?.length > 0 ? images[0] : "/FE/img02.png"}
                                        alt="Pratinjau Produk"
                                        className="object-cover w-full h-full"
                                    />
                                </AspectRatio>
                            </div>
                            <div className="space-y-2 ">
                                <p className="text-lg font-semibold">Apel Gala</p>
                                <p className="text-sm text-gray-400">Buah buahan</p>
                                <p className="text-base font-bold text-rose-600">Rp 210,000 - Rp 980,000</p>
                            </div>
                        </div>
                        <SelectSeparator />
                        {/* pratinjau 2*/}
                        <div className="space-y-6  grow">
                            <p className="text-xl font-semibold">Pratinjau Android</p>
                            <div className="flex flex-col gap-y-4">
                                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100  overflow-hidden flex justify-center items-center">
                                    <AspectRatio ratio={1 / 1}>
                                        <img
                                            src={images?.length > 0 ? images[0] : "/FE/img02.png"}
                                            alt="Pratinjau Produk"
                                            className="object-cover w-full h-full"
                                        />
                                    </AspectRatio>
                                </div>
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {images.slice(1).map((image, index) => (
                                            <>
                                                <div key={index + 1} className="w-24 aspect-w-1 aspect-h-1 bg-gray-100  overflow-hidden flex justify-center items-center">
                                                    <AspectRatio ratio={1 / 1}>
                                                        <img
                                                            src={image}
                                                            alt="Pratinjau Produk"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </AspectRatio>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-24 aspect-w-1 aspect-h-1 bg-gray-100  overflow-hidden flex justify-center items-center">
                                        <AspectRatio ratio={1 / 1}>
                                            <img
                                                src={images?.length > 0 ? images : "/FE/img02.png"}
                                                alt="Pratinjau Produk"
                                                className="object-cover w-full h-full"
                                            />
                                        </AspectRatio>
                                    </div>
                                )}

                            </div>
                            <div className="space-y-2 ">
                                <p className="text-lg font-semibold">Apel Gala</p>
                                <p className="text-sm text-gray-400">Buah buahan</p>
                                <p className="text-base font-bold text-rose-600">Rp 210,000 - Rp 980,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
