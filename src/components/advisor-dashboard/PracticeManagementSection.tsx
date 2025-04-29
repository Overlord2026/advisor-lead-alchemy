
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, RefreshCw, Check, X, Link } from "lucide-react";
import { getAvailableIntegrations, getIntegrationFeatures, PracticeManagementProvider, connectProvider, disconnectProvider, syncProviderData } from "@/utils/practice-management";
import { toast } from "sonner";

const PracticeManagementSection = () => {
  const [selectedProvider, setSelectedProvider] = useState<PracticeManagementProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [credentialFields, setCredentialFields] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const allIntegrations = getAvailableIntegrations();
  const connectedIntegrations = allIntegrations.filter(i => i.connected);
  
  const handleConnect = async () => {
    if (!selectedProvider) return;
    
    setIsConnecting(true);
    
    try {
      const success = await connectProvider(selectedProvider, credentialFields);
      
      if (success) {
        setDialogOpen(false);
        setCredentialFields({});
      }
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleDisconnect = async (providerId: string) => {
    await disconnectProvider(providerId);
  };
  
  const handleSync = async (providerId: string) => {
    setIsSyncing(true);
    
    try {
      await syncProviderData(providerId, 'all');
    } finally {
      setIsSyncing(false);
    }
  };
  
  const openConnectDialog = (provider: PracticeManagementProvider) => {
    setSelectedProvider(provider);
    setCredentialFields({});
    setDialogOpen(true);
  };
  
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <Link className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle>Practice Management Integration</CardTitle>
          </div>
        </div>
        <CardDescription>
          Connect your practice management software to streamline your workflow
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="connected" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-sm mb-2">
            <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({allIntegrations.length - connectedIntegrations.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connected">
            {connectedIntegrations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No integrations connected yet. Connect your first integration to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connectedIntegrations.map((integration) => (
                  <div key={integration.id} className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                          <img 
                            src={integration.logoUrl} 
                            alt={integration.name} 
                            className="w-8 h-8 object-contain" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {integration.lastSynced ? `Last sync: ${new Date(integration.lastSynced).toLocaleString()}` : 'Not synced yet'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="bg-green-100 rounded-full px-2 py-1 flex items-center mr-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                          <span className="text-xs text-green-800">Connected</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {getIntegrationFeatures(integration.provider).map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          {feature.supported ? (
                            <Check className="text-green-500 h-4 w-4 mr-2" />
                          ) : (
                            <X className="text-red-500 h-4 w-4 mr-2" />
                          )}
                          <span className="text-sm">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                        disabled={isSyncing}
                        className="flex items-center"
                      >
                        <RefreshCw className={`h-4 w-4 mr-1 ${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? 'Syncing...' : 'Sync Data'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allIntegrations
                .filter(i => !i.connected)
                .map((integration) => (
                  <div key={integration.id} className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                        <img 
                          src={integration.logoUrl} 
                          alt={integration.name} 
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {integration.category === 'all' ? 'Full CRM Solution' : `${integration.category.toUpperCase()} Integration`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full bg-white hover:bg-purple-50"
                        onClick={() => openConnectDialog(integration.provider)}
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Process Flow Integration Diagram */}
        <Card className="border-purple-200 bg-white p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Integration Process Flow</CardTitle>
            <CardDescription>How our integrations enhance your workflow</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <img 
              src="/lovable-uploads/b8e79305-18d8-4f2e-b72a-f4b7ebd0c643.png" 
              alt="Integration Process Flow" 
              className="w-full rounded-lg border border-purple-100 shadow-sm" 
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-3 rounded-md">
                <h3 className="font-medium mb-2">Input Integrations</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">• Zoom meetings and recordings</li>
                  <li className="flex items-center">• Microsoft Teams calls</li>
                  <li className="flex items-center">• Google Meet sessions</li>
                  <li className="flex items-center">• In-person meeting notes</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h3 className="font-medium mb-2">Output Integrations</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">• Salesforce CRM updates</li>
                  <li className="flex items-center">• Redtail client records</li>
                  <li className="flex items-center">• Advyzon document management</li>
                  <li className="flex items-center">• Wealthbox task creation</li>
                  <li className="flex items-center">• Practifi workflow triggers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Need help setting up your practice management integrations? <a href="/advisor/training/integrations" className="text-purple-600 hover:underline">View integration guides</a>
        </div>
      </CardFooter>
      
      {/* Connection Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedProvider && `Connect to ${allIntegrations.find(i => i.provider === selectedProvider)?.name}`}
            </DialogTitle>
            <DialogDescription>
              Enter your credentials to connect your account
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {selectedProvider === 'advyzon' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your Advyzon API key"
                    value={credentialFields.apiKey || ''}
                    onChange={(e) => setCredentialFields({...credentialFields, apiKey: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firm-id">Firm ID</Label>
                  <Input
                    id="firm-id"
                    placeholder="Enter your Advyzon Firm ID"
                    value={credentialFields.firmId || ''}
                    onChange={(e) => setCredentialFields({...credentialFields, firmId: e.target.value})}
                  />
                </div>
              </>
            )}
            
            {(selectedProvider === 'redtail' || selectedProvider === 'wealthbox' || selectedProvider === 'practifi' || selectedProvider === 'salesforce') && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder={`Enter your ${selectedProvider} username`}
                    value={credentialFields.username || ''}
                    onChange={(e) => setCredentialFields({...credentialFields, username: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">API Token</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={`Enter your ${selectedProvider} API token`}
                    value={credentialFields.password || ''}
                    onChange={(e) => setCredentialFields({...credentialFields, password: e.target.value})}
                  />
                </div>
              </>
            )}
            
            <p className="text-xs text-muted-foreground mt-2">
              Your credentials are securely stored and encrypted. We use them solely for integration purposes.
            </p>
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
    </Card>
  );
};

export default PracticeManagementSection;
