# .github/copilot-instructions.md

## Instruksi Umum

- **Teknologi:** Proyek ini menggunakan Next.js, React, JavaScript, Supabase, Tailwind CSS, Radix UI, React Hook Form, Zod, `postgres.js`, dan beberapa library lainnya seperti yang tercantum di `package.json`. Perhatikan teknologi ini saat memberikan saran kode.
- **Fokus:** Prioritaskan saran yang relevan dengan teknologi yang digunakan. Hindari menyarankan solusi yang tidak kompatibel atau tidak efisien dalam konteks ini.
- **Tidak Merubah Kode yang Tidak Diminta:** Jangan memodifikasi kode yang tidak secara spesifik diminta. Jika pengguna hanya meminta penambahan fitur X, jangan mengubah fitur Y yang sudah ada.
- **Mempertahankan Komentar:** Jangan menghapus komentar yang sudah ada dalam kode. Komentar penting untuk pemahaman kode.
- **Komentar Kode:** Setiap kode yang dihasilkan harus disertai komentar singkat yang menjelaskan fungsi dan cara kerjanya. Tujuannya adalah agar kode mudah dipahami.
- **Penanganan Error:** Gunakan `try...catch` block untuk menangani potensi error. Di dalam `catch` block, gunakan `console.error` atau mekanisme logging lain untuk mencatat error, sehingga memudahkan proses debugging. Contoh:

  ```javascript
  try {
    // Kode yang berpotensi menimbulkan error
    const result = await someFunction();
  } catch (error) {
    console.error("Terjadi kesalahan:", error); // Catat error untuk debugging
    // ... penanganan error lainnya ...
  }
  ```

- **Konsistensi:** Usahakan untuk menjaga konsistensi gaya penulisan kode, termasuk penamaan variabel, indentasi, dan format lainnya. Ikuti style guide yang umum untuk JavaScript dan React.
- **Kejelasan:** Utamakan kode yang mudah dibaca dan dipahami. Gunakan nama variabel yang deskriptif dan hindari kompleksitas yang tidak perlu.
- **Relevansi:** Pastikan saran kode yang diberikan relevan dengan konteks pertanyaan atau permintaan. Jangan memberikan saran yang terlalu umum atau tidak berhubungan.
- **Test:** Pertimbangkan untuk menyertakan contoh test (menggunakan Jest) untuk kode yang dihasilkan, terutama untuk fungsi-fungsi penting.
- **Supabase:** Jika berinteraksi dengan Supabase, gunakan library `@supabase/supabase-js` dan perhatikan praktik terbaik untuk keamanan dan efisiensi.
- **React Hook Form & Zod:** Jika berkaitan dengan form, gunakan React Hook Form untuk manajemen form dan Zod untuk validasi skema. Pastikan integrasi keduanya dilakukan dengan benar.
- **Tailwind CSS & Radix UI:** Perhatikan penggunaan Tailwind CSS untuk styling dan Radix UI untuk komponen-komponen UI. Saran kode sebaiknya memanfaatkan kedua library ini.
- **Next.js:** Perhatikan konvensi dan fitur-fitur Next.js, seperti server-side rendering (SSR), static site generation (SSG), dan API routes.
- **postgres.js:** Gunakan library `postgres.js` untuk berinteraksi dengan database PostgreSQL. Perhatikan praktik terbaik untuk keamanan dan performa saat menggunakan library ini.
- **Instruksi Tambahan:**
  - Jangan hilangkan komponen apapun, cukup rubah tailwindnya saja.
  - Komponen shadcn juga jangan di hilangkan termasuk importnya.
  - Periksa lagi untuk ukuran tanpa sm, md, xl ,lg , 2xl, periksa untuk semua komponen yang menggunakan width, height.
  - Lebar harus disesuaikan dengan patokan tanpa breakpoint, dengan sm, dan seterusnya sampai 2xl tanpa dibatasi max width.
  - Jangan gunakan custom pixel tailwind.
  - Perbaiki breakpoint agar width dan height semua anak-anaknya menyesuaikan.

## Contoh Penulisan API

Gunakan format berikut untuk penulisan API, meliputi:

- `try...catch` block untuk penanganan error
- Pesan error yang informatif
- Penggunaan parameter yang tepat
- Penggunaan query URL
- Penggunaan actions dengan `postgres.js`

```javascript
// use server
"use server";

import sql from "@/lib/postgres";

export async function GetFaqAction(req, params) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    let faqs;
    if (category) {
      faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                WHERE c.category_name ILIKE ${"%" + category + "%"}
                ORDER BY f.created_at DESC
            `;
    } else if (search) {
      faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                WHERE (f.title ILIKE ${"%" + search + "%"} OR f.content ILIKE ${"%" + search + "%"} OR c.category_name ILIKE ${"%" + category + "%"})
                ORDER BY f.created_at DESC
            `;
    } else {
      faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                ORDER BY f.created_at DESC
            `;
    }
    return faqs;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { error: "Failed to fetch FAQs", error };
  }
}

export async function GetFaqByIdAction(req, { params }) {
  try {
    const faq_id = params.faq_id;
    console.log("🚀 ~ GetFaqByIdAction ~ faq_id:", faq_id);
    const [faq] = await sql`
            SELECT
                f.faq_id,
                f.title,
                f.content,
                f.category_id,
                c.category_name,
                f.created_at
            FROM
                public.faq f
            LEFT JOIN
                public.faq_category c
            ON
                f.category_id = c.category_id
            WHERE
                f.faq_id = ${faq_id};
        `;
    return faq;
  } catch (error) {
    console.error("Error fetching FAQ for edit:", error);
    return { error: "Failed to fetch FAQ", error };
  }
}

export async function InsertFaqAction(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const category_id = formData.get("category_id");

  console.log("🚀 ~ POST ~ title:", title);
  console.log("🚀 ~ POST ~ content:", content);
  console.log("🚀 ~ POST ~ category_id:", category_id);

  try {
    const result = await sql.begin(async (sql) => {
      const [faq] = await sql`
                INSERT INTO faq (
                    title,
                    content,
                    category_id
                ) VALUES (
                    ${title},
                    ${content},
                    ${category_id}
                )
                RETURNING *;
            `;
      return faq;
    });
    return result;
  } catch (error) {
    console.error("Error inserting FAQ:", error);
    return { error: "Failed to insert FAQ", error };
  }
}

export async function DeleteFaqAction(req, { params }) {
  try {
    const faq_id = params.faq_id;
    console.log("🚀 ~ DeleteFaqAction ~ faq_id:", faq_id);

    const result = await sql`delete from faq where faq_id = ${faq_id} returning *`;
    return result;
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return { error: "Failed to delete FAQ", error };
  }
}

export async function UpdateFaqByIdAction(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const category_id = formData.get("category_id");
  const faq_id = params.faq_id;

  console.log("🚀 ~ POST ~ title:", title);
  console.log("🚀 ~ POST ~ content:", content);
  console.log("🚀 ~ POST ~ category_id:", category_id);
  console.log("🚀 ~ POST ~ faq_id:", faq_id);

  if (!title || !content || !category_id) {
    throw new Error("Invalid input: all fields are required");
  }
  if (!faq_id) {
    throw new Error("Invalid input: faq_id is required");
  }

  try {
    const result = await sql.begin(async (sql) => {
      const [updatedFaq] = await sql`
                UPDATE faq 
                SET 
                    title = ${title},
                    content = ${content},
                    category_id = ${category_id}
                WHERE 
                    faq_id = ${faq_id}
                RETURNING *
            `;
      console.log("Updated FAQ:", updatedFaq);
      return updatedFaq;
    });

    if (!result) {
      console.log("No FAQ updated");
      throw new Error("FAQ not found or not updated");
    }

    return result;
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return { error: "Failed to update FAQ", error };
  }
}
```

## Contoh Penggunaan di File Terpisah

```javascript
import { GetFaqAction, InsertFaqAction } from "@/app/actions/v2/dashboard/admin/faq/faqActions";

export async function GET(req, { params }) {
  try {
    const result = await GetFaqAction(req, { params });

    if (result) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No data found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const result = await InsertFaqAction(req, { params });

    if (result) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No data found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
```

## Skema Database PostgreSQL

Berikut adalah skema tabel PostgreSQL yang Anda gunakan:

```sql
create table public.products (
  product_id uuid not null default gen_random_uuid (),
  products_name character varying not null,
  products_description character varying null,
  stock integer not null,
  categories_id uuid not null,
  created_at timestamp with time zone not null default now(),
  price_type public.price_type not null,
  constraint products_pkey primary key (product_id),
  constraint products_categories_id_fkey foreign KEY (categories_id) references categories (categories_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.wholesale_prices (
  wholesale_prices_id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  min_quantity integer not null,
  max_quantity integer null,
  price numeric not null,
  created_at timestamp with time zone not null default now(),
  constraint product_wholesale_prices_pkey primary key (wholesale_prices_id),
  constraint product_wholesale_prices_product_id_fkey foreign KEY (product_id) references products (product_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.product_images (
  images_id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  image_path character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint product_images_pkey primary key (images_id),
  constraint product_images_product_id_fkey foreign KEY (product_id) references products (product_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.fixed_prices (
  fixed_price_id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  price numeric not null,
  created_at timestamp with time zone not null default now(),
  constraint fixed_price_pkey primary key (fixed_price_id),
  constraint fixed_price_product_id_fkey foreign KEY (product_id) references products (product_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.categories (
  categories_id uuid not null default gen_random_uuid (),
  categories_name character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (categories_id),
  constraint categories_categories_name_key unique (categories_name)
) TABLESPACE pg_default;

create table public.lp_company_logos (
  cp_id bigint generated by default as identity not null,
  image_path character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint lp_company_logos_pkey primary key (cp_id)
) TABLESPACE pg_default;

create table public.lp_food_categories (
  food_categories_id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  image_path character varying not null,
  categories_id uuid not null,
  constraint lp_food_categories_categories_id_fkey foreign KEY (categories_id) references categories (categories_id) on update CASCADE on delete set null
) TABLESPACE pg_default;

create table public.lp_service (
  service_id uuid not null default gen_random_uuid (),
  service_name character varying not null,
  image_path character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint lp_service_pkey primary key (service_id)
) TABLESPACE pg_default;

create table public.lp_experience (
  experience_id uuid not null default gen_random_uuid (),
  number integer not null,
  description character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint lp_statistics_pkey primary key (experience_id)
) TABLESPACE pg_default;
```

## Contoh Kode Sidebar (Shadcn UI)

Berikut adalah contoh kode sidebar menggunakan Shadcn UI sebagai referensi:

```javascript
import { AppSidebar } from "@/components/app-sidebar"
import {
Breadcrumb,
BreadcrumbItem,
BreadcrumbLink,
BreadcrumbList,
BreadcrumbPage,
BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
SidebarInset,
SidebarProvider,
SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
return (
<SidebarProvider>
<AppSidebar />
<SidebarInset>

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
<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
<div className="grid auto-rows-min gap-4 md:grid-cols-3">
<div className="aspect-video rounded-xl bg-muted/50" />
<div className="aspect-video rounded-xl bg-muted/50" />
<div className="aspect-video rounded-xl bg-muted/50" />
</div>
<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
</div>
</SidebarInset>
</SidebarProvider>
)
}

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

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
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
title: "Playground",
url: "#",
icon: SquareTerminal,
isActive: true,
items: [
{
title: "History",
url: "#",
},
{
title: "Starred",
url: "#",
},
{
title: "Settings",
url: "#",
},
],
},
{
title: "Models",
url: "#",
icon: Bot,
items: [
{
title: "Genesis",
url: "#",
},
{
title: "Explorer",
url: "#",
},
{
title: "Quantum",
url: "#",
},
],
},
{
title: "Documentation",
url: "#",
icon: BookOpen,
items: [
{
title: "Introduction",
url: "#",
},
{
title: "Get Started",
url: "#",
},
{
title: "Tutorials",
url: "#",
},
{
title: "Changelog",
url: "#",
},
],
},
{
title: "Settings",
url: "#",
icon: Settings2,
items: [
{
title: "General",
url: "#",
},
{
title: "Team",
url: "#",
},
{
title: "Billing",
url: "#",
},
{
title: "Limits",
url: "#",
},
],
},
],
projects: [
{
name: "Design Engineering",
url: "#",
icon: Frame,
},
{
name: "Sales & Marketing",
url: "#",
icon: PieChart,
},
{
name: "Travel",
url: "#",
icon: Map,
},
],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
return (
<Sidebar collapsible="icon" {...props}>
<SidebarHeader>
<TeamSwitcher teams={data.teams} />
</SidebarHeader>
<SidebarContent>
<NavMain items={data.navMain} />
<NavProjects projects={data.projects} />
</SidebarContent>
<SidebarFooter>
<NavUser user={data.user} />
</SidebarFooter>
<SidebarRail />
</Sidebar>
)
}

"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
Collapsible,
CollapsibleContent,
CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
SidebarGroup,
SidebarGroupLabel,
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
SidebarMenuSub,
SidebarMenuSubButton,
SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
items,
}: {
items: {
title: string
url: string
icon?: LucideIcon
isActive?: boolean
items?: {
title: string
url: string
}[]
}[]
}) {
return (
<SidebarGroup>
<SidebarGroupLabel>Platform</SidebarGroupLabel>
<SidebarMenu>
{items.map((item) => (
<Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
<SidebarMenuItem>
<CollapsibleTrigger asChild>
<SidebarMenuButton tooltip={item.title}>
{item.icon && <item.icon />}
<span>{item.title}</span>
<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
</SidebarMenuButton>
</CollapsibleTrigger>
<CollapsibleContent>
<SidebarMenuSub>
{item.items?.map((subItem) => (
<SidebarMenuSubItem key={subItem.title}>
<SidebarMenuSubButton asChild>
<a href={subItem.url}>
<span>{subItem.title}</span>
</a>
</SidebarMenuSubButton>
</SidebarMenuSubItem>
))}
</SidebarMenuSub>
</CollapsibleContent>
</SidebarMenuItem>
</Collapsible>
))}
</SidebarMenu>
</SidebarGroup>
)
}

"use client"

import {
Folder,
Forward,
MoreHorizontal,
Trash2,
type LucideIcon,
} from "lucide-react"

import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
SidebarGroup,
SidebarGroupLabel,
SidebarMenu,
SidebarMenuAction,
SidebarMenuButton,
SidebarMenuItem,
useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
projects,
}: {
projects: {
name: string
url: string
icon: LucideIcon
}[]
}) {
const { isMobile } = useSidebar()

return (
<SidebarGroup className="group-data-[collapsible=icon]:hidden">
<SidebarGroupLabel>Projects</SidebarGroupLabel>
<SidebarMenu>
{projects.map((item) => (
<SidebarMenuItem key={item.name}>
<SidebarMenuButton asChild>
<a href={item.url}>
<item.icon />
<span>{item.name}</span>
</a>
</SidebarMenuButton>
<DropdownMenu>
<DropdownMenuTrigger asChild>
<SidebarMenuAction showOnHover>
<MoreHorizontal />
<span className="sr-only">More</span>
</SidebarMenuAction>
</DropdownMenuTrigger>
<DropdownMenuContent
className="w-48 rounded-lg"
side={isMobile ? "bottom" : "right"}
align={isMobile ? "end" : "start"} >
<DropdownMenuItem>
<Folder className="text-muted-foreground" />
<span>View Project</span>
</DropdownMenuItem>
<DropdownMenuItem>
<Forward className="text-muted-foreground" />
<span>Share Project</span>
</DropdownMenuItem>
<DropdownMenuSeparator />
<DropdownMenuItem>
<Trash2 className="text-muted-foreground" />
<span>Delete Project</span>
</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</SidebarMenuItem>
))}
<SidebarMenuItem>
<SidebarMenuButton className="text-sidebar-foreground/70">
<MoreHorizontal className="text-sidebar-foreground/70" />
<span>More</span>
</SidebarMenuButton>
</SidebarMenuItem>
</SidebarMenu>
</SidebarGroup>
)
}

"use client"

import {
BadgeCheck,
Bell,
ChevronsUpDown,
CreditCard,
LogOut,
Sparkles,
} from "lucide-react"

import {
Avatar,
AvatarFallback,
AvatarImage,
} from "@/components/ui/avatar"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuGroup,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
user,
}: {
user: {
name: string
email: string
avatar: string
}
}) {
const { isMobile } = useSidebar()

return (
<SidebarMenu>
<SidebarMenuItem>
<DropdownMenu>
<DropdownMenuTrigger asChild>
<SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
<Avatar className="h-8 w-8 rounded-lg">
<AvatarImage src={user.avatar} alt={user.name} />
<AvatarFallback className="rounded-lg">CN</AvatarFallback>
</Avatar>

<div className="grid flex-1 text-left text-sm leading-tight">
<span className="truncate font-semibold">{user.name}</span>
<span className="truncate text-xs">{user.email}</span>
</div>
<ChevronsUpDown className="ml-auto size-4" />
</SidebarMenuButton>
</DropdownMenuTrigger>
<DropdownMenuContent
className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
side={isMobile ? "bottom" : "right"}
align="end"
sideOffset={4} >
<DropdownMenuLabel className="p-0 font-normal">
<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
<Avatar className="h-8 w-8 rounded-lg">
<AvatarImage src={user.avatar} alt={user.name} />
<AvatarFallback className="rounded-lg">CN</AvatarFallback>
</Avatar>
<div className="grid flex-1 text-left text-sm leading-tight">
<span className="truncate font-semibold">{user.name}</span>
<span className="truncate text-xs">{user.email}</span>
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
)
}

"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
teams,
}: {
teams: {
name: string
logo: React.ElementType
plan: string
}[]
}) {
const { isMobile } = useSidebar()
const [activeTeam, setActiveTeam] = React.useState(teams[0])

return (
<SidebarMenu>
<SidebarMenuItem>
<DropdownMenu>
<DropdownMenuTrigger asChild>
<SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >

<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
<activeTeam.logo className="size-4" />
</div>
<div className="grid flex-1 text-left text-sm leading-tight">
<span className="truncate font-semibold">
{activeTeam.name}
</span>
<span className="truncate text-xs">{activeTeam.plan}</span>
</div>
<ChevronsUpDown className="ml-auto" />
</SidebarMenuButton>
</DropdownMenuTrigger>
<DropdownMenuContent
className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
align="start"
side={isMobile ? "bottom" : "right"}
sideOffset={4} >
<DropdownMenuLabel className="text-xs text-muted-foreground">
Teams
</DropdownMenuLabel>
{teams.map((team, index) => (
<DropdownMenuItem
key={team.name}
onClick={() => setActiveTeam(team)}
className="gap-2 p-2" >
<div className="flex size-6 items-center justify-center rounded-sm border">
<team.logo className="size-4 shrink-0" />
</div>
{team.name}
<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
</DropdownMenuItem>
))}
<DropdownMenuSeparator />
<DropdownMenuItem className="gap-2 p-2">
<div className="flex size-6 items-center justify-center rounded-md border bg-background">
<Plus className="size-4" />
</div>
<div className="font-medium text-muted-foreground">Add team</div>
</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</SidebarMenuItem>
</SidebarMenu>
)
}
```

## Contoh Skeleton Card

```javascript
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
```
