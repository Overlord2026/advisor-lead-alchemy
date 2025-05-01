
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ProspectPipeline = () => {
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
