
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ROITrackerHeader } from "./ROITrackerHeader";
import { DateRangeSelector } from "./DateRangeSelector";
import { RoiCharts } from "./RoiCharts";
import { CampaignTable } from "./CampaignTable";
import { ProspectJourney } from "./ProspectJourney";
import { AiRecommendations } from "./AiRecommendations";
import { ROISummary } from "./ROISummary";
import { DateRange, ROIData } from "./types";
import "@/styles/roi-tracker.css";

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
      <ROITrackerHeader />

      <DateRangeSelector 
        selectedRange={dateRange}
        onRangeChange={handleDateRangeChange}
      />

      {/* ROI Summary */}
      {roiData && (
        <ROISummary 
          adSpend={roiData.summary.adSpend}
          adSpendChange={roiData.summary.adSpendChange}
          conversionRate={roiData.summary.conversionRate}
          conversionRateChange={roiData.summary.conversionRateChange}
          prospects={roiData.summary.prospects}
          prospectsChange={roiData.summary.prospectsChange}
          aum={roiData.summary.aum}
          aumChange={roiData.summary.aumChange}
        />
      )}

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

export default ROITracker;
