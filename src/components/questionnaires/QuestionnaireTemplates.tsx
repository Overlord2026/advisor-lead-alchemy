
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { type Questionnaire } from "./types";

interface QuestionnaireTemplatesProps {
  templates: Questionnaire[];
  onEdit: (questionnaire: Questionnaire) => void;
  onSend: (questionnaire: Questionnaire) => void;
}

export const QuestionnaireTemplates: React.FC<QuestionnaireTemplatesProps> = ({
  templates,
  onEdit,
  onSend
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Questionnaire Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <h4 className="text-center font-medium mb-2">{template.name}</h4>
            <p className="text-sm text-gray-500 text-center mb-4">{template.description}</p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-1">•</span>
                <span>{template.questions.length} questions</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-1">•</span>
                <span>{template.duration}</span>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" className="w-1/2" onClick={() => onEdit(template)}>
                Edit
              </Button>
              <Button variant="secondary" size="sm" className="w-1/2" onClick={() => onSend(template)}>
                Send
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
