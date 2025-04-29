
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X, Smartphone, Monitor, Send } from "lucide-react";
import { type Questionnaire } from "./types";

interface QuestionnairePreviewProps {
  questionnaire: Questionnaire;
  onClose: () => void;
}

export const QuestionnairePreview: React.FC<QuestionnairePreviewProps> = ({
  questionnaire,
  onClose,
}) => {
  const [activeView, setActiveView] = useState<string>("desktop");
  
  const renderQuestionPreview = (question: any, index: number) => {
    switch (question.type) {
      case "text":
        return (
          <div className="mb-4 p-4 border rounded-lg">
            <label className="block mb-2 text-sm font-medium">
              {index + 1}. {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-400">
              [Text input field]
            </div>
          </div>
        );
      
      case "multiple_choice":
        return (
          <div className="mb-4 p-4 border rounded-lg">
            <label className="block mb-2 text-sm font-medium">
              {index + 1}. {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {question.options?.map((option: string, i: number) => (
              <div key={i} className="flex items-center mb-2">
                <div className="w-4 h-4 border border-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case "checkbox":
        return (
          <div className="mb-4 p-4 border rounded-lg">
            <label className="block mb-2 text-sm font-medium">
              {index + 1}. {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {question.options?.map((option: string, i: number) => (
              <div key={i} className="flex items-center mb-2">
                <div className="w-4 h-4 border border-gray-300 mr-2"></div>
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="mb-4 p-4 border rounded-lg">
            <label className="block mb-2 text-sm font-medium">
              {index + 1}. {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-400">
              [Input field]
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle>Preview: {questionnaire.name}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            {questionnaire.description || "No description provided"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2 border-b">
          <Tabs defaultValue={activeView} value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid grid-cols-2 w-[200px]">
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-grow overflow-auto p-6">
          <TabsContent value="desktop" className="mt-0">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="bg-gray-50 border-b p-4">
                <h2 className="text-xl font-semibold">{questionnaire.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {questionnaire.description}
                </p>
                {questionnaire.prospect && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">For:</span> {questionnaire.prospect.name}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {questionnaire.questions.map((question, index) => (
                  renderQuestionPreview(question, index)
                ))}
                
                <div className="mt-6">
                  <Button size="sm" disabled>Submit</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-0">
            <div className="w-[375px] mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="bg-gray-50 border-b p-4">
                <h2 className="text-lg font-semibold">{questionnaire.name}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {questionnaire.description}
                </p>
                {questionnaire.prospect && (
                  <div className="mt-2 text-xs">
                    <span className="font-medium">For:</span> {questionnaire.prospect.name}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {questionnaire.questions.map((question, index) => (
                  renderQuestionPreview(question, index)
                ))}
                
                <div className="mt-6">
                  <Button size="sm" disabled>Submit</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
        
        <div className="border-t p-4 flex justify-between items-center bg-muted/30">
          <div>
            <span className="text-sm text-muted-foreground">Preview mode</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send to Client
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
