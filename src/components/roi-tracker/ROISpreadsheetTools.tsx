
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Upload, Edit, Copy } from "lucide-react";
import { useModal } from "@/components/ui/modal";
import { ROISpreadsheetModal } from "./ROISpreadsheetModal";
import { ROIData } from "./types";

interface ROISpreadsheetToolsProps {
  roiData: ROIData | null;
  onDataImport: (data: ROIData) => void;
}

export const ROISpreadsheetTools: React.FC<ROISpreadsheetToolsProps> = ({ 
  roiData, 
  onDataImport 
}) => {
  const spreadsheetModal = useModal();
  
  const handleExportToCSV = () => {
    if (!roiData) {
      toast.error("No data available to export");
      return;
    }
    
    try {
      // Convert ROI data to CSV format
      const channelsCSV = convertToCSV(roiData.channels, [
        { key: 'name', header: 'Channel Name' },
        { key: 'roi', header: 'ROI (%)' },
        { key: 'spend', header: 'Spend ($)' },
        { key: 'prospects', header: 'Prospects' },
        { key: 'clients', header: 'Clients' },
        { key: 'change', header: 'Change (%)' }
      ]);
      
      const campaignsCSV = convertToCSV(roiData.campaigns, [
        { key: 'name', header: 'Campaign Name' },
        { key: 'channel', header: 'Channel' },
        { key: 'startDate', header: 'Start Date' },
        { key: 'endDate', header: 'End Date' },
        { key: 'status', header: 'Status' },
        { key: 'spend', header: 'Spend ($)' },
        { key: 'prospects', header: 'Prospects' },
        { key: 'clients', header: 'Clients' },
        { key: 'roi', header: 'ROI (%)' }
      ]);
      
      const csvContent = 
        "# ROI Summary\n" +
        `Total Ad Spend,$${roiData.summary.adSpend},${roiData.summary.adSpendChange}%\n` +
        `Conversion Rate,${roiData.summary.conversionRate}%,${roiData.summary.conversionRateChange}%\n` +
        `New Prospects,${roiData.summary.prospects},${roiData.summary.prospectsChange}%\n` +
        `New AUM,$${roiData.summary.aum / 1000000}M,${roiData.summary.aumChange}%\n\n` +
        "# Channels\n" + channelsCSV + "\n\n" +
        "# Campaigns\n" + campaignsCSV;
      
      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'marketing_roi_data.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("ROI data exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Error exporting ROI data");
    }
  };
  
  const handleCreateTemplate = () => {
    spreadsheetModal.open();
  };
  
  const handleTemplateCopy = () => {
    toast.info("Template copied. You can now share or customize it.");
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="outline" size="sm" onClick={handleExportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button variant="outline" size="sm" onClick={spreadsheetModal.open}>
          <Upload className="mr-2 h-4 w-4" />
          Import Data
        </Button>
        <Button variant="outline" size="sm" onClick={handleCreateTemplate}>
          <Edit className="mr-2 h-4 w-4" />
          Customize Template
        </Button>
        <Button variant="outline" size="sm" onClick={handleTemplateCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Template
        </Button>
      </div>
      
      <ROISpreadsheetModal 
        isOpen={spreadsheetModal.isOpen}
        onOpenChange={spreadsheetModal.onOpenChange}
        onDataImport={onDataImport}
      />
    </div>
  );
};

// Helper function to convert data to CSV format
function convertToCSV(data: any[], columns: {key: string, header: string}[]): string {
  // Create the header row
  let csv = columns.map(col => col.header).join(',') + '\n';
  
  // Add data rows
  data.forEach(item => {
    const row = columns.map(col => {
      let value = item[col.key];
      
      // Handle special formatting
      if (typeof value === 'number' && col.key === 'roi') {
        value = value.toFixed(1);
      } else if (typeof value === 'number' && col.key === 'change') {
        value = value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
      }
      
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    }).join(',');
    
    csv += row + '\n';
  });
  
  return csv;
}
