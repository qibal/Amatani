"use client";
import { SidebarTrigger } from "@/components/shadcnUi/sidebar";
import { Separator } from "@/components/shadcnUi/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcnUi/breadcrumb";
import { UserTable } from "@/components/dashboard/customers/UserTable";
import { useEffect, useState } from "react";
import supabaseAuthAdmin from "../../../../lib/supabase/client_admin";


export default function CustomersPage() {
    const [users, setUsers] = useState([]);

    const handleDeleteUser = async (userId) => {
        setUsers(users.filter(user => user.id !== userId));
        const { data, error } = await supabaseAuthAdmin.auth.admin.deleteUser(
            'user_Id'
        )

    };

    const handleEditUser = (userId) => {
        // Implement edit functionality
        console.log('Edit user:', userId);
    };

    useEffect(() => {
        async function fetchUsers() {
            const { data: { users }, error } = await supabaseAuthAdmin.auth.admin.listUsers();
            if (error) {
                console.error("Error fetching users:", error);
            } else {
                setUsers(users);
            }
        }
        fetchUsers();
    }, []);

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
                                    Customers
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {/* <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem> */}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            {/* menu */}
            <div className="p-4 space-y-4  sm:mx-12">
                {/* Header */}
                <h1 className="text-lg font-semibold">Semua Customers</h1>
                <UserTable users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
            </div>
        </div>
    );
}