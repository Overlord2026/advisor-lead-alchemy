
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { NAV_ITEMS } from "@/constants/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Button } from "@/components/ui/button";

const NavigationContent = () => {
  const location = useLocation();
  const { isMobile } = useApp();
  
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={item.label}
                >
                  <Link to={item.path}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

const Header = () => {
  const { toast } = useToast();
  const { toggleSidebar } = useApp();

  return (
    <header className="bg-background border-b p-4 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <SidebarTrigger onClick={toggleSidebar} />
        <h1 className="text-xl font-bold">Client Portal</h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationCenter />
        <button
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={() => 
            toast({
              title: "Welcome!",
              description: "This is a demo of the client portal.",
            })
          }
        >
          Help
        </button>
      </div>
    </header>
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">Financial Portal</h2>
        </SidebarHeader>
        <NavigationContent />
      </Sidebar>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

export default Layout;
