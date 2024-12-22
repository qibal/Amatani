'use client'

import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChartColumnIncreasing,
  ChevronDown,
  ChevronsUpDown,
  Command,
  CreditCard,
  FileQuestion,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  Package2,
  PieChart,
  Settings2,
  ShoppingCart,
  Sparkles,
  SquareTerminal,
  Star,
  UsersRound,
  WalletMinimal,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { usePathname } from "next/navigation";

export function AppSidebar({
  ...props
}) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
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
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <a href="/dashboard">
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
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/products')}>
                  <a href="/dashboard/products">
                    <Package2 />
                    <span>Produk</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/orders')}>
                  <a href="/dashboard/orders">
                    <ShoppingCart />
                    <span>Pesanan</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>  
          </SidebarGroupContent>
          <SidebarGroupContent>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/penilaian')}>
                  <a href="/dashboard/penilaian">
                    <Star />
                    <span>Penilaian</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
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
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/wallet')}>
                  <a href="/dashboard/wallet">
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
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/customers')}>
                  <a href="/dashboard/customers">
                    <UsersRound />
                    <span>Customers</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
            </SidebarMenu>
            {/* Home */}
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/faq')}>
                  <a href="/dashboard/faq">
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
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/report')}>
                  <a href="/dashboard/report">
                    <ChartColumnIncreasing />
                    <span>Reports</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
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
                      src="/FE/img02.png"
                      alt="iqbal herlambang"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Iqbal herlambang
                    </span>
                    <span className="truncate text-xs">
                      iqbal herlambang.39@gmail.com
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
                        src="/FE/img02.png"
                        alt="Iqbal herlambang"
                      />
                      <AvatarFallback className="rounded-lg">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        Iqbal herlambang

                      </span>
                      <span className="truncate text-xs">
                        Iqbal herlambang

                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
