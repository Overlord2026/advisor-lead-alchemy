
import { Progress } from "@/components/ui/progress";

interface ProgressSectionProps {
  goalId: string;
}

export const ProgressSection = ({ goalId }: ProgressSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">📊 Progress</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Questionnaire</span>
          <span>40%</span>
        </div>
        <Progress value={40} className="h-2" />
      </div>
    </div>
  );
};
