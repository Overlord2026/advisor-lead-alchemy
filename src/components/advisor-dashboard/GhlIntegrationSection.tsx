
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ExternalLink, Key, RefreshCw, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { validateGhlCredentials, syncGhlLeads } from "@/utils/calendarIntegration";
import { toast } from "sonner";

const GhlIntegrationSection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const isValid = await validateGhlCredentials(apiKey);
      
      if (isValid) {
        setIsConnected(true);
        setLastSynced(new Date().toISOString());
        toast.success("Successfully connected to Go High Level");
        setDialogOpen(false);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSyncLeads = async () => {
    if (!isConnected) {
      toast.error("Please connect to Go High Level first");
      return;
    }
    
    setIsSyncing(true);
    
    try {
      await syncGhlLeads(apiKey);
      setLastSynced(new Date().toISOString());
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle>Lead Generation Integration</CardTitle>
          </div>
          <Button 
            variant="outline"
            className="bg-white hover:bg-blue-50 border-blue-200"
            onClick={() => window.open("https://www.gohighlevel.com/", "_blank")}
          >
            Visit GHL <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Connect with Go High Level to manage your leads and appointments
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
            <p className="text-sm font-medium text-blue-600 mb-1">Connection Status</p>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-lg font-medium">
                {isConnected ? 'Connected to Go High Level' : 'Not Connected'}
              </p>
            </div>
            {lastSynced && (
              <p className="text-sm text-muted-foreground mt-1">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </p>
            )}
            <div className="mt-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className={isConnected ? "bg-white" : "bg-blue-600 text-white"}>
                    {isConnected ? 'Update Connection' : 'Connect to GHL'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Connect to Go High Level</DialogTitle>
                    <DialogDescription>
                      Enter your API key to connect with your Go High Level account.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="ghl-api-key" className="flex items-center">
                        API Key <Key className="ml-1 h-3 w-3" />
                      </Label>
                      <Input
                        id="ghl-api-key"
                        type="password"
                        placeholder="Enter your GHL API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        You can find your API key in your Go High Level account settings.
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? 'Connecting...' : 'Connect'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {isConnected && (
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={handleSyncLeads}
                  disabled={isSyncing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Leads'}
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
            <p className="text-sm font-medium text-blue-600 mb-1">Training Resources</p>
            <p className="text-lg font-medium">Learn How to Integrate with GHL</p>
            <div className="space-y-3 mt-3">
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2">
                  <span className="text-blue-600 text-xs font-medium">1</span>
                </div>
                <p className="text-sm">Connect your GHL account using your API key</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2">
                  <span className="text-blue-600 text-xs font-medium">2</span>
                </div>
                <p className="text-sm">Configure lead capture forms in GHL to sync with your advisor portal</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2">
                  <span className="text-blue-600 text-xs font-medium">3</span>
                </div>
                <p className="text-sm">Set up appointment booking rules in your calendar</p>
              </div>
            </div>
            <Button 
              variant="link" 
              className="text-blue-600 p-0 h-auto mt-3"
              onClick={() => window.open("/advisor/training/ghl-integration", "_blank")}
            >
              View Full Training Guide <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {isConnected && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">Recent Leads from GHL</p>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 whitespace-nowrap">John Smith</td>
                    <td className="px-4 py-3 whitespace-nowrap">john.smith@example.com</td>
                    <td className="px-4 py-3 whitespace-nowrap">(555) 123-4567</td>
                    <td className="px-4 py-3 whitespace-nowrap">Facebook Ad</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 28, 2025</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <Button size="sm" variant="outline">Schedule</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50/50">
                    <td className="px-4 py-3 whitespace-nowrap">Jane Doe</td>
                    <td className="px-4 py-3 whitespace-nowrap">jane.doe@example.com</td>
                    <td className="px-4 py-3 whitespace-nowrap">(555) 987-6543</td>
                    <td className="px-4 py-3 whitespace-nowrap">Website Form</td>
                    <td className="px-4 py-3 whitespace-nowrap">Apr 27, 2025</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <Button size="sm" variant="outline">Schedule</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Need help setting up your GHL integration? Contact our support team.
        </div>
      </CardFooter>
    </Card>
  );
};

export default GhlIntegrationSection;
