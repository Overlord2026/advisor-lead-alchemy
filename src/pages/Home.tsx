
import React from "react";
import { Link } from "react-router-dom";
import SharedHeader from "@/components/SharedHeader";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <SharedHeader portalType="home" />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-14">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Welcome to <span className="text-primary">Boutique Family Office</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Advisor Portal */}
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">Advisor Portal</h2>
            <p className="text-muted-foreground mb-6">
              Manage your client relationships, track performance, and grow your practice.
            </p>
            <Link 
              to="/advisor" 
              className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              Enter Portal
            </Link>
          </div>
          
          {/* Prospect Portal */}
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-lg">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">Prospect Portal</h2>
            <p className="text-muted-foreground mb-6">
              Learn about our services, schedule a consultation, and start your journey.
            </p>
            <Link 
              to="/prospect" 
              className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              Enter Portal
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-black/50 text-white/50 text-center py-4 text-sm">
        <p>© {new Date().getFullYear()} Boutique Family Office. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
