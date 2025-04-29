
import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, BarChart } from "lucide-react";
import { toast } from "sonner";

export const ROITrackerHeader: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold">Marketing ROI Tracker</h2>
        <p className="text-muted-foreground">Track and analyze your marketing campaign performance and sales conversion</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={() => toast.info("Exporting report...")}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button variant="default" size="sm" onClick={() => toast.success("Dashboard refreshed")}>
          <BarChart className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
