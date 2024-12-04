import { useAuthStore } from "@/store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
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
import { RoleBadge, ThemeToggle } from "@/components";
import { navMain } from "@/components/app-sidebar";

const links = navMain.flatMap((nav) => nav.items)

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ location }) => {
    const { role: currRole, authState } = useAuthStore.getState().creds
    const isLogin = authState === "logged-in"

    if (!isLogin) {
      throw redirect({
        to: "/auth/login",
      });
    }

    const link = links.find(link => link.url === location.pathname)
    console.log(currRole)

    if (link !== undefined && link.role !== currRole) {
      throw redirect({
        to: "/dashboard"
      })
    }
  },

  component: RouteComponent
});

function RouteComponent() {
  const role = useAuthStore(state => state.creds.role)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
          <div className="flex items-center gap-2 px-4">
            <ThemeToggle />
            {role !== "user" && (
              <RoleBadge variant={role}>
                {role}
              </RoleBadge>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
