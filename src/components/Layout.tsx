
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { NAV_ITEMS, ADVISOR_NAV_ITEMS } from "@/constants/navigation";
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
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationContent = () => {
  const location = useLocation();
  const isAdvisorSection = location.pathname.startsWith('/advisor');
  
  const navItems = isAdvisorSection ? ADVISOR_NAV_ITEMS : NAV_ITEMS;
  
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{isAdvisorSection ? "Advisor Portal" : "Client Portal"}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = isAdvisorSection
                ? location.pathname === item.path || 
                  (item.path === "/advisor" && location.pathname === "/advisor")
                : location.pathname === item.path;
                
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
      
      {!isAdvisorSection ? (
        <SidebarGroup>
          <SidebarGroupLabel>Sales Process</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Advisor Dashboard"
                >
                  <Link to="/advisor">
                    <LayoutDashboard />
                    <span>Advisor Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ) : (
        <SidebarGroup>
          <SidebarGroupLabel>Client Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Client Portal Home"
                >
                  <Link to="/">
                    <LayoutDashboard />
                    <span>Client Portal Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </SidebarContent>
  );
};

const Header = () => {
  const { toast } = useToast();
  const { toggleSidebar } = useApp();
  const location = useLocation();
  const isAdvisorSection = location.pathname.startsWith('/advisor');

  return (
    <header className="bg-background border-b p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex gap-4 items-center">
        <SidebarTrigger onClick={toggleSidebar} />
        <Link to={isAdvisorSection ? "/advisor" : "/"} className="flex items-center">
          <img src="/logo.svg" alt="Boutique Family Office" className="h-10 mr-4" />
        </Link>
        <h1 className="text-xl font-bold hidden sm:block">
          {isAdvisorSection ? "Advisor Portal" : "Client Portal"}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationCenter />
        <Button 
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={() => 
            toast({
              title: "Welcome!",
              description: isAdvisorSection 
                ? "This is a demo of the advisor portal." 
                : "This is a demo of the client portal.",
            })
          }
        >
          Help
        </Button>
        <Button 
          variant="outline"
          size="sm"
          asChild
        >
          <Link to={isAdvisorSection ? "/" : "/advisor"}>
            {isAdvisorSection ? "Client Portal" : "Advisor Portal"}
          </Link>
        </Button>
      </div>
    </header>
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdvisorSection = location.pathname.startsWith('/advisor');

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Boutique Family Office" className="h-8 w-auto" />
          </div>
        </SidebarHeader>
        <NavigationContent />
      </Sidebar>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
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
