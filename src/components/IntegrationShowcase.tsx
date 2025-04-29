
import React from 'react';
import { Video, Users, VideoIcon, MapPin, ArrowRight } from "lucide-react";

const IntegrationShowcase = () => {
  return (
    <section className="py-12 bg-card rounded-lg border border-border">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Works with every advisor tech stack</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side - Meeting Sources */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium mb-4">Meeting Sources</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-blue-100/10 flex items-center justify-center">
                  <VideoIcon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Zoom</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-purple-100/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Teams</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-green-100/10 flex items-center justify-center">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Google Meet</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-orange-100/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">In-Person</span>
              </div>
            </div>
          </div>
          
          {/* Center - Workflow */}
          <div className="py-8">
            <div className="bg-muted p-6 rounded-lg border border-border relative mx-auto max-w-md">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="text-center">
                  <div className="bg-primary/10 p-2 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2">
                    <span className="font-bold text-primary">AI</span>
                  </div>
                  <span className="text-xs">Prep</span>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                <div className="h-4 w-4 border-r border-b border-muted-foreground rotate-45 md:hidden"></div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-2 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2">
                    <span className="font-bold text-primary">AI</span>
                  </div>
                  <span className="text-xs">Notes</span>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                <div className="h-4 w-4 border-r border-b border-muted-foreground rotate-45 md:hidden"></div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-2 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2">
                    <span className="font-bold text-primary">✓</span>
                  </div>
                  <span className="text-xs">Tasks</span>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                <div className="h-4 w-4 border-r border-b border-muted-foreground rotate-45 md:hidden"></div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-2 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2">
                    <span className="font-bold text-primary">CRM</span>
                  </div>
                  <span className="text-xs">Update</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - CRM Integrations */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium mb-4">Practice Management</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-muted/50 rounded text-center">
                <span className="text-xs font-medium">Salesforce</span>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <span className="text-xs font-medium">Advyzon</span>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <span className="text-xs font-medium">GoHighLevel</span>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <span className="text-xs font-medium">Practifi</span>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <span className="text-xs font-medium">HubSpot</span>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <span className="text-xs font-medium">Wealthbox</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          Lovable adapts to your world—no data migrations, no retraining.
        </p>
      </div>
    </section>
  );
};

export default IntegrationShowcase;
