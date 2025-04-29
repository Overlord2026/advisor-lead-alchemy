
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecommendationData } from './types';

interface AiRecommendationsProps {
  recommendations: RecommendationData[];
}

export const AiRecommendations: React.FC<AiRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {recommendations.map((recommendation, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="text-3xl mt-1">
                  {recommendation.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-base">{recommendation.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {recommendation.description}
                  </p>
                </div>
              </div>
              <div>
                <span className={`recommendation-priority ${recommendation.priority} px-2 py-1 rounded-full text-xs font-medium`}>
                  {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">{recommendation.impact}</p>
                <p className="text-sm font-medium">{recommendation.value}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Estimated Gain</p>
                <p className="text-sm font-medium text-green-600">{recommendation.metric}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">View Analysis</Button>
              <Button size="sm">Implement</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
