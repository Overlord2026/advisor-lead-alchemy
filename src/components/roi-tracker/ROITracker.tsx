
import { useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  DownloadIcon,
  InfoIcon
} from "lucide-react";
import { DateRangeSelector } from "./DateRangeSelector";
import { RoiCharts } from "./RoiCharts";
import { formatCurrency } from "@/utils/format";
import "@/styles/roi-tracker.css";
import { CampaignTable } from "./CampaignTable";
import { ProspectJourney } from "./ProspectJourney";
import { AiRecommendations } from "./AiRecommendations";

export type ROIData = {
  summary: {
    adSpend: number;
    adSpendChange: number;
    conversionRate: number;
    conversionRateChange: number;
    prospects: number;
    prospectsChange: number;
    aum: number;
    aumChange: number;
  };
  channels: ChannelData[];
  campaigns: CampaignData[];
  journey: JourneyData;
  recommendations: RecommendationData[];
}

export type ChannelData = {
  name: string;
  roi: number;
  spend: number;
  prospects: number;
  clients: number;
  change: number;
}

export type CampaignData = {
  name: string;
  channel: string;
  startDate: string;
  endDate: string;
  status: string;
  spend: number;
  prospects: number;
  clients: number;
  roi: number;
}

export type JourneyData = {
  stages: {
    name: string;
    count: number;
    percent: number;
  }[];
  insights: {
    text: string;
    source: string;
  }[];
}

export type RecommendationData = {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: string;
  metric: string;
  value: string;
  icon: ReactNode;
}

export type DateRange = "7d" | "30d" | "90d" | "ytd" | "12m" | "custom";

export const ROITracker = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [customDates, setCustomDates] = useState<{startDate: string; endDate: string} | null>(null);
  const [roiData, setRoiData] = useState<ROIData | null>(null);

  useEffect(() => {
    loadRoiData();
  }, [dateRange, customDates]);

  const loadRoiData = async () => {
    setLoading(true);
    toast.info("Loading data...");

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on the screenshots
      const data: ROIData = {
        summary: {
          adSpend: 24650,
          adSpendChange: 12.5,
          conversionRate: 19.7,
          conversionRateChange: 2.3,
          prospects: 142,
          prospectsChange: 18.5,
          aum: 42800000, // $42.8M
          aumChange: 15.5
        },
        channels: [
          { name: "Facebook Ads", roi: 17.9, spend: 8450, prospects: 38, clients: 8, change: 5.2 },
          { name: "LinkedIn Ads", roi: 18.1, spend: 10200, prospects: 42, clients: 9, change: 3.8 },
          { name: "Google Ads", roi: 16.2, spend: 4500, prospects: 18, clients: 3, change: -2.1 },
          { name: "Referrals", roi: 15.3, spend: 1500, prospects: 6, clients: 1, change: 12.4 }
        ],
        campaigns: [
          { name: "Retirement Planning Q1", channel: "Facebook", startDate: "2025-01-15", endDate: "2025-03-15", status: "Active", spend: 5200, prospects: 38, clients: 8, roi: 18.2 },
          { name: "HNW Estate Planning", channel: "LinkedIn", startDate: "2025-02-01", endDate: "2025-04-30", status: "Active", spend: 6500, prospects: 42, clients: 9, roi: 16.5 },
          { name: "Tax Planning Strategies", channel: "Google", startDate: "2025-03-01", endDate: "2025-04-15", status: "Active", spend: 3800, prospects: 18, clients: 3, roi: 14.8 },
          { name: "Wealth Transfer", channel: "Facebook", startDate: "2025-04-01", endDate: "2025-06-30", status: "Scheduled", spend: 3250, prospects: 26, clients: 4, roi: 15.2 },
          { name: "Business Owner Strategies", channel: "LinkedIn", startDate: "2025-04-15", endDate: "2025-07-15", status: "Scheduled", spend: 1700, prospects: 6, clients: 1, roi: 13.6 }
        ],
        journey: {
          stages: [
            { name: "Lead Generated", count: 142, percent: 100 },
            { name: "Initial Meeting", count: 121, percent: 85 },
            { name: "Questionnaire", count: 94, percent: 66 },
            { name: "Follow-up", count: 68, percent: 48 }
          ],
          insights: [
            { text: "The largest drop-off occurs between Questionnaire and Follow-up stages (27.7% loss). Analysis of meeting recordings suggests prospects need more clarity on the value proposition at this stage.", source: "AI" },
            { text: "LinkedIn campaigns show 2.1% higher conversion rates from Initial Meeting to Questionnaire.", source: "AI" }
          ]
        },
        recommendations: [
          {
            title: "Optimize Questionnaire Completion",
            description: "Questionnaire completion rates have dropped 8% in the last month. Consider simplifying the form or adding progress indicators to improve completion rates.",
            priority: "high",
            impact: "Potential Impact",
            metric: "+12% Conversion",
            value: "Medium",
            icon: <span>📋</span>
          },
          {
            title: "Adjust LinkedIn Ad Targeting",
            description: "Analysis shows higher conversion rates for prospects aged 55-65 with executive titles. Consider refining LinkedIn targeting parameters to focus on this demographic.",
            priority: "medium",
            impact: "Potential Impact",
            metric: "+8% ROI",
            value: "Medium",
            icon: <span>👥</span>
          }
        ]
      };

      setRoiData(data);
      setLoading(false);
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error loading ROI data:", error);
      setLoading(false);
      toast.error("Failed to load ROI data");
    }
  };

  const handleDateRangeChange = (range: DateRange, dates?: {startDate: string; endDate: string}) => {
    setDateRange(range);
    
    if (range === "custom" && dates) {
      setCustomDates(dates);
      toast.info(`Showing data from ${formatDate(dates.startDate)} to ${formatDate(dates.endDate)}`);
    } else {
      setCustomDates(null);
      toast.info(`Showing data for ${getDateRangeLabel(range)}`);
    }
  };

  const getDateRangeLabel = (range: DateRange): string => {
    switch (range) {
      case "7d": return "Last 7 Days";
      case "30d": return "Last 30 Days";
      case "90d": return "Last 90 Days";
      case "ytd": return "Year to Date";
      case "12m": return "Last 12 Months";
      case "custom": return "Custom Range";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">ROI Tracker</h2>
          <p className="text-muted-foreground">Track and analyze your marketing and sales performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => toast.info("Exporting report...")}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <DateRangeSelector 
        selectedRange={dateRange}
        onRangeChange={handleDateRangeChange}
      />

      {/* ROI Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ROI Summary</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {roiData && (
            <>
              <MetricCard
                title="Total Ad Spend"
                value={formatCurrency(roiData.summary.adSpend)}
                change={roiData.summary.adSpendChange}
                icon="$"
                inverse={false}
              />
              <MetricCard
                title="Conversion Rate"
                value={`${roiData.summary.conversionRate.toFixed(1)}%`}
                change={roiData.summary.conversionRateChange}
                icon="%"
                inverse={false}
              />
              <MetricCard
                title="New Prospects"
                value={roiData.summary.prospects.toString()}
                change={roiData.summary.prospectsChange}
                icon="👥"
                inverse={false}
              />
              <MetricCard
                title="New AUM"
                value={formatCurrency(roiData.summary.aum, true)}
                change={roiData.summary.aumChange}
                icon="💰"
                inverse={false}
              />
            </>
          )}
        </div>
      </div>

      {/* ROI by Channel */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ROI by Channel</h3>
        <RoiCharts 
          channelData={roiData?.channels || []}
          isLoading={loading}
        />
      </div>

      {/* Campaign Performance */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
        <CampaignTable campaigns={roiData?.campaigns || []} />
      </div>

      {/* Prospect Journey Analysis */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Prospect Journey Analysis</h3>
        <ProspectJourney data={roiData?.journey || {stages: [], insights: []}} />
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <AiRecommendations recommendations={roiData?.recommendations || []} />
      </div>
    </div>
  );
};

type MetricCardProps = {
  title: string;
  value: string;
  change: number;
  icon: string;
  inverse?: boolean; // Changed from string to boolean
};

const MetricCard = ({ title, value, change, icon, inverse = false }: MetricCardProps) => {
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

export default ROITracker;
