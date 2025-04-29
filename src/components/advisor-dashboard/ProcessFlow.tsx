
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { toast } from "sonner";

const ProcessFlow = () => {
  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Streamlined Sales Process</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our integrated system enables a cohesive 5-step approach to client acquisition and management
        </p>
      </div>
      
      <div className="flex justify-between items-center relative max-w-4xl mx-auto mb-10">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {step}
            </div>
          </div>
        ))}
        
        {/* Connecting line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-muted -z-0"></div>
      </div>
      
      <div className="mt-10 text-center">
        <Button 
          variant="default" 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => {
            toast.success("Demo mode activated", {
              description: "All features are fully functional in this demo version."
            });
          }}
        >
          <Play className="mr-2 h-4 w-4" />
          Start Demo Walkthrough
        </Button>
      </div>
    </div>
  );
};

export default ProcessFlow;
