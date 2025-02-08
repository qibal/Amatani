import { AppSidebar } from "@/components/dashboard/appSidebar"
import { SidebarInset, SidebarProvider } from "@/components/shadcnUi/sidebar"
import GetUserDashboard from "../../../api v1/actions v1/v1/admin/GetUserDashboard";

export default async function DashboardLayout({ children }) {
    const auth = await GetUserDashboard()
    console.log("🚀 ~ DashboardLayout ~ auth:", auth)

    return (
        <SidebarProvider>
            <AppSidebar user={auth.user} />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}