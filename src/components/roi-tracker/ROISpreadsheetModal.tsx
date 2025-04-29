
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ROIData } from "./types";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload } from "lucide-react";

interface ROISpreadsheetModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDataImport: (data: ROIData) => void;
}

export const ROISpreadsheetModal: React.FC<ROISpreadsheetModalProps> = ({
  isOpen,
  onOpenChange,
  onDataImport,
}) => {
  const [activeTab, setActiveTab] = useState("import");
  const [csvData, setCsvData] = useState("");
  const [previewData, setPreviewData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImport = () => {
    try {
      // Simple CSV parsing (in a production app, you'd use a more robust parser)
      const lines = csvData.trim().split('\n');
      let currentSection = "";
      let summaryData: any = {};
      let channels: any[] = [];
      let campaigns: any[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;
        
        // Check for section headers
        if (line.startsWith("# ")) {
          currentSection = line.substring(2).toLowerCase();
          continue;
        }
        
        // Parse data based on current section
        if (currentSection === "roi summary") {
          const parts = line.split(',');
          if (parts.length >= 3) {
            const key = parts[0].toLowerCase();
            const value = parseFloat(parts[1].replace('$', '').replace('%', ''));
            const change = parseFloat(parts[2].replace('%', ''));
            
            if (key.includes('ad spend')) {
              summaryData.adSpend = value;
              summaryData.adSpendChange = change;
            } else if (key.includes('conversion')) {
              summaryData.conversionRate = value;
              summaryData.conversionRateChange = change;
            } else if (key.includes('prospects')) {
              summaryData.prospects = Math.round(value);
              summaryData.prospectsChange = change;
            } else if (key.includes('aum')) {
              summaryData.aum = value * 1000000; // Convert M to actual value
              summaryData.aumChange = change;
            }
          }
        } else if (currentSection === "channels") {
          const parts = line.split(',');
          
          // Skip header row
          if (parts[0].toLowerCase() === "channel name") continue;
          
          if (parts.length >= 6) {
            channels.push({
              name: parts[0],
              roi: parseFloat(parts[1]),
              spend: parseFloat(parts[2]),
              prospects: parseInt(parts[3], 10),
              clients: parseInt(parts[4], 10),
              change: parseFloat(parts[5].replace('+', ''))
            });
          }
        } else if (currentSection === "campaigns") {
          const parts = line.split(',');
          
          // Skip header row
          if (parts[0].toLowerCase() === "campaign name") continue;
          
          if (parts.length >= 9) {
            campaigns.push({
              name: parts[0],
              channel: parts[1],
              startDate: parts[2],
              endDate: parts[3],
              status: parts[4],
              spend: parseFloat(parts[5]),
              prospects: parseInt(parts[6], 10),
              clients: parseInt(parts[7], 10),
              roi: parseFloat(parts[8])
            });
          }
        }
      }
      
      // Create preview data
      setPreviewData([...channels, ...campaigns]);
      
      // Validate that we have all required sections
      if (!summaryData.adSpend || channels.length === 0 || campaigns.length === 0) {
        toast.error("Missing required data sections. Please check your CSV format.");
        return;
      }
      
      const importedData: ROIData = {
        summary: summaryData,
        channels: channels,
        campaigns: campaigns,
        journey: {
          stages: [
            { name: "Lead Generated", count: summaryData.prospects, percent: 100 },
            { name: "Initial Meeting", count: Math.round(summaryData.prospects * 0.85), percent: 85 },
            { name: "Questionnaire", count: Math.round(summaryData.prospects * 0.66), percent: 66 },
            { name: "Follow-up", count: Math.round(summaryData.prospects * 0.48), percent: 48 }
          ],
          insights: [
            { 
              text: "The largest drop-off occurs between Questionnaire and Follow-up stages. Consider enhancing follow-up processes.",
              source: "AI" 
            }
          ]
        },
        recommendations: [
          {
            title: "Optimize for Best Performing Channel",
            description: `Focus more budget on ${channels[0].name} which shows the highest ROI at ${channels[0].roi}%.`,
            priority: "high",
            impact: "Potential Impact",
            metric: "+10% ROI",
            value: "High",
            icon: <span>📈</span>
          }
        ]
      };
      
      onDataImport(importedData);
      toast.success("Data imported successfully!");
      onOpenChange(false);
      
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to parse CSV data. Please check the format.");
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCsvData(content);
      toast.success(`File "${file.name}" loaded successfully`);
    };
    reader.onerror = () => {
      toast.error("Failed to read the file");
    };
    reader.readAsText(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDropExample = (exampleType: string) => {
    let exampleData = "";
    
    switch(exampleType) {
      case "financial":
        exampleData = 
          "# ROI Summary\n" +
          "Total Ad Spend,$32000,8.5%\n" +
          "Conversion Rate,22.1%,3.8%\n" +
          "New Prospects,178,12.4%\n" +
          "New AUM,$57.6M,18.2%\n\n" +
          "# Channels\n" +
          "Channel Name,ROI (%),Spend ($),Prospects,Clients,Change (%)\n" +
          "Facebook Ads,19.2,10500,55,12,8.5\n" +
          "LinkedIn Ads,21.8,14000,76,18,6.2\n" +
          "Google Ads,18.4,6000,35,5,-2.1\n" +
          "Referrals,16.5,1500,12,2,9.0\n\n" +
          "# Campaigns\n" +
          "Campaign Name,Channel,Start Date,End Date,Status,Spend ($),Prospects,Clients,ROI (%)\n" +
          "High Net Worth,Facebook,2025-02-15,2025-04-15,Completed,7200,38,8,20.5\n" +
          "Retirement Planning,LinkedIn,2025-03-01,2025-05-30,Active,8600,42,10,19.8\n" +
          "Tax Strategies,Google,2025-03-15,2025-05-15,Active,4800,28,4,17.6\n" +
          "Estate Planning,LinkedIn,2025-04-15,2025-07-15,Scheduled,5400,34,8,21.2\n";
        break;
      case "insurance":
        exampleData = 
          "# ROI Summary\n" +
          "Total Ad Spend,$28500,10.2%\n" +
          "Conversion Rate,16.8%,4.5%\n" +
          "New Prospects,152,9.6%\n" +
          "New AUM,$34.2M,12.8%\n\n" +
          "# Channels\n" +
          "Channel Name,ROI (%),Spend ($),Prospects,Clients,Change (%)\n" +
          "Facebook Ads,15.6,9200,48,8,4.2\n" +
          "LinkedIn Ads,17.2,12000,64,12,5.8\n" +
          "Google Ads,14.8,5800,32,6,-1.2\n" +
          "YouTube Ads,18.2,1500,8,2,15.5\n\n" +
          "# Campaigns\n" +
          "Campaign Name,Channel,Start Date,End Date,Status,Spend ($),Prospects,Clients,ROI (%)\n" +
          "Life Insurance,Facebook,2025-01-10,2025-03-10,Completed,6400,32,5,16.2\n" +
          "Retirement Security,LinkedIn,2025-02-15,2025-05-15,Active,7800,38,8,18.4\n" +
          "Business Protection,Google,2025-03-01,2025-05-01,Active,5200,26,5,15.8\n" +
          "Estate Planning,LinkedIn,2025-04-01,2025-06-30,Scheduled,4200,28,6,17.5\n";
        break;
      default:
        // Default example from the current template
        exampleData = 
          "# ROI Summary\n" +
          "Total Ad Spend,$25000,12.5%\n" +
          "Conversion Rate,18.5%,2.3%\n" +
          "New Prospects,145,15.2%\n" +
          "New AUM,$42.8M,14.5%\n\n" +
          "# Channels\n" +
          "Channel Name,ROI (%),Spend ($),Prospects,Clients,Change (%)\n" +
          "Facebook Ads,17.5,8500,40,8,5.2\n" +
          "LinkedIn Ads,18.2,10000,42,9,3.8\n" +
          "Google Ads,16.4,5000,20,3,-1.5\n" +
          "Referrals,15.0,1500,8,1,12.0\n\n" +
          "# Campaigns\n" +
          "Campaign Name,Channel,Start Date,End Date,Status,Spend ($),Prospects,Clients,ROI (%)\n" +
          "Retirement Planning,Facebook,2025-01-15,2025-03-15,Active,5200,22,4,18.2\n" +
          "Estate Planning,LinkedIn,2025-02-01,2025-04-30,Active,6500,28,5,16.5\n" +
          "Tax Strategies,Google,2025-03-01,2025-04-15,Active,3800,15,2,14.8\n" +
          "Wealth Transfer,Facebook,2025-04-01,2025-06-30,Scheduled,3200,0,0,0.0\n";
    }
    
    setCsvData(exampleData);
    toast.success(`${exampleType.charAt(0).toUpperCase() + exampleType.slice(1)} example loaded`);
  };
  
  const handleDownloadTemplate = () => {
    const templateCSV = 
      "# ROI Summary\n" +
      "Total Ad Spend,$25000,12.5%\n" +
      "Conversion Rate,18.5%,2.3%\n" +
      "New Prospects,145,15.2%\n" +
      "New AUM,$42.8M,14.5%\n\n" +
      "# Channels\n" +
      "Channel Name,ROI (%),Spend ($),Prospects,Clients,Change (%)\n" +
      "Facebook Ads,17.5,8500,40,8,5.2\n" +
      "LinkedIn Ads,18.2,10000,42,9,3.8\n" +
      "Google Ads,16.4,5000,20,3,-1.5\n" +
      "Referrals,15.0,1500,8,1,12.0\n\n" +
      "# Campaigns\n" +
      "Campaign Name,Channel,Start Date,End Date,Status,Spend ($),Prospects,Clients,ROI (%)\n" +
      "Retirement Planning,Facebook,2025-01-15,2025-03-15,Active,5200,22,4,18.2\n" +
      "Estate Planning,LinkedIn,2025-02-01,2025-04-30,Active,6500,28,5,16.5\n" +
      "Tax Strategies,Google,2025-03-01,2025-04-15,Active,3800,15,2,14.8\n" +
      "Wealth Transfer,Facebook,2025-04-01,2025-06-30,Scheduled,3200,0,0,0.0\n";
    
    const blob = new Blob([templateCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'roi_tracker_template.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Template downloaded successfully");
  };
  
  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Marketing ROI Spreadsheet"
      description="Import or customize your marketing ROI tracking spreadsheet"
      className="w-[90vw] max-w-[900px]"
    >
      <Tabs defaultValue="import" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Paste your CSV data below or upload a CSV file to import it into the ROI tracker.
            </p>
            
            <div className="grid gap-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleUploadClick} 
                  className="flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload CSV File
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="csvInput">CSV Data</Label>
                <Textarea 
                  id="csvInput"
                  placeholder="Paste your CSV data here..." 
                  value={csvData}
                  onChange={e => setCsvData(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleDownloadTemplate}>
                Download Template
              </Button>
              <Button disabled={!csvData.trim()} onClick={handleImport}>
                Import
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="examples">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select an example template that matches your practice to get started quickly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:border-primary cursor-pointer" onClick={() => handleDropExample("default")}>
                <h3 className="font-medium mb-2">General Financial Advisory</h3>
                <p className="text-sm text-muted-foreground mb-2">Standard template for wealth management practices.</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">4 Channels</span>
                  <span className="text-muted-foreground">4 Campaigns</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-primary cursor-pointer" onClick={() => handleDropExample("financial")}>
                <h3 className="font-medium mb-2">High Net Worth Focus</h3>
                <p className="text-sm text-muted-foreground mb-2">For advisors focusing on high net worth clients.</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">4 Channels</span>
                  <span className="text-muted-foreground">4 Campaigns</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-primary cursor-pointer" onClick={() => handleDropExample("insurance")}>
                <h3 className="font-medium mb-2">Insurance Products</h3>
                <p className="text-sm text-muted-foreground mb-2">For advisors with insurance product offerings.</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">4 Channels</span>
                  <span className="text-muted-foreground">4 Campaigns</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-6">
              <div className="grid gap-2">
                <Label htmlFor="examplePreview">Example Preview</Label>
                <Textarea 
                  id="examplePreview"
                  value={csvData}
                  onChange={e => setCsvData(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button disabled={!csvData.trim()} onClick={handleImport}>
                  Use This Example
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="template">
          <ResizablePanelGroup direction="horizontal" className="min-h-[350px]">
            <ResizablePanel defaultSize={50}>
              <div className="p-2 h-full">
                <p className="text-sm font-medium mb-2">Template Structure:</p>
                <div className="text-sm text-muted-foreground space-y-3">
                  <div>
                    <p className="font-medium">1. ROI Summary Section</p>
                    <p>Contains overall metrics: ad spend, conversion rate, prospects, and AUM</p>
                  </div>
                  <div>
                    <p className="font-medium">2. Channels Section</p>
                    <p>Lists marketing channels with their performance metrics</p>
                  </div>
                  <div>
                    <p className="font-medium">3. Campaigns Section</p>
                    <p>Details individual marketing campaigns and their results</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">Instructions:</p>
                  <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1">
                    <li>Download the template CSV file</li>
                    <li>Open it in Excel or Google Sheets</li> 
                    <li>Enter your practice's marketing data</li>
                    <li>Save as CSV and import it back</li>
                  </ol>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={50}>
              <div className="p-2 h-full overflow-auto">
                <p className="text-sm font-medium mb-2">Sample Template Preview:</p>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={3} className="bg-muted/50">ROI Summary</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Ad Spend</TableCell>
                        <TableCell>$25,000</TableCell>
                        <TableCell>12.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Conversion Rate</TableCell>
                        <TableCell>18.5%</TableCell>
                        <TableCell>2.3%</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={6} className="bg-muted/50">Channels</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead>Channel Name</TableHead>
                        <TableHead>ROI (%)</TableHead>
                        <TableHead>Spend ($)</TableHead>
                        <TableHead>Prospects</TableHead>
                        <TableHead>Clients</TableHead>
                        <TableHead>Change (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Facebook Ads</TableCell>
                        <TableCell>17.5</TableCell>
                        <TableCell>8,500</TableCell>
                        <TableCell>40</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>5.2</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleDownloadTemplate}>
                    Download Template
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
