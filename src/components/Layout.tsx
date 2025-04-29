
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ADVISOR_NAV_ITEMS } from "@/constants/navigation";
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
import { useApp } from "@/contexts/AppContext";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Button } from "@/shared/ui";

const NavigationContent = () => {
  const location = useLocation();
  console.log("Current location path:", location.pathname);
  const navItems = ADVISOR_NAV_ITEMS;
  
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Advisor Portal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === "/advisor" && location.pathname === "/");
                
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
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
    <header className="bg-card border-b border-border p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex gap-4 items-center">
        <SidebarTrigger onClick={toggleSidebar} />
        <Link to="/advisor" className="flex items-center">
          <img src="/logo.svg" alt="Boutique Family Office" className="h-10 mr-4" />
        </Link>
        <h1 className="text-xl font-bold hidden sm:block">
          Advisor Portal
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationCenter />
        <Button 
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-primary"
          onClick={() => 
            toast({
              title: "Welcome!",
              description: "This is the advisor sales process platform.",
            })
          }
        >
          Help
        </Button>
      </div>
    </header>
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Boutique Family Office" className="h-8 w-auto" />
            <span className="ml-2 font-semibold">Advisor Portal</span>
          </div>
        </SidebarHeader>
        <NavigationContent />
      </Sidebar>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="tagline w-full bg-red-50 text-red-600 border-b border-red-100">
          <span>Advisor Portal</span>
          <span>Sales Process Automation</span>
        </div>
        <main className="flex-1 overflow-auto p-6 pt-20">{children}</main>
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
