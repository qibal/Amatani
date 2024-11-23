"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, ShoppingCart, TrendingUp, User, Search, MoreHorizontal, Printer, SortDesc, X } from "lucide-react";

export default function OrdersPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "+12,234",
            change: "+19% from last month",
            icon: <CreditCard/>,
        },
        {
            title: "Barang di Keranjang",
            value: "+12,234",
            change: "+19% from last month",
            icon: <ShoppingCart/>,
        },
        {
            title: "Sales",
            value: "+12,234",
            change: "+19% from last month",
            icon: <TrendingUp/>,
        },
        {
            title: "Belum di Bayar",
            value: "+12 Jt",
            change: "+19% from last month",
            icon: <User/>,
        },
    ];

    return (
        <div className="p-4 space-y-4 max-w-6xl mx-auto">
            {/* Header */}
            <h1 className="text-lg font-semibold">Semua Order</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-2">
                        <CardHeader className="p-2">
                            <CardTitle className="text-sm flex justify-between">{stat.title}{stat.icon}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <p className="text-xl font-bold">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm">Belum Bayar</Button>
                    <Button variant="outline" size="sm">Dibayar</Button>
                    <Button variant="outline" size="sm">Perlu Dikirim</Button>
                    <Button variant="outline" size="sm">Dikirim</Button>
                    <Button variant="outline" size="sm">Dibatalkan</Button>
                    <Button variant="outline" size="sm">Selesai</Button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-full px-3">
                        <Search className="w-4 h-4 text-gray-500" />
                        <Input type="text" placeholder="Value" className="border-none focus:ring-0 text-sm w-32 md:w-48" />
                        <X className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </div>
                    <Button variant="outline" size="sm">
                        Sort by
                        <SortDesc className="w-4 h-4 ml-1" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem>Print</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
