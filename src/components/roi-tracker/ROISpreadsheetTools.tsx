
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Upload, Edit, Copy, FileSearch, FileSpreadsheet, Video, Mic } from "lucide-react";
import { useModal } from "@/components/ui/modal";
import { ROISpreadsheetModal } from "./ROISpreadsheetModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ROIData } from "./types";

interface ROISpreadsheetToolsProps {
  roiData: ROIData | null;
  onDataImport: (data: ROIData) => void;
  onSpreadsheetScan?: (source: string) => void;
  spreadsheetSources?: string[];
}

export const ROISpreadsheetTools: React.FC<ROISpreadsheetToolsProps> = ({ 
  roiData, 
  onDataImport,
  onSpreadsheetScan,
  spreadsheetSources = []
}) => {
  const spreadsheetModal = useModal();
  const scanModal = useModal();
  const [scanInput, setScanInput] = useState("");
  const [activeTab, setActiveTab] = useState<string>("templates");
  
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

  const handleScanSpreadsheet = () => {
    scanModal.open();
  };

  const handleScanSubmit = () => {
    if (!scanInput.trim()) {
      toast.error("Please paste your spreadsheet data");
      return;
    }

    // Process the pasted spreadsheet data
    const lines = scanInput.trim().split("\n");
    if (lines.length < 2) {
      toast.error("Invalid spreadsheet format. Please check your data and try again.");
      return;
    }

    // Get a name for this spreadsheet source
    const sourceName = `Scanned Spreadsheet ${new Date().toLocaleTimeString()}`;
    
    if (onSpreadsheetScan) {
      onSpreadsheetScan(sourceName);
    }

    // Close the modal and reset the input
    scanModal.close();
    setScanInput("");
  };

  const getSourceBadge = (count: number) => {
    if (count === 0) return null;
    return <Badge variant="secondary" className="ml-2">{count}</Badge>;
  };
  
  return (
    <div className="mb-6">
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="templates">Templates {getSourceBadge(0)}</TabsTrigger>
          <TabsTrigger value="sources">Data Sources {getSourceBadge(spreadsheetSources.length)}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="outline" size="sm" onClick={handleScanSpreadsheet}>
              <FileSearch className="mr-2 h-4 w-4" />
              Scan Spreadsheet
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Connect Excel
            </Button>
            <Button variant="outline" size="sm">
              <Video className="mr-2 h-4 w-4" />
              Webinar Data
            </Button>
            <Button variant="outline" size="sm">
              <Mic className="mr-2 h-4 w-4" />
              Seminar Data
            </Button>
          </div>
          
          {spreadsheetSources.length > 0 ? (
            <div className="border rounded-md p-4 mt-4">
              <h4 className="text-sm font-medium mb-2">Connected Data Sources</h4>
              <ul className="space-y-2">
                {spreadsheetSources.map((source, index) => (
                  <li key={index} className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
                    <span className="flex items-center">
                      <FileSearch className="h-4 w-4 mr-2 text-blue-500" />
                      {source}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileSearch className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No data sources connected yet</p>
              <p className="text-sm">Scan a spreadsheet to get started</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <ROISpreadsheetModal 
        isOpen={spreadsheetModal.isOpen}
        onOpenChange={spreadsheetModal.onOpenChange}
        onDataImport={onDataImport}
      />

      {/* Spreadsheet Scanning Dialog */}
      <Dialog open={scanModal.isOpen} onOpenChange={scanModal.onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Spreadsheet Data</DialogTitle>
            <DialogDescription>
              Paste your spreadsheet data below to analyze and import it
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Paste spreadsheet data here..."
              className="min-h-[200px]"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={scanModal.close}>Cancel</Button>
            <Button onClick={handleScanSubmit}>Analyze & Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
