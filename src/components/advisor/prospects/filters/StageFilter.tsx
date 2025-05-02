
import React from 'react';
import { Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PROSPECT_STAGES = [
  "Initial Contact",
  "Discovery",
  "Presentation",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost"
];

interface StageFilterProps {
  selectedStage: string | null;
  onStageChange: (stage: string | null) => void;
}

const StageFilter: React.FC<StageFilterProps> = ({
  selectedStage,
  onStageChange
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "h-9",
            !selectedStage && "text-muted-foreground"
          )}
        >
          {selectedStage ? `Stage: ${selectedStage}` : "Select stage"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="py-2">
          <div 
            className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent"
            onClick={() => onStageChange(null)}
          >
            <div className="w-4 h-4 mr-2">
              {!selectedStage && <Check className="h-4 w-4" />}
            </div>
            All Stages
          </div>
          {PROSPECT_STAGES.map((stage) => (
            <div 
              key={stage}
              className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent"
              onClick={() => onStageChange(stage)}
            >
              <div className="w-4 h-4 mr-2">
                {selectedStage === stage && <Check className="h-4 w-4" />}
              </div>
              {stage}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StageFilter;
