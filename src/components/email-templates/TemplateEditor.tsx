
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Paperclip, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateVariable {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface VariableCategoryProps {
  title: string;
  variables: TemplateVariable[];
  onSelectVariable: (variable: TemplateVariable) => void;
}

const VARIABLE_CATEGORIES = [
  {
    title: 'Prospect',
    variables: [
      { id: '1', name: 'First Name', code: '{{prospect.first_name}}', description: 'Prospect\'s first name' },
      { id: '2', name: 'Last Name', code: '{{prospect.last_name}}', description: 'Prospect\'s last name' },
      { id: '3', name: 'Full Name', code: '{{prospect.full_name}}', description: 'Prospect\'s full name' },
      { id: '4', name: 'Email', code: '{{prospect.email}}', description: 'Prospect\'s email address' }
    ]
  },
  {
    title: 'Advisor',
    variables: [
      { id: '5', name: 'Name', code: '{{advisor.name}}', description: 'Advisor\'s full name' },
      { id: '6', name: 'Title', code: '{{advisor.title}}', description: 'Advisor\'s title' },
      { id: '7', name: 'Email', code: '{{advisor.email}}', description: 'Advisor\'s email' },
      { id: '8', name: 'Phone', code: '{{advisor.phone}}', description: 'Advisor\'s phone number' }
    ]
  },
  {
    title: 'Company',
    variables: [
      { id: '9', name: 'Name', code: '{{company.name}}', description: 'Company name' },
      { id: '10', name: 'Address', code: '{{company.address}}', description: 'Company address' },
      { id: '11', name: 'Website', code: '{{company.website}}', description: 'Company website' }
    ]
  }
];

const CATEGORIES = [
  'Initial Contact',
  'Meeting Follow-up',
  'Questionnaires',
  'Proposals',
  'Onboarding',
  'Custom'
];

const VariableCategory: React.FC<VariableCategoryProps> = ({ title, variables, onSelectVariable }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">{title}</h3>
      <div className="space-y-1">
        {variables.map(variable => (
          <div 
            key={variable.id} 
            className="flex justify-between items-center p-2 text-sm hover:bg-muted rounded-md cursor-pointer"
            onClick={() => onSelectVariable(variable)}
          >
            <span>{variable.name}</span>
            <code className="bg-muted-foreground/20 px-1 py-0.5 rounded text-xs">{variable.code}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  icon: React.ReactNode;
  tooltip?: string;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, tooltip, onClick }) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8 w-8 p-0" 
      onClick={onClick}
      title={tooltip}
    >
      {icon}
    </Button>
  );
};

interface TemplateEditorProps {
  template?: any; // The template to edit, null for new template
  onClose: () => void;
  onSave: (templateData: any) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onClose, onSave }) => {
  const { toast } = useToast();
  const [templateData, setTemplateData] = useState({
    name: template ? template.name : '',
    category: template ? template.category : 'Initial Contact',
    subject: template ? template.subject || '' : '',
    content: template ? template.content || '<p>Dear {{prospect.first_name}},</p><p></p><p>Best regards,<br>{{advisor.name}}<br>{{advisor.title}}<br>{{company.name}}</p>' : 
      '<p>Dear {{prospect.first_name}},</p><p></p><p>Best regards,<br>{{advisor.name}}<br>{{advisor.title}}<br>{{company.name}}</p>'
  });
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedVariablesTab, setSelectedVariablesTab] = useState('Prospect');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplateData({
      ...templateData,
      content: e.target.value
    });
  };

  const handleInsertVariable = (variable: TemplateVariable) => {
    toast({
      title: "Variable inserted",
      description: `${variable.code} has been inserted into the template`
    });
  };

  const handleSave = () => {
    if (!templateData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive"
      });
      return;
    }
    
    onSave(templateData);
  };

  const handleApplyFormatting = (format: string) => {
    toast({
      title: "Formatting applied",
      description: `Applied ${format} formatting to selection`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <h2 className="text-2xl font-bold">{template ? 'Edit Template' : 'Create Template'}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input 
                      id="templateName" 
                      value={templateData.name} 
                      onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateCategory">Category</Label>
                    <Select 
                      value={templateData.category} 
                      onValueChange={(value) => setTemplateData({...templateData, category: value})}
                    >
                      <SelectTrigger id="templateCategory">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Email Subject</Label>
                  <Input 
                    id="emailSubject" 
                    value={templateData.subject} 
                    onChange={(e) => setTemplateData({...templateData, subject: e.target.value})}
                    placeholder="Enter email subject"
                  />
                </div>

                <div className="space-y-2">
                  <div className="border rounded-md">
                    <div className="flex items-center gap-1 border-b p-2">
                      <ToolbarButton 
                        icon={<Bold className="h-4 w-4" />} 
                        tooltip="Bold" 
                        onClick={() => handleApplyFormatting("Bold")} 
                      />
                      <ToolbarButton 
                        icon={<Italic className="h-4 w-4" />} 
                        tooltip="Italic" 
                        onClick={() => handleApplyFormatting("Italic")} 
                      />
                      <ToolbarButton 
                        icon={<Underline className="h-4 w-4" />} 
                        tooltip="Underline" 
                        onClick={() => handleApplyFormatting("Underline")} 
                      />
                      <div className="border-r h-4 mx-2" />
                      <ToolbarButton 
                        icon={<List className="h-4 w-4" />} 
                        tooltip="Bullet List" 
                        onClick={() => handleApplyFormatting("Bullet List")} 
                      />
                      <ToolbarButton 
                        icon={<ListOrdered className="h-4 w-4" />} 
                        tooltip="Numbered List" 
                        onClick={() => handleApplyFormatting("Numbered List")} 
                      />
                      <div className="border-r h-4 mx-2" />
                      <ToolbarButton 
                        icon={<LinkIcon className="h-4 w-4" />} 
                        tooltip="Insert Link" 
                        onClick={() => handleApplyFormatting("Link")} 
                      />
                      <ToolbarButton 
                        icon={<Paperclip className="h-4 w-4" />} 
                        tooltip="Add Attachment" 
                        onClick={() => handleApplyFormatting("Attachment")} 
                      />
                    </div>
                    <Textarea 
                      value={templateData.content}
                      onChange={handleContentChange}
                      className="min-h-[300px] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">AI Enhancements</h3>
                  <Switch 
                    checked={aiEnabled}
                    onCheckedChange={setAiEnabled}
                  />
                </div>

                <div className={`space-y-3 ${!aiEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="personalizationToggle">Smart Personalization</Label>
                      <p className="text-xs text-muted-foreground">Adjust tone based on prospect data</p>
                    </div>
                    <Switch id="personalizationToggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="grammarToggle">Grammar Enhancement</Label>
                      <p className="text-xs text-muted-foreground">Fix grammar and improve clarity</p>
                    </div>
                    <Switch id="grammarToggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="responsesToggle">Suggested Responses</Label>
                      <p className="text-xs text-muted-foreground">Include personalized call to action</p>
                    </div>
                    <Switch id="responsesToggle" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Template Variables</h3>
              
              <Tabs value={selectedVariablesTab} onValueChange={setSelectedVariablesTab}>
                <TabsList className="w-full">
                  {VARIABLE_CATEGORIES.map(category => (
                    <TabsTrigger key={category.title} value={category.title} className="flex-1">
                      {category.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {VARIABLE_CATEGORIES.map(category => (
                  <TabsContent key={category.title} value={category.title} className="mt-4">
                    <VariableCategory 
                      title={category.title} 
                      variables={category.variables}
                      onSelectVariable={handleInsertVariable}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
