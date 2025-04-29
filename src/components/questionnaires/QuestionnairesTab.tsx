
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, FileText, LayoutGrid, Filter, Search, Eye, Edit, Send, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge, customBadgeVariants } from "@/shared/ui";
import { QuestionnaireBuilder } from "./QuestionnaireBuilder";
import { QuestionnairePreview } from "./QuestionnairePreview";
import { AiSuggestionsDialog } from "./AiSuggestionsDialog";

export interface Prospect {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initial?: string;
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
  status: "draft" | "active" | "completed" | "archived" | "pending" | "in-progress";
  prospect?: Prospect;
  createdAt?: Date;
  updatedAt?: Date;
  sentDate?: string;
  dueDate?: string;
  duration?: string;
}

export const QuestionnairesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
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

  // Helper function to get the status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return customBadgeVariants.success;
      case "in-progress":
        return customBadgeVariants.warning;
      case "pending":
        return customBadgeVariants.info;
      default:
        return "";
    }
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Questionnaire Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templateQuestionnaires.map((template) => (
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
                <Button variant="outline" size="sm" className="w-1/2">
                  Edit
                </Button>
                <Button variant="secondary" size="sm" className="w-1/2">
                  Send
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sent Questionnaires */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sent Questionnaires</h3>
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input placeholder="Search questionnaires..." className="pl-10" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prospect</TableHead>
                <TableHead>Questionnaire Type</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sentQuestionnaires.map((questionnaire) => (
                <TableRow key={questionnaire.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {questionnaire.prospect?.initial}
                      </div>
                      <div>
                        <div className="font-medium">{questionnaire.prospect?.name}</div>
                        <div className="text-xs text-muted-foreground">{questionnaire.prospect?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{questionnaire.type}</TableCell>
                  <TableCell>{questionnaire.sentDate}</TableCell>
                  <TableCell>
                    <Badge 
                      className={getStatusBadgeVariant(questionnaire.status)}
                      variant="outline"
                    >
                      {questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {questionnaire.completionPercentage > 0 ? (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 max-w-[150px]">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${questionnaire.completionPercentage}%` }}
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not started</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="py-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      
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
