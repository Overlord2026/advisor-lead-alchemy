
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full p-8 space-y-8 bg-card rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <img 
            src="/boutique-logo.svg" 
            alt="Boutique Family Office" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">Boutique Family Office</h1>
          <p className="text-muted-foreground">Select portal to continue</p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link to="/advisor">Advisor Portal</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link to="/client">Client Portal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
