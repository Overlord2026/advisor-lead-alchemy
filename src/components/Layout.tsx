
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import BannerHeader from "./BannerHeader";
import { useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  badge?: string;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Determine if we're in advisor or client mode based on the URL
  const isAdvisorView = location.pathname.startsWith("/advisor");
  
  const advisorNavItems: NavItem[] = [
    { label: "Dashboard", path: "/advisor" },
    { label: "Prospects", path: "/advisor/prospects" },
    { label: "Recordings", path: "/advisor/recordings" },
    { label: "Questionnaires", path: "/advisor/questionnaires" },
    { label: "Templates", path: "/advisor/templates" },
    { label: "ROI Tracker", path: "/advisor/roi" },
  ];
  
  const clientNavItems: NavItem[] = [
    { label: "Dashboard", path: "/client" },
    { label: "Planning", path: "/client/planning" },
    { label: "Documents", path: "/client/documents" },
  ];
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <BannerHeader 
          variant={isAdvisorView ? "advisor" : "client"}
          logoSrc="/boutique-logo.svg"
          orgName="ROCHE FAMILY OFFICE"
          navItems={isAdvisorView ? advisorNavItems : clientNavItems}
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="w-full bg-primary/10 text-primary font-medium border-b border-primary/20 py-1 px-4 text-sm mt-[56px] flex justify-between">
            <span>{isAdvisorView ? "Advisor Portal" : "Client Portal"}</span>
            <span>{isAdvisorView ? "Sales Process Automation" : "Financial Planning"}</span>
          </div>
          <main className="flex-1 overflow-auto p-6 pt-6 mt-[24px]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
