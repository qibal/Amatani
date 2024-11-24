"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, ShoppingCart, TrendingUp, User, Search, MoreHorizontal, Printer, SortDesc, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";



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
            {/* table */}
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">User Email</th>
                        <th className="border p-2">Order Status</th>
                        <th className="border p-2">Total Amount</th>
                        <th className="border p-2">Order Date & Time</th>
                        <th className="border p-2">Payment Status</th>
                        <th className="border p-2">Details</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id} className="border-t">
                            <td className="p-2">{order.order_id}</td>
                            <td className="p-2">{getUserEmail(order.user_id)}</td>
                            <td className={`p-2 ${getOrderStatusColor(order.order_status)}`}>{order.order_status}</td>
                            <td className="p-2">{formatCurrency(order.total_amount)}</td>
                            <td className="p-2">{formatDate(order.order_date)}</td>
                            <td className={`p-2 ${getPaymentStatusColor(order.payment.payment_status)}`}>
                                {order.payment.payment_status} ({order.payment.payment_method})
                            </td>
                            <td className="p-2">
                                <button
                                    type="button"
                                    onClick={() => handleViewDetails(order)}
                                    className="text-blue-500 underline"
                                >
                                    View Details
                                </button>
                            </td>
                            <td className="p-2">
                                {order.payment.payment_status === "completed" && (
                                    <button
                                        type="button"
                                        onClick={() => handlePrintReceipt(order)}
                                        className="text-green-500 flex items-center space-x-1"
                                    >
                                        <Printer className="w-4 h-4" />
                                        <span>Print Receipt</span>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
