
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Paperclip, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TemplateCard from "./TemplateCard";
import TemplateEditor from "./TemplateEditor";

// Sample template categories
const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates' },
  { id: 'initial-contact', name: 'Initial Contact' },
  { id: 'meeting-followup', name: 'Meeting Follow-up' },
  { id: 'questionnaires', name: 'Questionnaires' },
  { id: 'proposals', name: 'Proposals' },
  { id: 'onboarding', name: 'Onboarding' }
];

// Sample templates data
const TEMPLATES = [
  { 
    id: 'initial-meeting-followup', 
    name: 'Initial Meeting Follow-up',
    category: 'meeting-followup',
    description: 'Thank prospects after your first meeting',
    usageCount: 32,
    lastUsed: '3 days ago'
  },
  { 
    id: 'questionnaire-request', 
    name: 'Questionnaire Request',
    category: 'questionnaires',
    description: 'Ask prospects to complete a questionnaire',
    usageCount: 45,
    lastUsed: '1 day ago'
  },
  { 
    id: 'meeting-confirmation', 
    name: 'Meeting Confirmation',
    category: 'initial-contact',
    description: 'Confirm scheduled meetings with prospects',
    usageCount: 28,
    lastUsed: '2 days ago'
  },
  { 
    id: 'proposal-introduction', 
    name: 'Proposal Introduction',
    category: 'proposals',
    description: 'Introduce your financial proposal to prospects',
    usageCount: 17,
    lastUsed: '5 days ago'
  },
  { 
    id: 'welcome-onboarding', 
    name: 'Welcome & Onboarding',
    category: 'onboarding',
    description: 'Welcome new clients to your practice',
    usageCount: 12,
    lastUsed: '1 week ago'
  },
  { 
    id: 'estate-planning-followup', 
    name: 'Estate Planning Follow-up',
    category: 'meeting-followup',
    description: 'Follow up on estate planning discussions',
    usageCount: 8,
    lastUsed: '2 weeks ago'
  }
];

const EmailTemplatesTab = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);

  const filteredTemplates = selectedCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(template => template.category === selectedCategory);

  const handleOpenTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    setCurrentTemplate(template);
    setIsEditorOpen(true);
    toast({
      title: "Template opened",
      description: `Opening "${template?.name}" template for editing`
    });
  };

  const handleCreateTemplate = () => {
    setCurrentTemplate(null);
    setIsEditorOpen(true);
    toast({
      title: "New template",
      description: "Create a new email template"
    });
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  const handleSaveTemplate = (templateData: any) => {
    toast({
      title: "Template saved",
      description: `"${templateData.name}" has been saved successfully`,
    });
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      {!isEditorOpen ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Email Templates</h2>
              <p className="text-muted-foreground">
                Create and manage personalized email templates for your client communications
              </p>
            </div>
            <Button onClick={handleCreateTemplate} className="md:w-auto w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Template
            </Button>
          </div>

          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-6">
              {TEMPLATE_CATEGORIES.map(category => (
                <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map(template => (
                  <TemplateCard 
                    key={template.id}
                    template={template}
                    onClick={() => handleOpenTemplate(template.id)}
                  />
                ))}
                <Card className="border-dashed cursor-pointer" onClick={handleCreateTemplate}>
                  <CardContent className="flex flex-col items-center justify-center h-full py-8">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-center">Create New Template</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Design a new email template for your outreach
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <TemplateEditor 
          template={currentTemplate} 
          onClose={handleCloseEditor} 
          onSave={handleSaveTemplate} 
        />
      )}
    </div>
  );
};

export default EmailTemplatesTab;
