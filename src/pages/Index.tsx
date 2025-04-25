
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalSelector } from "@/components/GoalSelector";
import { ProgressSection } from "@/components/ProgressSection";
import { ToolsSection } from "@/components/ToolsSection";
import { useState } from "react";
import { Goal } from "@/types/goals";

const Index = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Hello, Barry! — Select Your Top Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalSelector onGoalSelect={setSelectedGoal} />
          </CardContent>
        </Card>

        {selectedGoal && (
          <div className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Based on "{selectedGoal.name}":</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <ProgressSection goalId={selectedGoal.id} />
                <div className="space-y-4">
                  <h3 className="font-semibold">🚀 Next Steps</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Run retirement calculator</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <ToolsSection goalId={selectedGoal.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
