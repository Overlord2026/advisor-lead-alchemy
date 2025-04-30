
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface BannerHeaderProps {
  /** Logo URL, defaults to "/boutique-logo.svg" */
  logoSrc?: string;
  /** Organization name, defaults to "Boutique Family Office" */
  orgName?: string;
  /** Whether the header is for advisor or client view */
  variant?: "advisor" | "client" | "prospect";
  /** User's name, displays initial in avatar if provided */
  userName?: string;
  /** Additional CSS classes */
  className?: string;
  /** Nav items array with label, path, and optional badge */
  navItems?: Array<{
    label: string;
    path: string;
    badge?: string;
  }>;
  /** Additional content to render on the right side */
  rightContent?: React.ReactNode;
}

const BannerHeader: React.FC<BannerHeaderProps> = ({
  logoSrc = "/boutique-logo.svg",
  orgName = "Boutique Family Office",
  variant = "advisor",
  userName,
  className,
  navItems = [],
  rightContent,
}) => {
  // If no navItems are provided, use default advisor routes
  const defaultNavItems = variant === "advisor" 
    ? [
        { label: "Dashboard", path: "/advisor" },
        { label: "Prospects", path: "/advisor/prospects" },
        { label: "ROI Tracker", path: "/advisor/roi" },
      ]
    : variant === "prospect"
    ? [
        { label: "Dashboard", path: "/prospect" },
        { label: "Services", path: "/prospect/services" },
        { label: "Resources", path: "/prospect/resources" },
      ]
    : [
        { label: "Dashboard", path: "/client" },
        { label: "Planning", path: "/client/planning" },
        { label: "Documents", path: "/client/documents" },
      ];

  const items = navItems.length > 0 ? navItems : defaultNavItems;
  
  // Calculate home path based on variant
  const homePath = variant === "advisor" ? "/advisor" : variant === "prospect" ? "/prospect" : "/client";

  // Get user initials for avatar
  const userInitials = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <header className={cn(
      "bg-black w-full py-3 px-6 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gold/20 flex items-center justify-between",
      className
    )}>
      <Link to={homePath} className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
        <img 
          src={logoSrc} 
          alt={orgName}
          className="h-8 w-auto"
        />
        <span className="text-white text-xl font-semibold">{orgName}</span>
      </Link>
      
      <div className="hidden md:flex items-center justify-between flex-grow ml-10">
        <nav>
          <ul className="flex space-x-6">
            {items.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className="text-white/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  {item.label}
                  {item.badge && (
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          {rightContent}
          
          {userName && (
            <Avatar className="bg-primary/20 border border-primary/30">
              <AvatarFallback className="text-primary font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
};

export default BannerHeader;
