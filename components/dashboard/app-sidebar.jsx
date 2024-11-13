"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Product",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "List Product",
          url: "#",
        },
        {
          title: "Kategori",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Shipping",
          url: "#",
        },
        {
          title: "Trancation",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "#",
      icon: Frame,
    },
    {
      name: "FAQ",
      url: "#",
      icon: Frame,
    },
    {
      name: "Customers",
      url: "#",
      icon: Frame,
    },
  ],
  product: [
    {
      name: "Customer",
      url: "#",
      icon: Frame,
    },
    {
      name: "FAQ",
      url: "#",
      icon: Frame,
    },
  ],
  home: [
    {
      name: "Home",
      url: "#",
      icon: Frame,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <NavUser user={data.user} />
        {/* <NavProjects projects={data.home} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.product} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
