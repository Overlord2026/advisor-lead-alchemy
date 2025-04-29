
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TrainingResources: React.FC = () => {
  return (
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
  );
};

export default TrainingResources;
