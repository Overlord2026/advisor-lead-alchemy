
import React from "react";
import { Link } from "react-router-dom";

const BannerHeader = () => {
  return (
    <header className="bg-black w-full py-3 px-6 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gold/20 flex items-center justify-between">
      <Link to="/advisor" className="hover:opacity-90 transition-opacity flex items-center space-x-3">
        <img 
          src="/boutique-logo.svg" 
          alt="Boutique Family Office" 
          className="h-10 md:h-12 w-auto"
        />
        <span className="text-white text-xl font-semibold hidden sm:inline-block">Boutique Family Office</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-6">
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Services</a></li>
            <li><a href="#" className="text-white/80 hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default BannerHeader;
