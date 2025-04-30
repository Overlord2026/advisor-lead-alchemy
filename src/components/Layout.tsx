
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
  const isClientView = location.pathname.startsWith("/client");
  const isProspectView = location.pathname.startsWith("/prospect");
  
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

  const prospectNavItems: NavItem[] = [
    { label: "Dashboard", path: "/prospect" },
    { label: "Services", path: "/prospect/services" },
    { label: "Resources", path: "/prospect/resources" },
  ];
  
  // Determine which nav items to use based on the current view
  let currentNavItems = advisorNavItems;
  if (isClientView) {
    currentNavItems = clientNavItems;
  } else if (isProspectView) {
    currentNavItems = prospectNavItems;
  }

  // Determine current view name for the banner
  let viewName = isAdvisorView ? "Advisor Portal" : "Client Portal";
  if (isProspectView) {
    viewName = "Prospect Portal";
  }

  // Determine context name for the banner
  let contextName = isAdvisorView ? "Sales Process Automation" : "Financial Planning";
  if (isProspectView) {
    contextName = "Service Discovery";
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <BannerHeader 
          variant={isAdvisorView ? "advisor" : isProspectView ? "prospect" : "client"}
          logoSrc="/boutique-logo.svg"
          orgName="BOUTIQUE FAMILY OFFICE"
          navItems={currentNavItems}
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="w-full bg-primary/10 text-primary font-medium border-b border-primary/20 py-1 px-4 text-sm mt-[56px] flex justify-between">
            <span>{viewName}</span>
            <span>{contextName}</span>
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
