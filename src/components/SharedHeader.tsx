
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface NavigationItem {
  label: string;
  path: string;
}

interface SharedHeaderProps {
  logoText?: string;
  portalType: "advisor" | "client" | "prospect" | "home";
  navItems?: NavigationItem[];
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  logoText = "Boutique Family Office",
  portalType = "home",
  navItems = [],
}) => {
  const location = useLocation();
  const { isMobile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Default navigation items based on portal type
  const defaultNavItems: Record<string, NavigationItem[]> = {
    advisor: [
      { label: "Dashboard", path: "/advisor" },
      { label: "Prospects", path: "/advisor/prospects" },
      { label: "ROI Tracker", path: "/advisor/roi" },
    ],
    client: [
      { label: "Dashboard", path: "/client" },
      { label: "Documents", path: "/client/documents" },
      { label: "Schedule", path: "/client/schedule" },
    ],
    prospect: [
      { label: "Home", path: "/prospect" },
      { label: "Services", path: "/prospect/services" },
      { label: "Contact", path: "/prospect/contact" },
    ],
    home: [
      { label: "Advisor Portal", path: "/advisor" },
      { label: "Client Portal", path: "/client" },
      { label: "Prospect Portal", path: "/prospect" },
    ],
  };

  // Use provided navItems or default ones based on portal type
  const navigationItems = navItems.length > 0 ? navItems : defaultNavItems[portalType] || [];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className="bg-black w-full py-3 px-6 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gold/20 flex items-center justify-between"
      data-testid={`shared-header-${portalType}`}
    >
      <Link 
        to={portalType === "home" ? "/" : `/${portalType}`} 
        className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
        data-testid="shared-header-logo"
      >
        <img 
          src="/boutique-logo.svg" 
          alt="Boutique Family Office" 
          className="h-8 w-auto"
        />
        <span className="text-white text-xl font-semibold">{logoText}</span>
      </Link>
      
      {/* Mobile Menu Button */}
      {navigationItems.length > 0 && isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}
      
      {/* Desktop Navigation */}
      {navigationItems.length > 0 && (
        <div className="hidden md:flex items-center space-x-6" data-testid="desktop-nav">
          <nav>
            <ul className="flex space-x-6">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`${
                      location.pathname === item.path
                        ? "text-primary"
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
      {navigationItems.length > 0 && isMobile && mobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gold/20 shadow-lg"
          data-testid="mobile-nav"
        >
          <nav className="px-6 py-4">
            <ul className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`block ${
                      location.pathname === item.path
                        ? "text-primary"
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
