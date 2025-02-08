'use client'

import {
  ChartColumnIncreasing,
  ChevronsUpDown,
  FileQuestion,
  LogOut,
  Package2,
  ShoppingCart,
  Star,
  UsersRound,
  WalletMinimal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/shadcnUi/sidebar"
import { Home } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../shadcnUi/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnUi/avatar"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../shadcnUi/button"
import { Logout } from "@/api v1/actions v1/v1/Auth"

export function AppSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter()

  const userName = user?.user_metadata?.name || "Loading...";
  const userEmail = user?.user_metadata?.email || "Loading...";
  const userAvatar = user?.user_metadata?.avatar_url || "/FE/img02.png";

  return (
    <Sidebar collapsible="icon">
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Avatar>
              <AvatarImage src="\FE\IconAmatani.svg" />
              <AvatarFallback>KP</AvatarFallback>
            </Avatar>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* content */}
      <SidebarContent>
        {/* group 1 */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                  <a href="/admin">
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* grouop 2 */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')}>
                  <a href="/admin/products">
                    <Package2 />
                    <span>Produk</span>
                  </a>
                </SidebarMenuButton>
                {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/orders')}>
                  <a href="/admin/orders">
                    <ShoppingCart />
                    <span>Pesanan</span>
                  </a>
                </SidebarMenuButton>
                {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/penilaian')}>
                  <a href="/admin/penilaian">
                    <Star />
                    <span>Penilaian</span>
                  </a>
                </SidebarMenuButton>
                {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* group 3 */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/wallet')}>
                  <a href="/admin/wallet">
                    <WalletMinimal />
                    <span>Dompet</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* group 3 */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/customers')}>
                  <a href="/admin/customers">
                    <UsersRound />
                    <span>Customers</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
            </SidebarMenu>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/faq')}>
                  <a href="/admin/faq">
                    <FileQuestion />
                    <span>FAQ</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* group 3 */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/report')}>
                  <a href="/admin/report">
                    <ChartColumnIncreasing />
                    <span>Reports</span>
                  </a>
                </SidebarMenuButton>
                {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/shop_decoration')}>
                  <a href="/admin/shop_decoration">
                    <ShoppingCart />
                    <span>Dekorasi Toko</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge></SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className=""
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={userAvatar}
                      alt={userName}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userName}
                    </span>
                    <span className="truncate text-xs">
                      {userEmail}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={userAvatar}
                        alt={userName}
                      />
                      <AvatarFallback className="rounded-lg">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userName}
                      </span>
                      <span className="truncate text-xs">
                        {userEmail}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {/* logout */}
                  <Button variant='link' onClick={() => { Logout(); router.refresh(); }} className="w-full">
                    <LogOut />
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}