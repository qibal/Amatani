"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";



const Page = () => {
    const dummyData = [
        {
            id: "ORD_10506099",
            email: "user1@gmail.com",
            statusOrder: "Selesai",
            total: "Rp 150.000",
            orderDate: "Senin, 18 Nov 2024, 22:30",
            paymentStatus: "Berhasil (BNI)",
        },
        {
            id: "ORD_10506100",
            email: "user2@gmail.com",
            statusOrder: "Dikirim",
            total: "Rp 200.000",
            orderDate: "Selasa, 19 Nov 2024, 14:20",
            paymentStatus: "Berhasil (BCA)",
        },
        // Add more dummy data as needed
    ];

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
            <div className="flex flex-col gap-6 p-6 rounded-lg">
                <p className="text-xl font-semibold text-black">Semua Order</p>

                <div className="flex justify-between gap-4">
                    <Card className="w-60">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-[#020617]">Total Revenue</p>
                                {/* Icon */}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-[#020617]">+12,234</p>
                            <p className="text-xs text-slate-500">+19% dari bulan lalu</p>
                        </CardContent>
                    </Card>

                    {/* Repeat other cards similarly */}
                    <Card className="w-60">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-[#020617]">Barang di Keranjang</p>
                                {/* Icon */}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-[#020617]">+5,678</p>
                            <p className="text-xs text-slate-500">+15% dari bulan lalu</p>
                        </CardContent>
                    </Card>

                    {/* Add more cards as needed */}
                </div>

                {/* Filter Buttons */}
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <Button variant="outline">Belum Bayar</Button>
                        <Button variant="outline">Dibayar</Button>
                        <Button variant="outline">Perlu Dikirim</Button>
                        <Button variant="outline">Dikirim</Button>
                        <Button variant="outline">Dibatalkan</Button>
                        <Button variant="outline">Selesai</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input placeholder="Search..." />
                        <Button variant="outline">Sort by</Button>
                        <Button variant="outline">More</Button>
                    </div>
                </div>

                {/* Orders Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status Order</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dummyData.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>
                                    <Badge variant="success">{order.statusOrder}</Badge>
                                </TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>
                                    <Badge variant="success">{order.paymentStatus}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline">View</Button>
                                        <Button variant="outline">More</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Page;