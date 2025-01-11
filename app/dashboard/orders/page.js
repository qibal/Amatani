"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { OrderTable } from "@/components/dashboard/orders/orderTables";

const ordersData = [
    {
        order_id: 1,
        user_id: "123",
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
    // Tambahkan data order lainnya jika diperlukan
];

const usersData = [
    { id: "123", email: "john.doe@example.com" },
    { id: "456", email: "jane.smith@example.com" },
    // Tambahkan data pengguna lainnya jika diperlukan
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

    const handleDeleteOrder = (orderId) => {
        setOrders(orders.filter((order) => order.order_id !== orderId));
    };

    return (
        <div>
            <header className="flex h-16 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="p-4 space-y-4 max-w-6xl mx-auto">
                <h1 className="text-lg font-semibold">Semua Orders</h1>
                <OrderTable
                    orders={orders}
                    onDelete={handleDeleteOrder}
                    getUserEmail={getUserEmail}
                />
            </div>
        </div>
    );
}
