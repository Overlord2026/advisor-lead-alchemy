
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DateRange } from "./ROITracker";

interface DateRangeSelectorProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange, dates?: { startDate: string; endDate: string }) => void;
}

export const DateRangeSelector = ({ selectedRange, onRangeChange }: DateRangeSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    return date.toISOString().substring(0, 10);
  });
  const [endDate, setEndDate] = useState<string>(() => {
    return new Date().toISOString().substring(0, 10);
  });

  const dateRanges: { value: DateRange; label: string }[] = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "ytd", label: "Year to Date" },
    { value: "12m", label: "Last 12 Months" },
    { value: "custom", label: "Custom Range" },
  ];

  const handleRangeClick = (range: DateRange) => {
    if (range === "custom") {
      setIsDialogOpen(true);
    } else {
      onRangeChange(range);
    }
  };

  const handleCustomRangeSubmit = () => {
    onRangeChange("custom", { startDate, endDate });
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="p-2">
        <div className="flex flex-wrap gap-2">
          {dateRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleRangeClick(range.value)}
              className="px-4"
            >
              {range.value === "custom" && <CalendarIcon className="mr-2 h-4 w-4" />}
              {range.label}
            </Button>
          ))}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Custom Date Range</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCustomRangeSubmit}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
