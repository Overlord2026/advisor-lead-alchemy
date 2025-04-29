import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, PlayCircle, Download, Settings, ArrowRight } from "lucide-react";

const IntegrationsTrainingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integration Training Center</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to connect and use various practice management tools with your advisor portal
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="advyzon" className="w-full">
        <TabsList className="w-full max-w-md h-auto flex flex-wrap">
          <TabsTrigger value="advyzon" className="flex-1">Advyzon</TabsTrigger>
          <TabsTrigger value="redtail" className="flex-1">Redtail</TabsTrigger>
          <TabsTrigger value="salesforce" className="flex-1">Salesforce</TabsTrigger>
          <TabsTrigger value="wealthbox" className="flex-1">Wealthbox</TabsTrigger>
          <TabsTrigger value="practifi" className="flex-1">Practifi</TabsTrigger>
          <TabsTrigger value="ghl" className="flex-1">GHL</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* Advyzon Tab */}
          <TabsContent value="advyzon" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" /> Advyzon Setup Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2 w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Generate an API Key in Advyzon</p>
                      <p className="text-sm text-muted-foreground">Log into your Advyzon account and navigate to Settings {'->'} Integrations {'->'} API Keys</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto mt-1 text-sm"
                        onClick={() => window.open("https://www.advyzon.com/", "_blank")}
                      >
                        Visit Advyzon Website <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2 w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Enter Your Firm ID</p>
                      <p className="text-sm text-muted-foreground">Find your Firm ID in your account settings</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2 w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Connect to Advisor Portal</p>
                      <p className="text-sm text-muted-foreground">Enter your API key and Firm ID in the Practice Management section</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto mt-1 text-sm"
                        onClick={() => window.location.href = "/advisor#practice-management"}
                      >
                        Go to Practice Management <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Advyzon Integration Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Client Data Synchronization</h3>
                    <p className="text-sm text-muted-foreground">Automatically sync client profiles and account data between your advisor portal and Advyzon</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Document Management</h3>
                    <p className="text-sm text-muted-foreground">Share documents seamlessly between platforms, ensuring everything is up-to-date</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Portfolio Analytics</h3>
                    <p className="text-sm text-muted-foreground">Import portfolio data from Advyzon for enhanced analytics and reporting</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Meeting Recording Storage</h3>
                    <p className="text-sm text-muted-foreground">Automatically store meeting recordings with the associated client profiles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other platform tabs would have similar content structure */}
          <TabsContent value="redtail" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Redtail CRM Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn how to integrate your Redtail CRM data</p>
                <Button variant="outline" onClick={() => window.location.href = "/advisor#practice-management"}>
                  Go to Redtail Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="salesforce" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salesforce Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn how to integrate your Salesforce data</p>
                <Button variant="outline" onClick={() => window.location.href = "/advisor#practice-management"}>
                  Go to Salesforce Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wealthbox" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wealthbox Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn how to integrate your Wealthbox CRM data</p>
                <Button variant="outline" onClick={() => window.location.href = "/advisor#practice-management"}>
                  Go to Wealthbox Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practifi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Practifi Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn how to integrate your Practifi data</p>
                <Button variant="outline" onClick={() => window.location.href = "/advisor#practice-management"}>
                  Go to Practifi Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ghl" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Go High Level Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn how to integrate your Go High Level account</p>
                <Button variant="outline" onClick={() => window.location.href = "/advisor/training/ghl-integration"}>
                  Go to GHL Integration Guide
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-muted-foreground/50" />
                <div className="absolute inset-0 hover:bg-black/10 cursor-pointer flex items-center justify-center">
                  <Button variant="secondary" className="opacity-0 hover:opacity-100 transition-opacity">
                    Watch Video
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">Advyzon Data Sync</h3>
                <p className="text-sm text-muted-foreground">Learn how to sync client data between platforms</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-muted-foreground/50" />
                <div className="absolute inset-0 hover:bg-black/10 cursor-pointer flex items-center justify-center">
                  <Button variant="secondary" className="opacity-0 hover:opacity-100 transition-opacity">
                    Watch Video
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">Recording Integration</h3>
                <p className="text-sm text-muted-foreground">Store meeting recordings with client profiles</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-muted-foreground/50" />
                <div className="absolute inset-0 hover:bg-black/10 cursor-pointer flex items-center justify-center">
                  <Button variant="secondary" className="opacity-0 hover:opacity-100 transition-opacity">
                    Watch Video
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">Multi-platform Workflow</h3>
                <p className="text-sm text-muted-foreground">Create efficient workflows across all integrations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Integration Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Integration Quick Start Guide (PDF)
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Advyzon API Documentation
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Multi-platform Best Practices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsTrainingPage;
