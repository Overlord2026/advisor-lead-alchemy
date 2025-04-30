
import React from "react";
import { Link } from "react-router-dom";

const BannerHeader = () => {
  return (
    <header className="bg-black w-full py-3 px-6 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gold/20 flex items-center justify-between">
      <Link to="/advisor" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
        <img 
          src="/boutique-logo.svg" 
          alt="Boutique Family Office" 
          className="h-8 w-auto"
        />
        <span className="text-white text-xl font-semibold">Boutique Family Office</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-6">
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/advisor" className="text-white/80 hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/advisor/prospects" className="text-white/80 hover:text-primary transition-colors">Prospects</Link></li>
            <li><Link to="/advisor/roi" className="text-white/80 hover:text-primary transition-colors">ROI Tracker</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default BannerHeader;
