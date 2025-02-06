import { AppSidebar } from "@/components/dashboard/appSidebar"
import { SidebarInset, SidebarProvider } from "@/components/shadcnUi/sidebar"
import GetUserDashboard from "../../actions/v1/admin/GetUserDashboard";

export default async function DashboardLayout({ children }) {
    const auth = await GetUserDashboard()
    console.log("🚀 ~ DashboardLayout ~ auth:", auth)

    return (
        <SidebarProvider>
            <appSidebar user={auth.user} />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}