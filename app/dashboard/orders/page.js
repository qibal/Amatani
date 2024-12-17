"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, ShoppingCart, TrendingUp, User, Search, MoreHorizontal, Printer, SortDesc, X, Ellipsis } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";



// Data Dummy
const ordersData = [
    {
        order_id: 1,
        user_id: "123e4567-e89b-12d3-a456-426614174000",
        order_status: "pending",
        total_amount: 150000,
        order_date: "2024-11-18T15:30:45Z",
        payment: {
            payment_status: "pending",
            payment_method: "Credit Card",
        },
        details: [
            { product_id: 1, quantity: 2, price_at_purchase: 50000 },
            { product_id: 2, quantity: 1, price_at_purchase: 50000 },
        ],
    },
    {
        order_id: 2,
        user_id: "987e6543-b21c-34a5-b456-123456789012",
        order_status: "processed",
        total_amount: 200000,
        order_date: "2024-11-17T10:15:30Z",
        payment: {
            payment_status: "completed",
            payment_method: "PayPal",
        },
        details: [
            { product_id: 3, quantity: 4, price_at_purchase: 50000 },
        ],
    },
    {
        order_id: 3,
        user_id: "456e1234-b21c-56a7-c890-987654321000",
        order_status: "shipped",
        total_amount: 300000,
        order_date: "2024-11-16T14:00:00Z",
        payment: {
            payment_status: "completed",
            payment_method: "Bank Transfer",
        },
        details: [
            { product_id: 1, quantity: 3, price_at_purchase: 100000 },
        ],
    },
    {
        order_id: 4,
        user_id: "321e7890-c43d-98a7-e654-123456789000",
        order_status: "delivered",
        total_amount: 500000,
        order_date: "2024-11-15T09:45:30Z",
        payment: {
            payment_status: "completed",
            payment_method: "Credit Card",
        },
        details: [
            { product_id: 2, quantity: 5, price_at_purchase: 100000 },
        ],
    },
    {
        order_id: 5,
        user_id: "654e3210-d87f-45b2-g321-789456123000",
        order_status: "cancelled",
        total_amount: 100000,
        order_date: "2024-11-14T08:30:00Z",
        payment: {
            payment_status: "failed",
            payment_method: "PayPal",
        },
        details: [
            { product_id: 3, quantity: 1, price_at_purchase: 100000 },
        ],
    },
];

const usersData = [
    {
        id: "123e4567-e89b-12d3-a456-426614174000",
        email: "user1@example.com",
        role: "customer",
    },
    {
        id: "987e6543-b21c-34a5-b456-123456789012",
        email: "user2@example.com",
        role: "admin",
    },
];

const productsData = [
    {
        product_id: 1,
        name: "Product A",
        description: "Description of Product A",
        stock: 100,
    },
    {
        product_id: 2,
        name: "Product B",
        description: "Description of Product B",
        stock: 50,
    },
    {
        product_id: 3,
        name: "Product C",
        description: "Description of Product C",
        stock: 20,
    },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Simulating data fetch
        setOrders(ordersData); // Replace with API call to fetch data
    }, []);

    const getUserEmail = (userId) => {
        const user = usersData.find((user) => user.id === userId);
        return user ? user.email : "Unknown User";
    };

    const getProductDetails = (productId) => {
        const product = productsData.find((product) => product.product_id === productId);
        return product ? product.name : "Unknown Product";
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleViewDetails = (order) => {
        const details = order.details
            .map(
                (detail) =>
                    `Product: ${getProductDetails(detail.product_id)}\nQuantity: ${detail.quantity}\nPrice at Purchase: ${formatCurrency(detail.price_at_purchase)}\n`
            )
            .join("\n");
        const total = `Total Amount: ${formatCurrency(order.total_amount)}`;
        alert(`Order Details:\n\n${details}\n${total}`);
    };

    const handlePrintReceipt = (order) => {
        // Placeholder logic for printing a receipt
        alert(`Printing receipt for Order ID: ${order.order_id}`);
    };
    const stats = [
        {
            title: "Total Revenue",
            value: "+12,234",
            change: "+19% from last month",
            icon: <CreditCard />,
        },
        {
            title: "Barang di Keranjang",
            value: "+12,234",
            change: "+19% from last month",
            icon: <ShoppingCart />,
        },
        {
            title: "Sales",
            value: "+12,234",
            change: "+19% from last month",
            icon: <TrendingUp />,
        },
        {
            title: "Belum di Bayar",
            value: "+12 Jt",
            change: "+19% from last month",
            icon: <User />,
        },
    ];
    const getOrderStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "text-yellow-500";
            case "processed":
                return "text-blue-500";
            case "shipped":
                return "text-purple-500";
            case "delivered":
                return "text-green-500";
            case "cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    // Function to get color class for payment status
    const getPaymentStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "text-yellow-500";
            case "completed":
                return "text-green-500";
            case "failed":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

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
            {/* menu */}
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
                        <div className="relative flex items-center w-full lg:w-[300px]">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 pr-8 rounded-full"
                            />
                            <Button
                                size="icon"
                                className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                            >
                                <X className="h-4 w-4 text-gray-950" />
                            </Button>
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
            {/* table */}
            <div className="p-4 space-y-4 max-w-6xl mx-auto">
                <Table className="min-w-full border-collapse">
                    <TableCaption>A list of your recent orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border p-2 text-center">Order ID</TableHead>
                            <TableHead className="border p-2 text-center">User Email</TableHead>
                            <TableHead className="border p-2 text-center">Order Status</TableHead>
                            <TableHead className="border p-2 text-center">Total Amount</TableHead>
                            <TableHead className="border p-2 text-center">Order Date & Time</TableHead>
                            <TableHead className="border p-2 text-center">Payment Status</TableHead>
                            <TableHead className="border p-2 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.order_id} className="border-t">
                                <TableCell className="p-2">{order.order_id}</TableCell>
                                <TableCell className="p-2">{getUserEmail(order.user_id)}</TableCell>
                                <TableCell className={`p-2 ${getOrderStatusColor(order.order_status)}`}>
                                    {order.order_status}
                                </TableCell>
                                <TableCell className="p-2">{formatCurrency(order.total_amount)}</TableCell>
                                <TableCell className="p-2">{formatDate(order.order_date)}</TableCell>
                                <TableCell className={`p-2 ${getPaymentStatusColor(order.payment.payment_status)}`}>
                                    {order.payment.payment_status} ({order.payment.payment_method})
                                </TableCell>
                                <TableCell className="p-2 flex space-x-2 items-center justify-center">
                                    <Button variant="outline" size="icon" onClick={() => handleViewDetails(order)} className="">
                                        <Printer className="w-4 h-4" />
                                    </Button>
                                    {order.payment.payment_status === "completed" && (
                                        <Button variant="outline" size="icon" onClick={() => handlePrintReceipt(order)} className="">
                                            <Ellipsis className="w-4 h-4" />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-left">
                                {formatCurrency(orders.reduce((total, order) => total + order.total_amount, 0))}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
