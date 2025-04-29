
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import type { JourneyData } from './ROITracker';

interface ProspectJourneyProps {
  data: JourneyData;
}

export const ProspectJourney: React.FC<ProspectJourneyProps> = ({ data }) => {
  const { stages, insights } = data;

  // Convert stages to chart data
  const chartData = stages.map(stage => ({
    name: stage.name,
    prospects: stage.count
  }));

  return (
    <div className="space-y-6">
      <div className="h-80 bg-card rounded-lg border">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Number of Prospects', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="prospects"
              stroke="#4a6cf7"
              strokeWidth={3}
              dot={{ r: 6, strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stages.map((stage, index) => (
          <JourneyStageCard 
            key={index}
            title={stage.name}
            count={stage.count}
            percent={stage.percent}
            isFirst={index === 0}
          />
        ))}
      </div>

      {insights.length > 0 && (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <Card key={index} className="bg-blue-50 border-blue-200">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="mt-0.5 text-blue-500 bg-blue-100 p-1 rounded-full">
                  <InfoIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="ai-badge">AI Insight</span>
                  </div>
                  <p className="text-sm text-gray-700">{insight.text}</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-xs text-blue-600 p-0 h-auto mt-1"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

interface JourneyStageCardProps {
  title: string;
  count: number;
  percent: number;
  isFirst: boolean;
}

const JourneyStageCard: React.FC<JourneyStageCardProps> = ({ title, count, percent, isFirst }) => {
  const getStageIcon = (title: string): string => {
    if (title.includes('Lead')) return '📊';
    if (title.includes('Meeting')) return '🗓️';
    if (title.includes('Questionnaire')) return '📋';
    if (title.includes('Follow')) return '📱';
    return '📄';
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="text-3xl">
            {getStageIcon(title)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{count}</p>
            <div className="mt-1 flex items-center text-sm">
              {!isFirst && (
                <span className="text-blue-600">{percent}%</span>
              )}
              <span className="text-muted-foreground ml-1">{isFirst ? '100%' : 'conversion rate'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
