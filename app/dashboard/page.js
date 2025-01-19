
// import Cardhome from "@/components/dashboard/Cardhome";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import RecentSalesCard from "@/components/dashboard/RScard";
// import WSchart from "@/components/dashboard/WSchart";

// // const stats = [
// //   {
// //     title: "Total Revenue",
// //     value: "$45,231.89",
// //     change: "+20.1% from last month",
// //     icon: "💵",
// //   },
// //   {
// //     title: "Subscriptions",
// //     value: "+2350",
// //     change: "+180.1% from last month",
// //     icon: "📈",
// //   },
// //   {
// //     title: "Sales",
// //     value: "+12,234",
// //     change: "+19% from last month",
// //     icon: "🛒",
// //   },
// //   {
// //     title: "Active Now",
// //     value: "+573",
// //     change: "+201 since last hour",
// //     icon: "📊",
// //   },
// // ];

// export default function Dashboard() {
//   return (
//     <>
//       <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//         <div className="flex items-center gap-2 px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator orientation="vertical" className="mr-2 h-4" />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem className="hidden md:block">
//                 <BreadcrumbLink href="#">
//                   Building Your Application
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator className="hidden md:block" />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>
//       </header>
//       <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//         {/* card */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
//           {stats.map((stat, index) => (
//             <Cardhome
//               key={index}
//               title={stat.title}
//               value={stat.value}
//               change={stat.change}
//               icon={stat.icon}
//             />
//           ))}
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//           <WSchart />
//           <RecentSalesCard />
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import Image from 'next/image';
import Head from 'next/head';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Dashboard() {
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
                        Menu Home Sedang Dalam Pengembangan
                    </h1>
                    <p className="text-gray-600">
                        Kami sedang bekerja keras untuk segera meluncurkan website ini. Silakan kembali lagi nanti!
                    </p>
                </div>
            </div>
        </>
    );
}