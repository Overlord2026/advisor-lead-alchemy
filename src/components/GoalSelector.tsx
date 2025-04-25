
import { Checkbox } from "@/components/ui/checkbox";
import { GOALS, Goal } from "@/types/goals";
import { useState } from "react";

interface GoalSelectorProps {
  onGoalSelect: (goal: Goal | null) => void;
}

export const GoalSelector = ({ onGoalSelect }: GoalSelectorProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) => {
      const newSelection = prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId];
      
      const selectedGoal = GOALS.find((g) => g.id === goalId);
      onGoalSelect(selectedGoal || null);
      return newSelection;
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {GOALS.map((goal) => (
        <div key={goal.id} className="flex items-center space-x-2">
          <Checkbox
            id={goal.id}
            checked={selectedGoals.includes(goal.id)}
            onCheckedChange={() => handleGoalToggle(goal.id)}
          />
          <label
            htmlFor={goal.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {goal.name}
          </label>
        </div>
      ))}
    </div>
  );
};
