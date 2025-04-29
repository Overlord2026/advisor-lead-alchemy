import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, PlayCircle, Download, Calendar, Users, Settings, ArrowRight } from "lucide-react";

const GhlTrainingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Go High Level Integration Training</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to connect and use Go High Level with your advisor portal
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" /> Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2 w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Create a Go High Level Account</p>
                  <p className="text-sm text-muted-foreground">Sign up for GHL if you don't already have an account</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto mt-1 text-sm"
                    onClick={() => window.open("https://www.gohighlevel.com/", "_blank")}
                  >
                    Visit GHL Website <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2 w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Generate an API Key</p>
                  <p className="text-sm text-muted-foreground">Navigate to Settings {'->'} API {'->'} Create API Key</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto mt-1 text-sm"
                    onClick={() => window.open("https://help.gohighlevel.com/support/solutions/articles/48001208361-how-to-create-an-api-key", "_blank")}
                  >
                    View GHL API Guide <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2 w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Connect to Advisor Portal</p>
                  <p className="text-sm text-muted-foreground">Enter your API key in the GHL integration section</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto mt-1 text-sm"
                    onClick={() => window.location.href = "/advisor#ghl-integration"}
                  >
                    Go to Integration Section <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" /> Lead Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Setting Up Lead Capture</h3>
                <p className="text-sm text-muted-foreground mt-1">Configure your GHL forms to capture leads and sync with your advisor portal</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 w-4 h-4 flex items-center justify-center text-xs font-medium">•</div>
                    Create form templates in GHL
                  </li>
                  <li className="text-sm flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 w-4 h-4 flex items-center justify-center text-xs font-medium">•</div>
                    Set up custom fields for financial data
                  </li>
                  <li className="text-sm flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 w-4 h-4 flex items-center justify-center text-xs font-medium">•</div>
                    Configure tags for lead segmentation
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium">Lead Nurturing Workflows</h3>
                <p className="text-sm text-muted-foreground mt-1">Set up automated follow-up sequences for new leads</p>
                <Button 
                  variant="outline" 
                  className="mt-2 w-full"
                  size="sm"
                  onClick={() => window.open("https://help.gohighlevel.com/support/solutions/articles/48001208874-workflows-overview", "_blank")}
                >
                  View Workflow Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Calendar Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Appointment Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">Configure your availability and booking rules</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 w-4 h-4 flex items-center justify-center text-xs font-medium">•</div>
                    Set your available hours
                  </li>
                  <li className="text-sm flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 w-4 h-4 flex items-center justify-center text-xs font-medium">•</div>
                    Create appointment types
                  </li>
                  <li className="text-sm flex items-center">
                    <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 w-4 h-4 flex items-center justify-center text-xs font-medium">•</div>
                    Set up confirmation emails
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium">Two-Way Calendar Sync</h3>
                <p className="text-sm text-muted-foreground mt-1">Connect your GHL calendar with advisor portal</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  size="sm"
                  onClick={() => window.location.href = "/advisor/calendar"}
                >
                  Go to Calendar Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
                <h3 className="font-medium">GHL Initial Setup</h3>
                <p className="text-sm text-muted-foreground">Learn how to set up your GHL account</p>
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
                <h3 className="font-medium">Lead Capture Forms</h3>
                <p className="text-sm text-muted-foreground">Create effective lead capture forms</p>
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
                <h3 className="font-medium">Calendar Integration</h3>
                <p className="text-sm text-muted-foreground">Set up appointment booking</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              GHL Quick Start Guide (PDF)
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Lead Management Best Practices
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Appointment Setting Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GhlTrainingPage;
