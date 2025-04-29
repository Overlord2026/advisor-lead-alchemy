
import React from 'react';
import { QuestionnairesTab } from '@/components/questionnaires/QuestionnairesTab';
import { Toaster } from "@/components/ui/sonner";

const QuestionnairesPage = () => {
  return (
    <>
      <Toaster />
      <QuestionnairesTab />
    </>
  );
};

export default QuestionnairesPage;
