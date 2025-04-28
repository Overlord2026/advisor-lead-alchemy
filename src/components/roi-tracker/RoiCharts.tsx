
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChannelData } from "./ROITracker";

type RoiChartsProps = {
  channelData: ChannelData[];
  isLoading: boolean;
};

export const RoiCharts = ({ channelData, isLoading }: RoiChartsProps) => {
  const [chartType, setChartType] = useState<"channel" | "journey">("channel");

  const journeyData = [
    { stage: "Lead Generated", value: 142 },
    { stage: "Initial Meeting", value: 121 },
    { stage: "Questionnaire", value: 94 },
    { stage: "Follow-up", value: 68 },
    { stage: "Proposal", value: 44 },
    { stage: "Client", value: 28 },
  ];

  const channelChartConfig = {
    facebook: {
      label: "Facebook Ads",
      theme: {
        light: "#4267B2",
        dark: "#4267B2",
      },
    },
    linkedin: {
      label: "LinkedIn Ads",
      theme: {
        light: "#0077B5",
        dark: "#0077B5",
      },
    },
    google: {
      label: "Google Ads",
      theme: {
        light: "#DB4437",
        dark: "#DB4437",
      },
    },
    referral: {
      label: "Referrals",
      theme: {
        light: "#34A853",
        dark: "#34A853",
      },
    },
  };

  const journeyChartConfig = {
    journey: {
      label: "Prospects",
      theme: {
        light: "#4a6cf7",
        dark: "#4a6cf7",
      },
    },
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Performance Charts</CardTitle>
          <Tabs value={chartType} onValueChange={(value) => setChartType(value as "channel" | "journey")}>
            <TabsList>
              <TabsTrigger value="channel">Channel ROI</TabsTrigger>
              <TabsTrigger value="journey">Journey Funnel</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : (
          <div className="h-[350px]">
            {chartType === "channel" ? (
              <ChartContainer config={channelChartConfig}>
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}x`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <ChartTooltipContent>
                          <div className="space-y-1">
                            <p className="text-sm font-bold">{data.name}</p>
                            <p className="text-sm text-muted-foreground">ROI: {data.roi.toFixed(1)}x</p>
                            <p className="text-sm text-muted-foreground">Prospects: {data.prospects}</p>
                            <p className="text-sm text-muted-foreground">Clients: {data.clients}</p>
                          </div>
                        </ChartTooltipContent>
                      );
                    }}
                  />
                  <Bar
                    dataKey="roi"
                    radius={[4, 4, 0, 0]}
                    fill="var(--color-facebook)"
                    name="facebook"
                  />
                </BarChart>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                />
              </ChartContainer>
            ) : (
              <ChartContainer config={journeyChartConfig}>
                <LineChart data={journeyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="stage" 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <ChartTooltipContent>
                          <div className="space-y-1">
                            <p className="text-sm font-bold">{data.stage}</p>
                            <p className="text-sm text-muted-foreground">Prospects: {data.value}</p>
                          </div>
                        </ChartTooltipContent>
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-journey)"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                    name="journey"
                  />
                </LineChart>
              </ChartContainer>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
