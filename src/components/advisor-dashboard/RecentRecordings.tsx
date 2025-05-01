
import React from 'react';
import { Mic, Play, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recording } from "@/types/recordings";
import { useNavigate } from "react-router-dom";

// Sample data - in a real implementation, this would be fetched from an API
const recentRecordings: Partial<Recording>[] = [
  {
    id: "1",
    title: "Initial Discovery",
    prospectName: "John Doe",
    date: "2025-04-22",
    duration: "45 min",
    hasAiAnalysis: true,
  },
  {
    id: "2",
    title: "Follow-up Discussion",
    prospectName: "Mary Smith",
    date: "2025-04-21",
    duration: "32 min",
    hasAiAnalysis: true,
  },
  {
    id: "3",
    title: "Financial Planning",
    prospectName: "Robert Johnson",
    date: "2025-04-20",
    duration: "58 min",
    hasAiAnalysis: false,
  }
];

const RecentRecordings = () => {
  const navigate = useNavigate();

  const handleStartRecording = () => {
    navigate("/advisor/recordings");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Recordings</CardTitle>
        <Button onClick={handleStartRecording} size="sm" variant="outline" className="text-primary hover:bg-primary hover:text-white">
          <Plus className="mr-1 h-4 w-4" />
          New Recording
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRecordings.map((recording) => (
            <div key={recording.id} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{recording.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {recording.prospectName} • {recording.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {recording.hasAiAnalysis && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    AI Analysis
                  </Badge>
                )}
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="pt-2 text-center">
            <Button 
              variant="link" 
              onClick={() => navigate("/advisor/recordings")}
              className="text-sm"
            >
              View All Recordings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRecordings;
