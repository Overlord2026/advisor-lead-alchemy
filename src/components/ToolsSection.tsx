
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ToolsSectionProps {
  goalId: string;
}

export const ToolsSection = ({ goalId }: ToolsSectionProps) => {
  const tools = [
    {
      name: "Retirement Calculator",
      action: "Launch",
      icon: ExternalLink,
    },
    {
      name: "Pension Analysis",
      action: "Launch",
      icon: ExternalLink,
    },
    {
      name: "Schedule Review Call",
      action: "Ask for Help",
      icon: ExternalLink,
    },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Recommended Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tools.map((tool) => (
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
