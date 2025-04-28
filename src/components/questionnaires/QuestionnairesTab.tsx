
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, FileText, LayoutGrid, Filter } from "lucide-react";
import { QuestionnaireCard } from "./QuestionnaireCard";
import { QuestionnaireBuilder } from "./QuestionnaireBuilder";
import { QuestionnairePreview } from "./QuestionnairePreview";
import { AiSuggestionsDialog } from "./AiSuggestionsDialog";

export interface Prospect {
  id: string;
  name: string;
  email: string;
}

export interface Question {
  id: string;
  text: string;
  type: "text" | "multiple_choice" | "checkbox" | "date";
  options?: string[];
  required: boolean;
  section?: string;
}

export interface Questionnaire {
  id: string;
  name: string;
  type: string;
  description?: string;
  questions: Question[];
  completionPercentage: number;
  status: "draft" | "active" | "completed" | "archived";
  prospect?: Prospect;
  createdAt?: Date;
  updatedAt?: Date;
}

export const QuestionnairesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isAiSuggestionsOpen, setIsAiSuggestionsOpen] = useState<boolean>(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);

  // Sample questionnaire data
  const questionnaires: Questionnaire[] = [
    {
      id: "q1",
      name: "Retirement Planning Questionnaire",
      type: "Retirement Planning",
      description: "Comprehensive questionnaire to assess retirement readiness and goals",
      questions: [
        {
          id: "q1-1",
          text: "At what age do you plan to retire?",
          type: "text",
          required: true
        },
        {
          id: "q1-2",
          text: "What are your primary concerns about retirement?",
          type: "multiple_choice",
          options: ["Running out of money", "Healthcare costs", "Market volatility", "Inflation", "Other"],
          required: true
        },
        {
          id: "q1-3",
          text: "Do you plan to work part-time during retirement?",
          type: "checkbox",
          options: ["Yes", "No", "Unsure"],
          required: false
        }
      ],
      completionPercentage: 0,
      status: "active"
    },
    {
      id: "q2",
      name: "Risk Assessment",
      type: "Risk Assessment",
      description: "Evaluate risk tolerance and investment preferences",
      questions: [
        {
          id: "q2-1",
          text: "How would you rate your overall risk tolerance on a scale of 1-10?",
          type: "text",
          required: true
        },
        {
          id: "q2-2",
          text: "How would you react if your portfolio lost 20% in one month?",
          type: "multiple_choice",
          options: [
            "Sell everything immediately",
            "Sell some investments",
            "Do nothing",
            "Buy more at lower prices"
          ],
          required: true
        }
      ],
      completionPercentage: 0,
      status: "draft"
    },
    {
      id: "q3",
      name: "Estate Planning Needs",
      type: "Estate Planning",
      description: "Assess estate planning situation and needs",
      questions: [
        {
          id: "q3-1",
          text: "Do you have a will?",
          type: "checkbox",
          options: ["Yes", "No"],
          required: true
        },
        {
          id: "q3-2",
          text: "Do you have a trust?",
          type: "checkbox",
          options: ["Yes", "No"],
          required: true
        }
      ],
      completionPercentage: 100,
      status: "completed",
      prospect: {
        id: "p1",
        name: "John Smith",
        email: "john.smith@example.com"
      }
    },
    {
      id: "q4",
      name: "Investment Preferences",
      type: "Investment Preferences",
      description: "Understand investment goals and preferences",
      questions: [
        {
          id: "q4-1",
          text: "What are your primary investment goals?",
          type: "multiple_choice",
          options: [
            "Growth",
            "Income",
            "Preservation of capital",
            "Tax efficiency"
          ],
          required: true
        }
      ],
      completionPercentage: 50,
      status: "active",
      prospect: {
        id: "p2",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com"
      }
    }
  ];

  const filteredQuestionnaires = questionnaires.filter(questionnaire => {
    if (activeTab === "all") return true;
    if (activeTab === "drafts") return questionnaire.status === "draft";
    if (activeTab === "active") return questionnaire.status === "active";
    if (activeTab === "completed") return questionnaire.status === "completed";
    return false;
  });

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
    // In a real app, we would save the questionnaire to the backend here
    console.log("Saved questionnaire:", questionnaire);
  };

  const handleOpenAiSuggestions = () => {
    setIsAiSuggestionsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Questionnaires</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleOpenAiSuggestions}
          >
            <FileText className="h-4 w-4 mr-2" />
            AI Recommendations
          </Button>
          <Button onClick={handleCreateQuestionnaire}>
            <Plus className="h-4 w-4 mr-2" />
            Create Questionnaire
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuestionnaires.map((questionnaire) => (
              <QuestionnaireCard
                key={questionnaire.id}
                questionnaire={questionnaire}
                onEdit={() => handleEditQuestionnaire(questionnaire)}
                onPreview={() => handlePreviewQuestionnaire(questionnaire)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuestionnaires.map((questionnaire) => (
              <QuestionnaireCard
                key={questionnaire.id}
                questionnaire={questionnaire}
                onEdit={() => handleEditQuestionnaire(questionnaire)}
                onPreview={() => handlePreviewQuestionnaire(questionnaire)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuestionnaires.map((questionnaire) => (
              <QuestionnaireCard
                key={questionnaire.id}
                questionnaire={questionnaire}
                onEdit={() => handleEditQuestionnaire(questionnaire)}
                onPreview={() => handlePreviewQuestionnaire(questionnaire)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuestionnaires.map((questionnaire) => (
              <QuestionnaireCard
                key={questionnaire.id}
                questionnaire={questionnaire}
                onEdit={() => handleEditQuestionnaire(questionnaire)}
                onPreview={() => handlePreviewQuestionnaire(questionnaire)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
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
      
      <AiSuggestionsDialog
        open={isAiSuggestionsOpen}
        onOpenChange={setIsAiSuggestionsOpen}
      />
    </div>
  );
};
