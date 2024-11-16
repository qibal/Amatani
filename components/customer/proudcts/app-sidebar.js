import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"

export function SidebarProducts() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupLabel>Kategori Produk</SidebarGroupLabel>
                    {/* data kate gori produk */}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
