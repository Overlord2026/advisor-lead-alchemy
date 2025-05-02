
import React from 'react';
import { Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PROSPECT_STATUSES = ["new", "active", "inactive", "converted", "archived"];

interface StatusFilterProps {
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "h-9",
            !selectedStatus && "text-muted-foreground"
          )}
        >
          {selectedStatus ? `Status: ${selectedStatus}` : "Select status"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="py-2">
          <div 
            className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent"
            onClick={() => onStatusChange(null)}
          >
            <div className="w-4 h-4 mr-2">
              {!selectedStatus && <Check className="h-4 w-4" />}
            </div>
            All Statuses
          </div>
          {PROSPECT_STATUSES.map((status) => (
            <div 
              key={status}
              className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent"
              onClick={() => onStatusChange(status)}
            >
              <div className="w-4 h-4 mr-2">
                {selectedStatus === status && <Check className="h-4 w-4" />}
              </div>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StatusFilter;
