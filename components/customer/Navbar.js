import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { Search, Menu, X, Globe, ShoppingCart, ArrowDown, AlignJustify, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            {/* Navbar */}
            <header className="fixed w-full top-0 left-0 z-50 bg-trbansparent">
                {/* Tingkatan 1 */}
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-16 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-500 w-8 h-8 rounded-md" />
                        <span className="text-white font-bold text-lg">KitaPanen</span>
                    </div>

                    {/* Icon dan Daftar */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-white">
                            <Globe className="w-5 h-5" />
                            <span className="text-sm">Bahasa Indonesia</span>
                        </div>
                        <ShoppingCart className="text-white w-5 h-5 cursor-pointer" />
                        {/* drop down  */}

                        <HoverCard openDelay={0} closeDelay={100}>
                            <HoverCardTrigger asChild className="bg-[#DB2439] text-white rounded-md px-4 py-2 flex items-center space-x-2 border-none shadow-md hover:bg-[#C22235] transition">
                                <div className="cursor-default">
                                    <span>Daftar</span>
                                    <ChevronDown className="w-4 h-4" />

                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="-translate-x-4 flex flex-col gap-y-1 p-1 w-36">
                                <Button asChild>
                                    <Link href="/daftar" >Daftar</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/masuk">Masuk</Link>
                                </Button>
                                {/* <div className="flex justify-between space-x-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/vercel.png" />
                                        <AvatarFallback>VC</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">@nextjs</h4>
                                        <p className="text-sm">
                                            The React Framework – created and maintained by @vercel.
                                        </p>
                                        <div className="flex items-center pt-2">
                                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                            <span className="text-xs text-muted-foreground">
                                                Joined December 2021
                                            </span>
                                        </div>
                                    </div>
                                </div> */}
                            </HoverCardContent>
                        </HoverCard>
                        {/* <Button
                            variant="outline"
                            className=""
                        >

                        </Button> */}

                        <Menu
                            className="w-6 h-6 text-white md:hidden cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        />
                    </div>
                </div>

                {/* Tingkatan 2 */}
                <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-4 md:px-16 py-2 text-sm text-white">
                    {/* Sebelah kiri */}
                    <div className="flex items-center space-x-4">
                        <AlignJustify className="w-5 h-5" />
                        <span>Kategori Produk</span>
                    </div>

                    {/* Sebelah kanan */}
                    <div className="flex items-center space-x-6">
                        <button className="hover:text-gray-300">Tentang Kami</button>
                        <button className="hover:text-gray-300">Pusat Bantuan</button>
                        <button className="hover:text-gray-300">Bekerja Sama</button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black/75 z-50 flex flex-col items-center justify-center space-y-6 text-white">
                        <X
                            className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <button>Kategori Produk</button>
                        <button>Tentang Kami</button>
                        <button>Pusat Bantuan</button>
                        <button>Bekerja Sama</button>
                    </div>
                )}
            </header>
        </>
    )
}