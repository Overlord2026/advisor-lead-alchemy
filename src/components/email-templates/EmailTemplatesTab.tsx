
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Star, MoreVertical, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TemplateEditor from "./TemplateEditor";
import TemplateCard from "./TemplateCard";

// Sample template categories
const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates', icon: <Star className="h-5 w-5" />, count: 24 },
  { id: 'initial-contact', name: 'Initial Contact', icon: <div className="text-blue-600">🤝</div>, count: 5 },
  { id: 'questionnaires', name: 'Questionnaires', icon: <div className="text-blue-600">📝</div>, count: 4 },
  { id: 'meeting-followup', name: 'Meeting Follow-up', icon: <div className="text-blue-600">💬</div>, count: 6 },
  { id: 'proposals', name: 'Proposals', icon: <div className="text-blue-600">📄</div>, count: 5 },
  { id: 'onboarding', name: 'Onboarding', icon: <div className="text-blue-600">👋</div>, count: 4 }
];

// Sample templates data
const TEMPLATES = [
  { 
    id: 'initial-meeting-followup', 
    name: 'Initial Meeting Follow-up',
    category: 'meeting-followup',
    description: 'Thank you for meeting and summary of discussion',
    usageCount: 42,
    lastUsed: '3 days ago',
    categoryLabel: 'Meeting Follow-up',
    isAIEnhanced: true
  },
  { 
    id: 'questionnaire-request', 
    name: 'Questionnaire Request',
    category: 'questionnaires',
    description: 'Request to complete intake questionnaire',
    usageCount: 38,
    lastUsed: '1 day ago',
    categoryLabel: 'Questionnaires',
    isAIEnhanced: true
  },
  { 
    id: 'meeting-confirmation', 
    name: 'Meeting Confirmation',
    category: 'initial-contact',
    description: 'Confirm upcoming meeting details',
    usageCount: 56,
    lastUsed: '2 days ago',
    categoryLabel: 'Initial Contact',
    isAIEnhanced: true
  },
  { 
    id: 'proposal-introduction', 
    name: 'Proposal Introduction',
    category: 'proposals',
    description: 'Introduction to financial planning proposal',
    usageCount: 27,
    lastUsed: '5 days ago',
    categoryLabel: 'Proposals',
    isAIEnhanced: true
  },
  { 
    id: 'welcome-onboarding', 
    name: 'Welcome & Onboarding',
    category: 'onboarding',
    description: 'Welcome new client and onboarding steps',
    usageCount: 31,
    lastUsed: '1 week ago',
    categoryLabel: 'Onboarding',
    isAIEnhanced: true
  },
  { 
    id: 'estate-planning-followup', 
    name: 'Estate Planning Follow-up',
    category: 'meeting-followup',
    description: 'Follow-up after estate planning discussion',
    usageCount: 19,
    lastUsed: '2 weeks ago',
    categoryLabel: 'Meeting Follow-up',
    isAIEnhanced: true
  }
];

const EmailTemplatesTab = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNewTemplateCard, setIsNewTemplateCard] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    setIsNewTemplateCard(false);
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

  const handleNewTemplateCardToggle = () => {
    setIsNewTemplateCard(!isNewTemplateCard);
  };

  return (
    <div className="space-y-6">
      {!isEditorOpen ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Email Templates</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast({ title: "Feature coming soon" })}>
                <Search className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" className="relative">
                Sort by
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={handleCreateTemplate}>
                <Plus className="mr-2 h-4 w-4" /> Create Template
              </Button>
            </div>
          </div>

          {/* Template Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {TEMPLATE_CATEGORIES.map((category) => (
              <Card 
                key={category.id} 
                className={`cursor-pointer hover:border-blue-300 transition-colors ${
                  selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="mb-2 mt-2 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {category.icon}
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.count} templates</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Templates List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Email Templates</h3>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  onClick={() => handleOpenTemplate(template.id)}
                  onStar={() => toast({ title: "Template starred" })}
                  onOptions={() => toast({ title: "Options menu" })}
                />
              ))}
              
              {isNewTemplateCard ? (
                <Card className="overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-4">
                    <h3 className="font-medium text-lg">Create New Template</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Start from scratch or use AI to generate
                    </p>
                    <Button onClick={handleCreateTemplate} className="mt-2">
                      Create Template
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed cursor-pointer min-h-[240px]" onClick={handleNewTemplateCardToggle}>
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
              )}
            </div>
          </div>
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
