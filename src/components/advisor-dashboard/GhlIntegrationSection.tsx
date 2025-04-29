
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users } from "lucide-react";
import { validateGhlCredentials, syncGhlLeads } from "@/utils/calendarIntegration";
import { toast } from "sonner";
import ConnectionStatus from './ghl-integration/ConnectionStatus';
import TrainingResources from './ghl-integration/TrainingResources';
import LeadsTable from './ghl-integration/LeadsTable';
import ConnectionDialog from './ghl-integration/ConnectionDialog';

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
          <ConnectionStatus 
            isConnected={isConnected}
            lastSynced={lastSynced}
            isConnecting={isConnecting}
            isSyncing={isSyncing}
            openDialog={() => setDialogOpen(true)}
            handleSyncLeads={handleSyncLeads}
          />
          <TrainingResources />
        </div>
        
        <LeadsTable isConnected={isConnected} />
        
        <ConnectionDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          apiKey={apiKey}
          setApiKey={setApiKey}
          handleConnect={handleConnect}
          isConnecting={isConnecting}
        />
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
