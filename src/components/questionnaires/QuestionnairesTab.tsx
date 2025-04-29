
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, LayoutGrid, Send } from "lucide-react";
import { QuestionnaireTemplates } from "./QuestionnaireTemplates";
import { SentQuestionnaires } from "./SentQuestionnaires";
import { QuestionnaireBuilder } from "./QuestionnaireBuilder";
import { QuestionnairePreview } from "./QuestionnairePreview";
import { AiSuggestionsDialog } from "./AiSuggestionsDialog";
import { type Questionnaire } from "./types";

export const QuestionnairesTab: React.FC = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isAiSuggestionsOpen, setIsAiSuggestionsOpen] = useState<boolean>(false);
  const [aiSuggestionType, setAiSuggestionType] = useState<"questions" | "sections" | "improvements">("questions");
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);

  const templateQuestionnaires: Questionnaire[] = [
    {
      id: "q1",
      name: "Boutique Family Office Intake",
      type: "Boutique Family Office Intake",
      description: "Comprehensive financial information for new prospects",
      questions: Array(42).fill({
        id: "q1-1",
        text: "Sample question",
        type: "text",
        required: true
      }),
      completionPercentage: 0,
      status: "draft",
      duration: "30 min"
    },
    {
      id: "q2",
      name: "Retirement Planning",
      type: "Retirement Planning",
      description: "Focused on retirement goals and income planning",
      questions: Array(38).fill({
        id: "q2-1",
        text: "Sample question",
        type: "text",
        required: true
      }),
      completionPercentage: 0,
      status: "draft",
      duration: "20 min"
    },
    {
      id: "q3",
      name: "Estate Planning",
      type: "Estate Planning",
      description: "Legacy planning and wealth transfer strategies",
      questions: Array(25).fill({
        id: "q3-1",
        text: "Sample question",
        type: "text",
        required: true
      }),
      completionPercentage: 0,
      status: "draft",
      duration: "25 min"
    },
    {
      id: "q4",
      name: "Risk Assessment",
      type: "Risk Assessment",
      description: "Investment risk tolerance and preferences",
      questions: Array(15).fill({
        id: "q4-1",
        text: "Sample question",
        type: "text",
        required: true
      }),
      completionPercentage: 0,
      status: "draft",
      duration: "10 min"
    }
  ];

  const sentQuestionnaires: Questionnaire[] = [
    {
      id: "s1",
      name: "Boutique Family Office Intake",
      type: "Boutique Family Office Intake",
      questions: [],
      completionPercentage: 0,
      status: "pending",
      sentDate: "Apr 22, 2023",
      prospect: {
        id: "p1",
        name: "John Doe",
        email: "john.doe@example.com",
        initial: "JD"
      }
    },
    {
      id: "s2",
      name: "Retirement Planning",
      type: "Retirement Planning",
      questions: [],
      completionPercentage: 45,
      status: "in-progress",
      sentDate: "Apr 21, 2023",
      prospect: {
        id: "p2",
        name: "Mary Smith",
        email: "mary.smith@example.com",
        initial: "MS"
      }
    },
    {
      id: "s3",
      name: "Estate Planning",
      type: "Estate Planning",
      questions: [],
      completionPercentage: 100,
      status: "completed",
      sentDate: "Apr 20, 2023",
      prospect: {
        id: "p3",
        name: "Robert Johnson",
        email: "robert.j@example.com",
        initial: "RJ"
      }
    },
    {
      id: "s4",
      name: "Risk Assessment",
      type: "Risk Assessment",
      questions: [],
      completionPercentage: 100,
      status: "completed",
      sentDate: "Apr 19, 2023",
      prospect: {
        id: "p4",
        name: "Alice Williams",
        email: "alice.w@example.com",
        initial: "AW"
      }
    }
  ];

  const handleCreateQuestionnaire = () => {
    setSelectedQuestionnaire(null);
    setIsBuilderOpen(true);
  };

  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setIsBuilderOpen(true);
  };

  const handlePreviewQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setIsPreviewOpen(true);
  };

  const handleSaveQuestionnaire = (questionnaire: Questionnaire) => {
    setIsBuilderOpen(false);
    console.log("Saved questionnaire:", questionnaire);
  };

  const handleOpenAiSuggestions = (type: "questions" | "sections" | "improvements" = "questions") => {
    setAiSuggestionType(type);
    setIsAiSuggestionsOpen(true);
  };

  const handleSendQuestionnaire = (questionnaire: Questionnaire) => {
    console.log("Sending questionnaire:", questionnaire);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Questionnaires</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => handleOpenAiSuggestions("questions")}
          >
            <FileText className="h-4 w-4 mr-2" />
            AI Recommendations
          </Button>
          <Button onClick={handleCreateQuestionnaire}>
            <Plus className="h-4 w-4 mr-2" />
            Create Questionnaire
          </Button>
          <Button variant="secondary">
            <Send className="h-4 w-4 mr-2" />
            Send Questionnaire
          </Button>
        </div>
      </div>

      {/* Questionnaire Templates */}
      <QuestionnaireTemplates 
        templates={templateQuestionnaires}
        onEdit={handleEditQuestionnaire}
        onSend={handleSendQuestionnaire}
      />

      {/* Sent Questionnaires */}
      <SentQuestionnaires 
        questionnaires={sentQuestionnaires}
        onPreview={handlePreviewQuestionnaire}
        onEdit={handleEditQuestionnaire}
      />
      
      {isBuilderOpen && (
        <QuestionnaireBuilder
          questionnaire={selectedQuestionnaire}
          onClose={() => setIsBuilderOpen(false)}
          onSave={handleSaveQuestionnaire}
        />
      )}
      
      {isPreviewOpen && selectedQuestionnaire && (
        <QuestionnairePreview
          questionnaire={selectedQuestionnaire}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
      
      {isAiSuggestionsOpen && (
        <AiSuggestionsDialog
          type={aiSuggestionType}
          onClose={() => setIsAiSuggestionsOpen(false)}
        />
      )}
    </div>
  );
};
