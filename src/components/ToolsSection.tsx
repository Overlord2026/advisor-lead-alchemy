
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, PieChart, Phone, FileText } from "lucide-react";
import { GOALS } from "@/types/goals";

interface ToolsSectionProps {
  goalId: string;
}

interface Tool {
  name: string;
  action: string;
  icon: React.ElementType;
  segments?: string[];
}

export const ToolsSection = ({ goalId }: ToolsSectionProps) => {
  // Find the selected goal to get its applicable segments
  const selectedGoal = GOALS.find(goal => goal.id === goalId);
  const goalSegments = selectedGoal?.applicableSegments || [];

  // Tools with segment targeting
  const allTools: Tool[] = [
    {
      name: "Retirement Calculator",
      action: "Launch",
      icon: PieChart,
      segments: ['preretiree']
    },
    {
      name: "Pension Analysis",
      action: "Launch",
      icon: FileText,
      segments: ['preretiree']
    },
    {
      name: "Investment Opportunities",
      action: "View",
      icon: ExternalLink,
      segments: ['aspiring', 'uhnwi']
    },
    {
      name: "Tax Strategy Session",
      action: "Schedule",
      icon: ExternalLink,
      segments: ['uhnwi', 'preretiree']
    },
    {
      name: "Budget Planner",
      action: "Launch",
      icon: FileText,
      segments: ['aspiring']
    },
    {
      name: "Schedule Review Call",
      action: "Ask for Help",
      icon: Phone,
      segments: ['aspiring', 'preretiree', 'uhnwi'] // Available for all segments
    },
  ];

  // Filter tools based on the goal's segments
  const recommendedTools = goalSegments.length > 0
    ? allTools.filter(tool => 
        !tool.segments || 
        tool.segments.some(segment => goalSegments.includes(segment))
      )
    : allTools.slice(0, 3); // Fallback to first 3 tools if no segments specified

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Recommended Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedTools.map((tool) => (
            <div key={tool.name} className="flex justify-between items-center">
              <span>{tool.name}</span>
              <Button variant="outline" size="sm">
                <tool.icon className="h-4 w-4 mr-2" />
                {tool.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
