// "use client";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Separator } from "@/components/ui/separator";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// import { useEffect, useState } from "react";
// import { OrderTable } from "@/components/dashboard/orders/orderTables";

// const ordersData = [
//     {
//         order_id: 1,
//         user_id: "123",
//         order_status: "pending",
//         total_amount: 150000,
//         order_date: "2024-11-18T15:30:45Z",
//         payment: {
//             payment_status: "pending",
//             payment_method: "Credit Card",
//         },
//         details: [
//             { product_id: 1, quantity: 2, price_at_purchase: 50000 },
//             { product_id: 2, quantity: 1, price_at_purchase: 50000 },
//         ],
//     },
//     // Tambahkan data order lainnya jika diperlukan
// ];

// const usersData = [
//     { id: "123", email: "john.doe@example.com" },
//     { id: "456", email: "jane.smith@example.com" },
//     // Tambahkan data pengguna lainnya jika diperlukan
// ];

// export default function OrdersPage() {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         // Simulating data fetch
//         setOrders(ordersData); // Replace with API call to fetch data
//     }, []);

//     const getUserEmail = (userId) => {
//         const user = usersData.find((user) => user.id === userId);
//         return user ? user.email : "Unknown User";
//     };

//     const handleDeleteOrder = (orderId) => {
//         setOrders(orders.filter((order) => order.order_id !== orderId));
//     };

//     return (
//         <div>
//             <header className="flex h-16 items-center gap-2 px-4">
//                 <SidebarTrigger className="-ml-1" />
//                 <Separator orientation="vertical" className="mr-2 h-4" />
//                 <Breadcrumb>
//                     <BreadcrumbList>
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator />
//                         <BreadcrumbItem>
//                             <BreadcrumbPage>Orders</BreadcrumbPage>
//                         </BreadcrumbItem>
//                     </BreadcrumbList>
//                 </Breadcrumb>
//             </header>
//             <div className="p-4 space-y-4 max-w-6xl mx-auto">
//                 <h1 className="text-lg font-semibold">Semua Orders</h1>
//                 <OrderTable
//                     orders={orders}
//                     onDelete={handleDeleteOrder}
//                     getUserEmail={getUserEmail}
//                 />
//             </div>
//         </div>
//     );
// }

"use client";
import Image from 'next/image';
import Head from 'next/head';
import { SidebarTrigger } from "@/components/shadcnUi/sidebar";
import { Separator } from "@/components/shadcnUi/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcnUi/breadcrumb";

export default function OrdersPage() {
    return (
        <>
            <Head>
                <title>Website Sedang Dalam Pengembangan</title>
                <meta name="description" content="Website ini sedang dalam pengembangan. Kembali lagi nanti." />
            </Head>
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
            <div className="flex items-center justify-center min-h-screen ">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/FE/worker.svg"
                            alt="Worker SVG"
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Menu Orders Sedang Dalam Pengembangan
                    </h1>
                    <p className="text-gray-600">
                        Kami sedang bekerja keras untuk segera meluncurkan website ini. Silakan kembali lagi nanti!
                    </p>
                </div>
            </div>
        </>
    );
}