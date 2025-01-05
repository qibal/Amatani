"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UserTable } from "@/components/dashboard/customers/UserTable";
import { useState } from "react";


const initialUsers = [
    {
        "instance_id": "001",
        "id": "123",
        "aud": "authenticated",
        "role": "user",
        "email": "john.doe@example.com",
        "encrypted_password": "$2a$11$dxjOC1pMhkdo1234567890abcdefghijklmnopqrstuvwxyz",
        "email_confirmed_at": "2023-01-15T10:30:00+00:00",
        "invited_at": null,
        "confirmation_token": "",
        "confirmation_sent_at": null,
        "recovery_token": "",
        "recovery_sent_at": null,
        "email_change_token_new": "",
        "email_change": "",
        "email_change_sent_at": null,
        "last_sign_in_at": "2023-05-20T14:45:30+00:00",
        "raw_app_meta_data": {
            "provider": "email",
            "providers": ["email"]
        },
        "raw_user_meta_data": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "picture": "https://randomuser.me/api/portraits/men/1.jpg",
            "full_name": "John Doe",
            "avatar_url": "https://randomuser.me/api/portraits/men/1.jpg",
            "provider_id": "",
            "email_verified": true,
            "phone_verified": true
        },
        "is_super_admin": null,
        "created_at": "2023-01-01T00:00:00+00:00",
        "updated_at": "2023-05-20T14:45:30+00:00",
        "phone": "+1234567890",
        "phone_confirmed_at": "2023-01-15T10:35:00+00:00",
        "phone_change": "",
        "phone_change_token": "",
        "phone_change_sent_at": null,
        "confirmed_at": "2023-01-15T10:30:00+00:00",
        "email_change_token_current": "",
        "email_change_confirm_status": 0,
        "banned_until": null,
        "reauthentication_token": "",
        "reauthentication_sent_at": null,
        "is_sso_user": false,
        "deleted_at": null,
        "is_anonymous": false
    },
    {
        "instance_id": "002",
        "id": "456",
        "aud": "authenticated",
        "role": "admin",
        "email": "jane.smith@example.com",
        "encrypted_password": "$2a$11$abcdefghijklmnopqrstuvwxyz1234567890",
        "email_confirmed_at": "2023-02-20T09:15:00+00:00",
        "invited_at": null,
        "confirmation_token": "",
        "confirmation_sent_at": null,
        "recovery_token": "",
        "recovery_sent_at": null,
        "email_change_token_new": "",
        "email_change": "",
        "email_change_sent_at": null,
        "last_sign_in_at": "2023-05-21T11:30:45+00:00",
        "raw_app_meta_data": {
            "provider": "google",
            "providers": ["google"]
        },
        "raw_user_meta_data": {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "picture": "https://randomuser.me/api/portraits/women/2.jpg",
            "full_name": "Jane Smith",
            "avatar_url": "https://randomuser.me/api/portraits/women/2.jpg",
            "provider_id": "987654321",
            "email_verified": true,
            "phone_verified": false
        },
        "is_super_admin": true,
        "created_at": "2023-02-01T00:00:00+00:00",
        "updated_at": "2023-05-21T11:30:45+00:00",
        "phone": "+9876543210",
        "phone_confirmed_at": null,
        "phone_change": "",
        "phone_change_token": "",
        "phone_change_sent_at": null,
        "confirmed_at": "2023-02-20T09:15:00+00:00",
        "email_change_token_current": "",
        "email_change_confirm_status": 0,
        "banned_until": null,
        "reauthentication_token": "",
        "reauthentication_sent_at": null,
        "is_sso_user": true,
        "deleted_at": null,
        "is_anonymous": false
    },
    {
        "instance_id": "003",
        "id": "789",
        "aud": "authenticated",
        "role": "user",
        "email": "alice.johnson@example.com",
        "encrypted_password": "$2a$11$zyxwvutsrqponmlkjihgfedcba9876543210",
        "email_confirmed_at": null,
        "invited_at": "2023-05-01T08:00:00+00:00",
        "confirmation_token": "abc123",
        "confirmation_sent_at": "2023-05-01T08:00:00+00:00",
        "recovery_token": "",
        "recovery_sent_at": null,
        "email_change_token_new": "",
        "email_change": "",
        "email_change_sent_at": null,
        "last_sign_in_at": null,
        "raw_app_meta_data": {
            "provider": "email",
            "providers": ["email"]
        },
        "raw_user_meta_data": {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "picture": "https://randomuser.me/api/portraits/women/3.jpg",
            "full_name": "Alice Johnson",
            "avatar_url": "https://randomuser.me/api/portraits/women/3.jpg",
            "provider_id": "",
            "email_verified": false,
            "phone_verified": false
        },
        "is_super_admin": null,
        "created_at": "2023-05-01T08:00:00+00:00",
        "updated_at": "2023-05-01T08:00:00+00:00",
        "phone": null,
        "phone_confirmed_at": null,
        "phone_change": "",
        "phone_change_token": "",
        "phone_change_sent_at": null,
        "confirmed_at": null,
        "email_change_token_current": "",
        "email_change_confirm_status": 0,
        "banned_until": null,
        "reauthentication_token": "",
        "reauthentication_sent_at": null,
        "is_sso_user": false,
        "deleted_at": null,
        "is_anonymous": false
    },
    {
        "instance_id": "004",
        "id": "101",
        "aud": "authenticated",
        "role": "user",
        "email": "bob.williams@example.com",
        "encrypted_password": "$2a$11$lmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
        "email_confirmed_at": "2023-03-10T14:20:00+00:00",
        "invited_at": null,
        "confirmation_token": "",
        "confirmation_sent_at": null,
        "recovery_token": "",
        "recovery_sent_at": null,
        "email_change_token_new": "",
        "email_change": "",
        "email_change_sent_at": null,
        "last_sign_in_at": "2023-05-22T09:15:30+00:00",
        "raw_app_meta_data": {
            "provider": "email",
            "providers": ["email"]
        },
        "raw_user_meta_data": {
            "name": "Bob Williams",
            "email": "bob.williams@example.com",
            "picture": "https://randomuser.me/api/portraits/men/4.jpg",
            "full_name": "Bob Williams",
            "avatar_url": "https://randomuser.me/api/portraits/men/4.jpg",
            "provider_id": "",
            "email_verified": true,
            "phone_verified": true
        },
        "is_super_admin": null,
        "created_at": "2023-03-10T14:20:00+00:00",
        "updated_at": "2023-05-22T09:15:30+00:00",
        "phone": "+1122334455",
        "phone_confirmed_at": "2023-03-10T14:25:00+00:00",
        "phone_change": "",
        "phone_change_token": "",
        "phone_change_sent_at": null,
        "confirmed_at": "2023-03-10T14:20:00+00:00",
        "email_change_token_current": "",
        "email_change_confirm_status": 0,
        "banned_until": "2023-06-22T00:00:00+00:00",
        "reauthentication_token": "",
        "reauthentication_sent_at": null,
        "is_sso_user": false,
        "deleted_at": null,
        "is_anonymous": false
    }
]

export default function OrdersPage() {
    const [users, setUsers] = useState(initialUsers)

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId))
    }

    const handleEditUser = (userId) => {
        // Implement edit functionality
        console.log('Edit user:', userId)
    }
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
                <h1 className="text-lg font-semibold">Semua Customers</h1>
                <UserTable users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />

            </div>

        </div>
    );
}
