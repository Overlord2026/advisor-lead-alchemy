
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Calendar, ArrowRight, FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { QuestionnaireCard } from "./QuestionnaireCard";
import { QuestionnaireBuilder } from "./QuestionnaireBuilder";
import { QuestionnairePreview } from "./QuestionnairePreview";
import { AiSuggestionsDialog } from "./AiSuggestionsDialog";

// Define questionnaire types
export interface Questionnaire {
  id: string;
  name: string;
  type: string;
  description: string;
  questions: Question[];
  sentDate?: string;
  dueDate?: string;
  prospect?: {
    id: string;
    name: string;
    avatar?: string;
  };
  completionPercentage: number;
  status: "draft" | "sent" | "completed" | "expired";
  responses?: QuestionnaireResponse[];
}

export interface Question {
  id: string;
  text: string;
  type: "text" | "multiple_choice" | "checkbox" | "dropdown" | "rating" | "date";
  options?: string[];
  required: boolean;
  section?: string;
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | string[];
  timestamp: string;
}

// Mock data for questionnaires
const mockQuestionnaires: Questionnaire[] = [
  {
    id: "q1",
    name: "Comprehensive Financial Planning",
    type: "Intake",
    description: "Initial financial assessment for new clients",
    questions: [
      {
        id: "q1_1",
        text: "What are your primary financial goals?",
        type: "text",
        required: true,
        section: "Goals"
      },
      {
        id: "q1_2",
        text: "How would you describe your risk tolerance?",
        type: "multiple_choice",
        options: ["Conservative", "Moderate", "Aggressive"],
        required: true,
        section: "Risk Assessment"
      }
    ],
    sentDate: "2025-04-21",
    dueDate: "2025-05-05",
    prospect: {
      id: "p1",
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    completionPercentage: 75,
    status: "sent"
  },
  {
    id: "q2",
    name: "Risk Tolerance Assessment",
    type: "Risk Assessment",
    description: "Detailed assessment of client's investment risk tolerance",
    questions: [
      {
        id: "q2_1",
        text: "If your portfolio lost 20% of its value in one month, what would you do?",
        type: "multiple_choice",
        options: ["Sell everything", "Sell some investments", "Do nothing", "Buy more"],
        required: true,
        section: "Risk Response"
      }
    ],
    sentDate: "2025-04-15",
    dueDate: "2025-04-29",
    prospect: {
      id: "p2",
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    completionPercentage: 30,
    status: "sent"
  },
  {
    id: "q3",
    name: "Estate Planning Checklist",
    type: "Estate Planning",
    description: "Comprehensive estate planning assessment",
    questions: [
      {
        id: "q3_1",
        text: "Do you have an up-to-date will?",
        type: "multiple_choice",
        options: ["Yes", "No", "Unsure"],
        required: true
      }
    ],
    sentDate: "2025-04-10",
    dueDate: "2025-04-24",
    prospect: {
      id: "p3",
      name: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    completionPercentage: 100,
    status: "completed"
  }
];

export const QuestionnairesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showBuilder, setShowBuilder] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState<boolean>(false);
  const [suggestionType, setSuggestionType] = useState<"questions" | "sections" | "improvements">("questions");

  const { data: questionnaires, isLoading } = useQuery({
    queryKey: ["questionnaires"],
    queryFn: async () => {
      // In a real app, fetch from API
      return mockQuestionnaires;
    },
  });

  const filteredQuestionnaires = questionnaires?.filter(q => {
    if (activeTab !== "all" && q.status !== activeTab) return false;
    if (searchTerm && !q.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleCreateQuestionnaire = () => {
    setSelectedQuestionnaire(null);
    setShowBuilder(true);
  };

  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setShowBuilder(true);
  };

  const handlePreviewQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setShowPreview(true);
  };

  const handleSendQuestionnaire = (id: string) => {
    toast.success("Questionnaire sent successfully");
  };

  const handleShowAiSuggestions = (type: "questions" | "sections" | "improvements") => {
    setSuggestionType(type);
    setShowAiSuggestions(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Client Questionnaires</h1>
        <p className="text-muted-foreground">
          Create, send, and analyze client questionnaires with intelligent insights.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questionnaires..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => handleShowAiSuggestions("questions")}
            variant="outline"
          >
            AI Suggestions
          </Button>
          
          <Button onClick={handleCreateQuestionnaire}>
            <Plus className="mr-1 h-4 w-4" />
            Create Questionnaire
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-24 bg-muted rounded-md"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredQuestionnaires?.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <FileCheck className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-center">No questionnaires found</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Create your first questionnaire to get started
                </p>
                <Button onClick={handleCreateQuestionnaire} className="mt-4">
                  Create Questionnaire
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuestionnaires?.map((questionnaire) => (
                <QuestionnaireCard
                  key={questionnaire.id}
                  questionnaire={questionnaire}
                  onPreview={() => handlePreviewQuestionnaire(questionnaire)}
                  onEdit={() => handleEditQuestionnaire(questionnaire)}
                  onSend={() => handleSendQuestionnaire(questionnaire.id)}
                />
              ))}

              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-[280px]">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-center">Create Questionnaire</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Design customized questionnaires for your clients
                </p>
                <Button variant="outline" size="sm" className="mt-4" onClick={handleCreateQuestionnaire}>
                  Create New
                </Button>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {showBuilder && (
        <QuestionnaireBuilder 
          questionnaire={selectedQuestionnaire} 
          onClose={() => setShowBuilder(false)} 
          onSave={(data) => {
            toast.success("Questionnaire saved successfully");
            setShowBuilder(false);
          }}
        />
      )}

      {showPreview && selectedQuestionnaire && (
        <QuestionnairePreview 
          questionnaire={selectedQuestionnaire} 
          onClose={() => setShowPreview(false)} 
        />
      )}

      {showAiSuggestions && (
        <AiSuggestionsDialog 
          type={suggestionType} 
          onClose={() => setShowAiSuggestions(false)} 
        />
      )}
    </div>
  );
};
