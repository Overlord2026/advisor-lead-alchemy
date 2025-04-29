
import React from "react";
import { MetricCard } from "./MetricCard";
import { formatCurrency } from "@/utils/format";

export interface ROISummaryProps {
  adSpend: number;
  adSpendChange: number;
  conversionRate: number;
  conversionRateChange: number;
  prospects: number;
  prospectsChange: number;
  aum: number;
  aumChange: number;
}

export const ROISummary: React.FC<ROISummaryProps> = ({
  adSpend,
  adSpendChange,
  conversionRate,
  conversionRateChange,
  prospects,
  prospectsChange,
  aum,
  aumChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">ROI Summary</h3>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Ad Spend"
          value={formatCurrency(adSpend)}
          change={adSpendChange}
          icon="$"
          inverse={false}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          change={conversionRateChange}
          icon="%"
          inverse={false}
        />
        <MetricCard
          title="New Prospects"
          value={prospects.toString()}
          change={prospectsChange}
          icon="👥"
          inverse={false}
        />
        <MetricCard
          title="New AUM"
          value={formatCurrency(aum, true)}
          change={aumChange}
          icon="💰"
          inverse={false}
        />
      </div>
    </div>
  );
};
