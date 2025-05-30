
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import useFeatureFlag from "@/hooks/useFeatureFlag";

interface NavigationItem {
  label: string;
  path: string;
}

interface SharedHeaderProps {
  portalType: "advisor" | "home";
  navItems?: NavigationItem[];
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  portalType = "home",
  navItems = []
}) => {
  const location = useLocation();
  const {
    isMobile
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Feature flags
  const useRoleBasedNavigation = useFeatureFlag("useRoleBasedNavigation");
  const enableResponsiveDesign = useFeatureFlag("enableResponsiveDesign");

  // Default navigation items based on portal type - only advisor options
  const defaultNavItems: Record<string, NavigationItem[]> = {
    advisor: [{
      label: "Dashboard",
      path: "/advisor"
    }, {
      label: "Prospects",
      path: "/advisor/prospects"
    }, {
      label: "ROI Tracker",
      path: "/advisor/roi"
    }],
    home: [{
      label: "Advisor Platform",
      path: "/advisor"
    }]
  };

  // Use provided navItems or default ones based on portal type
  const navigationItems = navItems.length > 0 ? navItems : useRoleBasedNavigation ? defaultNavItems[portalType] || [] : [];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header 
      className="bg-navy-dark w-full py-2 px-6 shadow-nav fixed top-0 left-0 right-0 z-50 border-b border-gold/10" 
      data-testid={`shared-header-${portalType}`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Navigation Items - Left Side */}
        {navigationItems.length > 0 && (
          <div 
            className={`${enableResponsiveDesign ? "hidden md:flex" : "flex"} items-center`} 
            data-testid="desktop-nav"
          >
            <nav>
              <ul className="flex space-x-6">
                {navigationItems.map(item => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`${
                        location.pathname === item.path 
                          ? "text-gold font-medium" 
                          : "text-white/80 hover:text-gold"
                      } transition-colors text-sm font-medium`} 
                      data-testid={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Platform Title - Center */}
        <div className="flex-1 flex justify-center">
          <Link 
            to={portalType === "home" ? "/" : `/${portalType}`} 
            className="text-gold font-bold text-lg tracking-wide hover:opacity-90 transition-opacity" 
            data-testid="shared-header-title"
          >
            ADVISOR PLATFORM
          </Link>
        </div>

        {/* Mobile Menu Button - Right Side */}
        {navigationItems.length > 0 && enableResponsiveDesign && isMobile && (
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-white focus:outline-none" 
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} 
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {navigationItems.length > 0 && enableResponsiveDesign && isMobile && mobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 bg-navy-dark border-b border-gold/10 shadow-lg" 
          data-testid="mobile-nav"
        >
          <nav className="px-6 py-4">
            <ul className="flex flex-col space-y-3">
              {navigationItems.map(item => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`block ${
                      location.pathname === item.path 
                        ? "text-gold font-medium" 
                        : "text-white/80 hover:text-gold"
                    } transition-colors text-sm`} 
                    onClick={() => setMobileMenuOpen(false)} 
                    data-testid={`mobile-nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SharedHeader;
