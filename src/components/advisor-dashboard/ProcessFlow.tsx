
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
      
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="process-step">
          <div className="process-step-number">1</div>
          <h3 className="text-xl font-bold mb-2">Prospect Identification & Qualification</h3>
          <p className="text-muted-foreground">
            Use AI-powered scoring to identify and prioritize high-value prospects based on multiple factors, including wealth indicators, behavioral signals, and referral sources.
          </p>
        </div>
        
        <div className="process-step">
          <div className="process-step-number">2</div>
          <h3 className="text-xl font-bold mb-2">Meeting Intelligence & Analysis</h3>
          <p className="text-muted-foreground">
            Record and automatically analyze client conversations to extract insights, action items, and sentiment data to inform your approach.
          </p>
        </div>
        
        <div className="process-step">
          <div className="process-step-number">3</div>
          <h3 className="text-xl font-bold mb-2">Personalized Data Collection</h3>
          <p className="text-muted-foreground">
            Deploy smart questionnaires that adapt based on previous inputs and meeting insights to gather comprehensive client information efficiently.
          </p>
        </div>
        
        <div className="process-step">
          <div className="process-step-number">4</div>
          <h3 className="text-xl font-bold mb-2">Automated Communication</h3>
          <p className="text-muted-foreground">
            Send timely, personalized emails that integrate insights from all previous interactions, with optimal timing determined by AI analysis.
          </p>
        </div>
        
        <div className="process-step">
          <div className="process-step-number">5</div>
          <h3 className="text-xl font-bold mb-2">Performance Tracking & Optimization</h3>
          <p className="text-muted-foreground">
            Track ROI and conversion rates across your entire sales process, with AI recommendations for improving performance.
          </p>
        </div>
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
