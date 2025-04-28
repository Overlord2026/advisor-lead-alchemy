
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CompanyInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome to Boutique Family Office</h2>
        <p className="text-muted-foreground mb-4">
          Founded in 2025 by financial industry veteran Antonio Gomes, alongside fintech and data entrepreneurs, 
          Boutique Family Office (BFO) is dedicated to empowering financial advisors and their clients 
          to excel in the era of artificial intelligence.
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
          <p className="text-muted-foreground">
            At BFO, we believe financial advisors will not only remain vital but will thrive as technological 
            advancements accelerate. Rather than replacing advisors, we envision AI as an essential partner, 
            enabling advisors to focus on their most impactful work: building deep, trusting relationships with 
            their clients and guiding them through life's most significant financial decisions.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Education & Solutions</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Education Center</li>
              <li>Courses</li>
              <li>Guides & Whitepapers</li>
              <li>Books</li>
              <li>Planning Examples</li>
              <li>Presentations</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Wealth Management</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Secure Family Vault</li>
              <li>Accounts</li>
              <li>Financial Plans</li>
              <li>Investments</li>
              <li>Tax & Budgets</li>
              <li>Properties</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Planning & Services</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Financial Planning</li>
              <li>Investments</li>
              <li>Tax Planning</li>
              <li>Estate Planning</li>
              <li>Insurance</li>
              <li>Lending</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="mr-2">
            Learn More About BFO
          </Button>
          <Button>
            Explore Advisor Platform <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
