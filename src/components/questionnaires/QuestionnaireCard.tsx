
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Send, ArrowRight, Check } from "lucide-react";
import { type Questionnaire } from "./QuestionnairesTab";

interface QuestionnaireCardProps {
  questionnaire: Questionnaire;
  onPreview: () => void;
  onEdit: () => void;
  onSend: () => void;
}

export const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
  questionnaire,
  onPreview,
  onEdit,
  onSend,
}) => {
  const { id, name, type, description, sentDate, dueDate, prospect, completionPercentage, status } = questionnaire;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getStatusBadgeClass = () => {
    switch (status) {
      case "draft":
        return "bg-muted text-muted-foreground";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "draft":
        return "Draft";
      case "sent":
        return "Sent";
      case "completed":
        return "Completed";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {type}
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass()}`}
              >
                {getStatusText()}
              </span>
            </div>
          </div>
          {prospect && (
            <div className="flex flex-col items-end">
              {prospect.avatar ? (
                <img
                  src={prospect.avatar}
                  alt={prospect.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-background"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {prospect.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
              )}
              <span className="text-xs text-muted-foreground mt-1">{prospect.name}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">
          {description || "No description provided"}
        </p>

        {(sentDate || dueDate) && (
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
            {sentDate && (
              <div>
                <span className="block font-medium">Sent</span>
                <span>{formatDate(sentDate)}</span>
              </div>
            )}
            {dueDate && (
              <div>
                <span className="block font-medium">Due</span>
                <span>{formatDate(dueDate)}</span>
              </div>
            )}
          </div>
        )}

        {completionPercentage !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onPreview}>
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
        
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        
        {status === "draft" && (
          <Button size="sm" onClick={onSend}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        )}
        
        {status === "completed" && (
          <Button size="sm" variant="outline" className="ml-auto">
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
