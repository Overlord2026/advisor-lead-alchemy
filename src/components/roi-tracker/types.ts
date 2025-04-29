
import { ReactNode } from "react";

export type DateRange = "7d" | "30d" | "90d" | "ytd" | "12m" | "custom";

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
