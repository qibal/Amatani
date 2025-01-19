import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import GetUserDashboard from "../api/server_actions/dashboard/GetUserDashboard";

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