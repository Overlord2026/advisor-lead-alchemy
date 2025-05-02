
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, BarChart } from "lucide-react";

interface StatCardsProps {
  leadSourceId: string | null;
}

const StatCards = ({ leadSourceId }: StatCardsProps) => {
  // In a real application, we would fetch stats based on leadSourceId
  // For now, we'll just log it to show it's being received
  useEffect(() => {
    if (leadSourceId) {
      console.log(`Fetching stats for lead source: ${leadSourceId}`);
    } else {
      console.log("Fetching stats for all lead sources");
    }
  }, [leadSourceId]);

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-blue-100 mr-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Total Prospects</span>
            </div>
            <p className="text-3xl font-bold">42</p>
            <p className="text-xs text-green-600 mt-1">+15% this month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-blue-100 mr-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Active Prospects</span>
            </div>
            <p className="text-3xl font-bold">28</p>
            <p className="text-xs text-green-600 mt-1">+5% this month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-blue-100 mr-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Meetings Scheduled</span>
            </div>
            <p className="text-3xl font-bold">15</p>
            <p className="text-xs text-green-600 mt-1">+20% this month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-green-100 mr-2">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium">Conversions</span>
            </div>
            <p className="text-3xl font-bold">8</p>
            <p className="text-xs text-green-600 mt-1">+12% this month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
