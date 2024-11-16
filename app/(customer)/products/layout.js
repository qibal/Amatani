import { SidebarProducts } from "@/components/customer/proudcts/app-sidebar";
import { CustomTrigger } from "@/components/customer/proudcts/custom-trigger";



import {
    SidebarInset,
    SidebarProvider,

} from "@/components/ui/sidebar"
import { ChevronDown, Search } from "lucide-react";


export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <SidebarProducts />
            <SidebarInset>
                <header className="flex justify-between items-center w-full px-6 py-4 bg-white shadow-sm">
                    {/* Hasil Pencarian */}
                    <div className="flex flex-col justify-between items-start w-full max-w-md">
                        <p className="text-sm text-left text-gray-800">Hasil pencarian:</p>
                        <p className="text-xl font-semibold text-left text-gray-800">Apel (20)</p>
                    </div>
                    {/* Search and Filter Controls */}
                    <div className="flex justify-center items-center gap-3">
                        {/* Search Bar */}
                        <div className="flex justify-between items-center w-full max-w-xs h-9 px-2 py-1 rounded-full bg-white border border-gray-800">
                            <div className="flex items-center gap-2 pl-2">
                                <Search className="w-4 h-4 text-gray-500" />
                                <p className="text-base text-center text-gray-600">Cari produk</p>
                            </div>
                            <div className="flex justify-center items-center p-2 rounded-full bg-red-100">
                                <p className="text-base text-center text-red-500">Cari</p>
                            </div>
                        </div>

                        {/* filter button */}
                        <CustomTrigger />

                        <div className="flex justify-start items-center gap-1.5 px-3 py-1.5">
                            <p className="text-base font-semibold text-center text-gray-800">Sort By</p>
                            <ChevronDown className="w-6 h-6 text-gray-800" />
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}