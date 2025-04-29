
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailTemplatesTab from '@/components/email-templates/EmailTemplatesTab';
import { QuestionnairesTab } from '@/components/questionnaires/QuestionnairesTab';

const TemplatesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
      </div>
      
      <Tabs defaultValue="email" className="space-y-6">
        <TabsList>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <EmailTemplatesTab />
        </TabsContent>
        <TabsContent value="questionnaires">
          <QuestionnairesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesPage;
