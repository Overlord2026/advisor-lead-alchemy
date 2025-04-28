
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, ArrowDownIcon, ArrowUpIcon, DownloadIcon } from "lucide-react";
import { DateRangeSelector } from "./DateRangeSelector";
import { RoiCharts } from "./RoiCharts";
import { formatCurrency } from "@/utils/format";
import "@/styles/roi-tracker.css"; // Import our custom CSS

export type ROIData = {
  summary: {
    adSpend: number;
    adSpendChange: number;
    prospects: number;
    prospectsChange: number;
    clients: number;
    clientsChange: number;
    revenue: number;
    revenueChange: number;
  };
  channels: ChannelData[];
  campaigns: CampaignData[];
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
  status: string;
  spend: number;
  prospects: number;
  clients: number;
  roi: number;
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
      
      // Mock data
      const data: ROIData = {
        summary: {
          adSpend: 25000,
          adSpendChange: 12.5,
          prospects: 142,
          prospectsChange: 8.2,
          clients: 28,
          clientsChange: 15.3,
          revenue: 352000,
          revenueChange: 18.7
        },
        channels: [
          { name: "Facebook Ads", roi: 17.9, spend: 8000, prospects: 48, clients: 9, change: 5.2 },
          { name: "LinkedIn Ads", roi: 18.1, spend: 7500, prospects: 42, clients: 8, change: 3.8 },
          { name: "Google Ads", roi: 16.2, spend: 6000, prospects: 36, clients: 7, change: -2.1 },
          { name: "Referrals", roi: 15.3, spend: 3500, prospects: 16, clients: 4, change: 12.4 }
        ],
        campaigns: [
          { name: "Retirement Planning Q1", channel: "Facebook", status: "Active", spend: 3500, prospects: 22, clients: 4, roi: 18.2 },
          { name: "Estate Planning", channel: "LinkedIn", status: "Active", spend: 4000, prospects: 18, clients: 3, roi: 16.5 },
          { name: "Tax-Efficient Investing", channel: "Google", status: "Scheduled", spend: 2500, prospects: 14, clients: 2, roi: 14.8 }
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

  const showChannelDetails = (channelName: string) => {
    toast.info(`Viewing details for ${channelName}`);
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

      <div className="grid gap-6 md:grid-cols-3">
        {roiData && (
          <>
            <MetricCard
              title="Ad Spend"
              value={formatCurrency(roiData.summary.adSpend)}
              change={roiData.summary.adSpendChange}
              inverse={true}
            />
            <MetricCard
              title="New Prospects"
              value={roiData.summary.prospects.toString()}
              change={roiData.summary.prospectsChange}
            />
            <MetricCard
              title="New Clients"
              value={roiData.summary.clients.toString()}
              change={roiData.summary.clientsChange}
            />
          </>
        )}
      </div>

      <RoiCharts 
        channelData={roiData?.channels || []}
        isLoading={loading}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Marketing Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Channel</th>
                    <th className="text-right py-2">ROI</th>
                    <th className="text-right py-2">Spend</th>
                    <th className="text-right py-2">Prospects</th>
                  </tr>
                </thead>
                <tbody>
                  {roiData?.channels.map((channel, index) => (
                    <tr 
                      key={index} 
                      className="border-b cursor-pointer hover:bg-muted/50"
                      onClick={() => showChannelDetails(channel.name)}
                    >
                      <td className="py-3">
                        <div className="channel-info flex items-center gap-3">
                          <div className={`channel-icon w-7 h-7 rounded-full flex items-center justify-center text-white ${getChannelClass(channel.name)}`}>
                            {getChannelIcon(channel.name)}
                          </div>
                          <span>{channel.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-3">
                        <span className={`roi-value ${getRoiValueClass(channel.roi)} px-2 py-1 rounded-full text-xs font-medium`}>
                          {channel.roi.toFixed(1)}x
                        </span>
                      </td>
                      <td className="text-right py-3">{formatCurrency(channel.spend)}</td>
                      <td className="text-right py-3">{channel.prospects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Campaign</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-right py-2">ROI</th>
                    <th className="text-right py-2">Clients</th>
                  </tr>
                </thead>
                <tbody>
                  {roiData?.campaigns.map((campaign, index) => (
                    <tr key={index} className="border-b cursor-pointer hover:bg-muted/50">
                      <td className="py-3">
                        <div className="campaign-info">
                          <span className="campaign-name">{campaign.name}</span>
                          <span className="text-xs text-muted-foreground">{campaign.channel}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`status-badge ${campaign.status.toLowerCase()} px-2 py-1 rounded-full text-xs font-medium`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="text-right py-3">
                        <span className={`roi-value ${getRoiValueClass(campaign.roi)} px-2 py-1 rounded-full text-xs font-medium`}>
                          {campaign.roi.toFixed(1)}x
                        </span>
                      </td>
                      <td className="text-right py-3">{campaign.clients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper functions for CSS class names
const getChannelClass = (channelName: string): string => {
  if (channelName.toLowerCase().includes('facebook')) return 'facebook';
  if (channelName.toLowerCase().includes('linkedin')) return 'linkedin';
  if (channelName.toLowerCase().includes('google')) return 'google';
  if (channelName.toLowerCase().includes('referral')) return 'referral';
  return '';
};

const getChannelIcon = (channelName: string): string => {
  if (channelName.toLowerCase().includes('facebook')) return 'f';
  if (channelName.toLowerCase().includes('linkedin')) return 'in';
  if (channelName.toLowerCase().includes('google')) return 'G';
  if (channelName.toLowerCase().includes('referral')) return 'R';
  return '';
};

const getRoiValueClass = (roi: number): string => {
  if (roi >= 18) return 'high';
  if (roi >= 16) return 'medium';
  return 'low';
};

type MetricCardProps = {
  title: string;
  value: string;
  change: number;
  inverse?: boolean;
};

const MetricCard = ({ title, value, change, inverse = false }: MetricCardProps) => {
  const isPositive = inverse ? change < 0 : change > 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <div className={`mt-2 flex items-center text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}>
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            <span>{Math.abs(change).toFixed(1)}% vs. previous period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROITracker;
