
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Filter, PlusCircle } from "lucide-react";
import DashboardHeader from "@/components/advisor-dashboard/DashboardHeader";

const ProspectDashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <DashboardHeader title="Prospect Dashboard" />
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          asChild
        >
          <Link to="/advisor/lead-sources">
            <FileSpreadsheet className="h-3 w-3 mr-1" />
            Lead Sources
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Filter className="h-3 w-3 mr-1" />
          Filter
        </Button>
        <Button size="sm" className="bg-primary text-primary-foreground text-xs">
          <PlusCircle className="h-3 w-3 mr-1" />
          Add New Prospect
        </Button>
      </div>
    </div>
  );
};

export default ProspectDashboardHeader;
