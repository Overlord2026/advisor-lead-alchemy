
import React from "react";
import { Link } from "react-router-dom";

const BannerHeader = () => {
  return (
    <div className="bg-black w-full py-3 px-4 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gold/20">
      <div className="flex justify-center items-center">
        <Link to="/advisor" className="hover:opacity-90 transition-opacity">
          <img 
            src="/boutique-logo.svg" 
            alt="Boutique Family Office" 
            className="h-10 md:h-12 w-auto"
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerHeader;
