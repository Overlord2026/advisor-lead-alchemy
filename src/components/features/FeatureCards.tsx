
import React from 'react';
import { FileText, Mic, ClipboardList, Mail, BarChart3, Link2 } from "lucide-react";
import FeatureCard from '@/components/advisor-dashboard/FeatureCard';

const FeatureCards = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard 
        title="Call Prep One-Pager"
        description="Prep every meeting with a 60-second AI summary—before you join."
        Icon={FileText}
        linkTo="/advisor/prospects"
        linkText="Access Call Prep"
        features={[
          "Client background summary",
          "Previous meeting highlights",
          "Suggested talking points"
        ]}
        className="card-gradient-purple"
      />
      
      <FeatureCard 
        title="Meeting Intelligence"
        description="Auto-transcribe, detect key moments, extract action items."
        Icon={Mic}
        linkTo="/advisor/recordings"
        linkText="Access Recordings"
        features={[
          "Real-time transcription",
          "Key moment detection",
          "Action item extraction"
        ]}
        className="card-gradient-indigo"
      />
      
      <FeatureCard 
        title="Smart Questionnaires"
        description="Adaptive intake forms that evolve with client answers."
        Icon={ClipboardList}
        linkTo="/advisor/questionnaires"
        linkText="Access Questionnaires"
        features={[
          "Adaptive questions",
          "Response analysis",
          "Auto-recommendations"
        ]}
        className="card-gradient-blue"
      />
      
      <FeatureCard 
        title="Email Automation"
        description="Send hyper-personalized thank-you & follow-up emails in seconds."
        Icon={Mail}
        linkTo="/advisor/templates"
        linkText="Access Email Tools"
        features={[
          "Dynamic personalization",
          "Sequence automation",
          "Performance analytics"
        ]}
        className="card-gradient-teal"
      />
      
      <FeatureCard 
        title="ROI Analytics"
        description="Track marketing ROI & sales KPIs in real time."
        Icon={BarChart3}
        linkTo="/advisor/roi"
        linkText="Access Analytics"
        features={[
          "Campaign attribution",
          "Conversion tracking",
          "Performance forecasting"
        ]}
        className="card-gradient-pink"
      />
      
      <FeatureCard 
        title="Integrations"
        description="Connect your calendar, CRM, Drive, GHL & more in one click."
        Icon={Link2}
        linkTo="/advisor/training/integrations"
        linkText="Access Integrations"
        features={[
          "One-click setup",
          "Bi-directional sync",
          "Custom field mapping"
        ]}
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      />
    </div>
  );
};

export default FeatureCards;
