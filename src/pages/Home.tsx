
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-4xl w-full p-8 space-y-8 bg-card rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <img 
            src="/boutique-logo.svg" 
            alt="Boutique Family Office" 
            className="h-20 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-foreground mb-2">Boutique Family Office</h1>
          <p className="text-muted-foreground">Select portal to continue</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 p-4 bg-black/20 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-primary">Advisor</h2>
            <p className="text-sm text-muted-foreground mb-4">
              For financial advisors managing client relationships and business development
            </p>
            <Button asChild className="w-full" size="lg">
              <Link to="/advisor">Advisor Portal</Link>
            </Button>
          </div>
          
          <div className="space-y-4 p-4 bg-black/20 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-primary">Client</h2>
            <p className="text-sm text-muted-foreground mb-4">
              For existing clients to access their financial plans and documents
            </p>
            <Button asChild className="w-full" size="lg">
              <Link to="/client">Client Portal</Link>
            </Button>
          </div>
          
          <div className="space-y-4 p-4 bg-black/20 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-primary">Prospect</h2>
            <p className="text-sm text-muted-foreground mb-4">
              For potential clients to learn about our services and offerings
            </p>
            <Button asChild className="w-full" size="lg">
              <Link to="/prospect">Prospect Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
