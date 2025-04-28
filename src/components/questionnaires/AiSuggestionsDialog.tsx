
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Edit, Info, Sparkles, RefreshCw, Plus } from "lucide-react";
import { toast } from "sonner";

interface AiSuggestionsDialogProps {
  type: "questions" | "sections" | "improvements";
  onClose: () => void;
}

interface Suggestion {
  title: string;
  description: string;
}

export const AiSuggestionsDialog: React.FC<AiSuggestionsDialogProps> = ({ type, onClose }) => {
  // Mock suggestion data based on type
  const getSuggestions = (): Suggestion[] => {
    switch (type) {
      case "questions":
        return [
          {
            title: "Retirement Goals",
            description: "What specific lifestyle would you like to maintain in retirement, and have you calculated the annual income needed to support it?"
          },
          {
            title: "Estate Planning Concerns",
            description: "During our conversation, you mentioned concerns about minimizing estate taxes. Could you elaborate on your specific goals for wealth transfer to the next generation?"
          },
          {
            title: "Business Succession",
            description: "You mentioned owning a business. Have you developed a formal succession plan, and if so, what is your timeline for implementation?"
          }
        ];
      case "sections":
        return [
          {
            title: "Charitable Giving Goals",
            description: "A section to capture the prospect's philanthropic interests, current giving strategies, and desired legacy impact."
          },
          {
            title: "Family Dynamics Assessment",
            description: "Questions to understand family relationships, communication patterns, and potential conflicts that could impact financial planning."
          },
          {
            title: "Risk Management Review",
            description: "Comprehensive assessment of current insurance coverage and potential gaps based on the prospect's specific risk factors mentioned in meetings."
          }
        ];
      case "improvements":
        return [
          {
            title: "Simplify Investment Section",
            description: "Analysis shows 32% of prospects abandon the questionnaire in the investment section. Consider reducing the number of technical questions and adding more explanatory text."
          },
          {
            title: "Add Progress Indicator",
            description: "Questionnaires with progress indicators show 24% higher completion rates. Add a progress bar to help prospects understand how much is left."
          },
          {
            title: "Reorder Questions",
            description: "Place simpler, less personal questions at the beginning to build momentum before asking more complex financial questions."
          }
        ];
      default:
        return [];
    }
  };

  const suggestions = getSuggestions();
  
  const getActionButtonIcon = () => {
    switch (type) {
      case "questions":
      case "sections":
        return Plus;
      case "improvements":
        return Check;
      default:
        return Plus;
    }
  };
  
  const getActionButtonText = () => {
    switch (type) {
      case "questions":
      case "sections":
        return "Add";
      case "improvements":
        return "Apply";
      default:
        return "Add";
    }
  };

  const handleAction = (title: string) => {
    toast.success(`${title} ${type === "improvements" ? "applied" : "added"}`);
  };
  
  const handleAddAll = () => {
    toast.success(`All ${type} ${type === "improvements" ? "applied" : "added"}`);
    onClose();
  };

  const getDialogTitle = () => {
    switch (type) {
      case "questions":
        return "AI Suggested Questions";
      case "sections":
        return "AI Suggested Sections";
      case "improvements":
        return "AI Suggested Improvements";
      default:
        return "AI Suggestions";
    }
  };

  const getIntroText = () => {
    switch (type) {
      case "questions":
      case "sections":
        return "Based on your prospect profile and meeting recordings, here are suggested " + type + " to add:";
      case "improvements":
        return "Based on completion rates and prospect feedback, here are suggested improvements:";
      default:
        return "Here are AI-generated suggestions:";
    }
  };

  const ActionIcon = getActionButtonIcon();

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription>
            {getIntroText()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {suggestion.description}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                >
                  {type === "improvements" ? (
                    <Info className="h-3.5 w-3.5" />
                  ) : (
                    <Edit className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button 
                  size="sm" 
                  className="h-8"
                  onClick={() => handleAction(suggestion.title)}
                >
                  <ActionIcon className="h-3.5 w-3.5 mr-1" />
                  {getActionButtonText()}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t mt-2">
          <Button variant="outline" onClick={() => toast.success("Generating more suggestions...")}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate More
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddAll}>
              <ActionIcon className="h-4 w-4 mr-2" />
              {getActionButtonText()} All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
