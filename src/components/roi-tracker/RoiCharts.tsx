
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MarketingChannelData {
  name: string;
  roi: number;
  fill: string;
}

interface JourneyData {
  name: string;
  prospects: number;
}

interface ChartConfigTheme {
  light: string;
  dark: string;
}

interface MarketingChannelConfig {
  label: string;
  theme: ChartConfigTheme;
}

interface ChartConfig {
  facebook: MarketingChannelConfig;
  linkedin: MarketingChannelConfig;
  google: MarketingChannelConfig;
  referral: MarketingChannelConfig;
}

interface RoiChartsProps {
  channelData: {
    name: string;
    roi: number;
    spend: number;
    prospects: number;
    clients: number;
    change: number;
  }[];
  isLoading: boolean;
}

const marketingChannelData: MarketingChannelData[] = [
  { name: "Facebook Ads", roi: 17.9, fill: "#4267B2" },
  { name: "LinkedIn Ads", roi: 18.1, fill: "#0077B5" },
  { name: "Google Ads", roi: 16.2, fill: "#DB4437" },
  { name: "Referrals", roi: 15.3, fill: "#34A853" },
];

const journeyData: JourneyData[] = [
  { name: "Lead Gen", prospects: 142 },
  { name: "Meeting", prospects: 121 },
  { name: "Question", prospects: 94 },
  { name: "Follow-up", prospects: 68 },
  { name: "Proposal", prospects: 44 },
  { name: "Client", prospects: 28 },
];

export const MarketingChannelChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI by Marketing Channel</CardTitle>
        <CardDescription>Return on investment for different marketing channels</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={marketingChannelData}>
            <XAxis dataKey="name" />
            <YAxis 
              label={{ value: 'Return on Investment (x)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}x`, 'ROI']} 
              labelFormatter={(label) => `Channel: ${label}`}
            />
            <Bar dataKey="roi" fill="#4a6cf7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const JourneyFunnelChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prospect Journey Funnel</CardTitle>
        <CardDescription>Conversion at each stage of the prospect journey</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={journeyData}>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Number of Prospects', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line 
              type="monotone"
              dataKey="prospects"
              stroke="#4a6cf7"
              strokeWidth={2}
              dot={{ r: 5, strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, config }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {children}
    </div>
  );
};

// Add the main RoiCharts component that's being imported in ROITracker.tsx
export const RoiCharts: React.FC<RoiChartsProps> = ({ channelData, isLoading }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MarketingChannelChart />
      <JourneyFunnelChart />
    </div>
  );
};

// Default export for convenience
export default RoiCharts;
