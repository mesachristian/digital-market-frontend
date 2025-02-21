import type React from "react"
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { Book, Home, Settings, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background w-full">
                <Sidebar className="border-r border-border">
                    <SidebarHeader>
                        <div className="flex items-center justify-between px-4 py-2">
                            <h2 className="text-xl font-bold">Course Creator</h2>
                            <ThemeToggle />
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard" className="flex items-center">
                                        <Home className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard/courses" className="flex items-center">
                                        <Book className="mr-2 h-4 w-4" />
                                        <span>Courses</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard/profile" className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard/settings" className="flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <p className="text-sm text-muted-foreground px-4 py-2">© 2024 Course Creator</p>
                    </SidebarFooter>
                </Sidebar>
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </SidebarProvider>
    )
}