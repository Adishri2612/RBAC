import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  LucideProps,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { type FileRouteTypes } from "@/routeTree.gen"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store"
import { Role } from "@/utils/roles"


type NavMain = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  items: {
    title: string;
    url: FileRouteTypes["to"];
    role: Role | null
  }[];
}

export const navMain: NavMain[] = [
  {
    title: "SuperAdmin Only",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "History",
        url: "/dashboard/history",
        role: "superadmin"
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        role: "superadmin"
      },
    ],
  },
  {
    title: "Admin Only",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "Explorer",
        url: "/dashboard/explorer",
        role: "admin"
      },
    ],
  },
  {
    title: "User Only",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "/dashboard/intro",
        role: "user",
      },
      {
        title: "Get Started",
        url: "/dashboard/get-started",
        role: "user",
      },
    ],
  },
  {
    title: "All",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "/dashboard/general",
        role: null
      },
      {
        title: "General",
        url: "/dashboard/general",
        role: null
      },
    ],
  },
] as const;

// This is sample data.
const data = {
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
  navMain
} as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const email = useAuthStore(state => state.creds.email)


  const user = {
    name: email?.split("@")[0],
    email,
    avatar: "",
  }
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

