
import React, { useState } from "react";
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
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Paste your CSV data below to import it into the ROI tracker. Make sure it follows the correct format.
            </p>
            
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
