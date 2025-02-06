"use client";
import Image from 'next/image';
import Head from 'next/head';
import { SidebarTrigger } from "@/components/shadcnUi/sidebar";
import { Separator } from "@/components/shadcnUi/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcnUi/breadcrumb";

export default function Penilaian() {
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
                            <BreadcrumbPage>Penilaian</BreadcrumbPage>
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
                        Menu Penilaian Sedang Dalam Pengembangan
                    </h1>
                    <p className="text-gray-600">
                        Kami sedang bekerja keras untuk segera meluncurkan website ini. Silakan kembali lagi nanti!
                    </p>
                </div>
            </div>
        </>
    );
}