
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export type MetricCardProps = {
  title: string;
  value: string;
  change: number;
  icon: string;
  inverse?: boolean;
};

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  inverse = false 
}) => {
  const isPositive = inverse ? change < 0 : change > 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="metric-icon w-10 h-10 rounded-full flex items-center justify-center text-white bg-primary/10 text-primary">
            {icon}
          </div>
          <div className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"} flex items-center`}>
            {isPositive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
            {Math.abs(change)}% vs. previous
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
