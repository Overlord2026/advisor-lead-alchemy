import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ProspectService, ProspectFilter } from '@/services/ProspectService';

interface ProspectPipelineProps {
  leadSourceId: string | null;
}

const ProspectPipeline = ({ leadSourceId }: ProspectPipelineProps) => {
  useEffect(() => {
    const loadPipelineData = async () => {
      try {
        const filter: ProspectFilter = {};
        if (leadSourceId) {
          filter.lead_source_id = leadSourceId;
          console.log(`Fetching pipeline data for lead source: ${leadSourceId}`);
        } else {
          console.log("Fetching pipeline data for all lead sources");
        }
        
        // Example of how you would fetch data with the filter
        // const prospects = await ProspectService.getProspects(filter);
        // Process pipeline data based on prospects...
      } catch (error) {
        console.error("Error loading pipeline data:", error);
      }
    };
    
    loadPipelineData();
  }, [leadSourceId]);

  return (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-3">Prospect Pipeline</h3>
          <div className="h-40 w-full">
            <div className="flex h-full items-end justify-between gap-1">
              <div className="w-1/7 bg-blue-500 h-[75%] rounded-t-md"></div>
              <div className="w-1/7 bg-blue-500 h-[50%] rounded-t-md"></div>
              <div className="w-1/7 bg-blue-500 h-[45%] rounded-t-md"></div>
              <div className="w-1/7 bg-blue-500 h-[40%] rounded-t-md"></div>
              <div className="w-1/7 bg-blue-500 h-[30%] rounded-t-md"></div>
              <div className="w-1/7 bg-blue-500 h-[25%] rounded-t-md"></div>
              <div className="w-1/7 bg-blue-500 h-[20%] rounded-t-md"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Initial Contact</span>
              <span>Initial Meeting</span>
              <span>Questionnaire</span>
              <span>Follow-up</span>
              <span>Proposal</span>
              <span>Decision</span>
              <span>Onboarding</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectPipeline;
