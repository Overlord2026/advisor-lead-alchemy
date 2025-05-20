
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
      className="bg-navy-dark w-full py-3 px-6 shadow-nav fixed top-0 left-0 right-0 z-50 border-b border-gold/10 flex flex-col items-center justify-center" 
      data-testid={`shared-header-${portalType}`}
    >
      {/* Centered Logo */}
      <div className="flex justify-center w-full">
        <Link to={portalType === "home" ? "/" : `/${portalType}`} className="flex items-center hover:opacity-90 transition-opacity" data-testid="shared-header-logo">
          <img
            src="/logo.svg"
            alt="Advisor Platform"
            className="h-10"
            width={120}
          />
        </Link>
      </div>
      
      {/* Mobile Menu Button (positioned absolutely) */}
      {navigationItems.length > 0 && enableResponsiveDesign && isMobile && (
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-white focus:outline-none absolute right-6 top-1/2 transform -translate-y-1/2" 
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} 
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}
      
      {/* Desktop Navigation - positioned below logo */}
      {navigationItems.length > 0 && (
        <div 
          className={`${enableResponsiveDesign ? "hidden md:flex" : "flex"} items-center mt-2`} 
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
                        ? "text-primary font-medium" 
                        : "text-white/80 hover:text-primary"
                    } transition-colors`} 
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
                        ? "text-primary font-medium" 
                        : "text-white/80 hover:text-primary"
                    } transition-colors`} 
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
