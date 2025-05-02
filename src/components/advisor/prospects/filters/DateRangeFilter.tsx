
import React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  className?: string;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  onDateRangeChange,
  className = ""
}) => {
  const { from, to } = dateRange;

  return (
    <div className={`flex items-center ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "justify-start text-left font-normal h-9",
              !from && !to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {format(from, "MMM d, yyyy")} - {format(to, "MMM d, yyyy")}
                </>
              ) : (
                format(from, "MMM d, yyyy")
              )
            ) : (
              "Date range"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={from}
            selected={{ from, to }}
            onSelect={(range) => {
              onDateRangeChange({
                from: range?.from,
                to: range?.to
              });
            }}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
          {(from || to) && (
            <div className="p-3 border-t border-border flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDateRangeChange({ from: undefined, to: undefined })}
              >
                Clear
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
