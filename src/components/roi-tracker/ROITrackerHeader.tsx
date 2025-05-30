
import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, BarChart } from "lucide-react";
import { toast } from "sonner";

export const ROITrackerHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-navy-dark via-navy-light to-navy-dark border-b border-gold/20 p-8 mb-8 -mx-6 mt-[-24px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Marketing ROI Tracker</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Track and analyze your marketing campaign performance and sales conversion metrics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => toast.info("Exporting report...")} className="border-gold/20 hover:bg-gold/10">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="default" size="sm" onClick={() => toast.success("Dashboard refreshed")} className="bg-gold hover:bg-gold/90 text-navy-dark">
              <BarChart className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
