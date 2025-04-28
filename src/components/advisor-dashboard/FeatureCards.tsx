
import React from 'react';
import { Users, Mic, ClipboardList, Mail, BarChart, Settings } from "lucide-react";
import { toast } from "sonner";
import FeatureCard from './FeatureCard';

const FeatureCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard 
        title="Prospect Management"
        description="AI-powered analytics and scoring to identify high-value prospects and optimize your sales pipeline."
        Icon={Users}
        linkTo="/advisor/prospects"
        linkText="Access Prospects"
        features={[
          "Pipeline visualization",
          "HNW scoring",
          "Automated follow-ups"
        ]}
        className="card-gradient-purple"
      />
      
      <FeatureCard 
        title="Meeting Intelligence"
        description="Record, transcribe, and analyze client meetings to extract insights and automate follow-up actions."
        Icon={Mic}
        linkTo="/advisor/recordings"
        linkText="Access Recordings"
        features={[
          "AI transcription",
          "Key moment detection",
          "Action item extraction"
        ]}
        className="card-gradient-indigo"
      />
      
      <FeatureCard 
        title="Smart Questionnaires"
        description="Dynamic questionnaires that adapt based on client inputs, with AI analysis of responses."
        Icon={ClipboardList}
        linkTo="/advisor/questionnaires"
        linkText="Access Questionnaires"
        features={[
          "Adaptive questions",
          "Response sentiment analysis",
          "Auto-recommended solutions"
        ]}
        className="card-gradient-blue"
      />
      
      <FeatureCard 
        title="Email Automation"
        description="Personalized email templates and automated sequences based on client interactions and preferences."
        Icon={Mail}
        linkTo="/advisor/templates"
        linkText="Access Templates"
        features={[
          "Dynamic personalization",
          "Sequence automation",
          "Performance analytics"
        ]}
        className="card-gradient-teal"
      />
      
      <FeatureCard 
        title="ROI Analytics"
        description="Track marketing ROI and sales performance with advanced analytics and predictive modeling."
        Icon={BarChart}
        linkTo="/advisor/roi"
        linkText="Access ROI Data"
        features={[
          "Channel attribution",
          "Conversion path analysis",
          "AI-powered forecasting"
        ]}
        className="card-gradient-pink"
      />
      
      <FeatureCard 
        title="System Settings"
        description="Configure your sales process automation settings and integrations."
        Icon={Settings}
        linkTo=""
        linkText="Configure Settings"
        features={[
          "API connections",
          "Automation rules",
          "User permissions"
        ]}
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        aiEnhanced={false}
        onClick={() => toast.info("Settings module coming soon!")}
      />
    </div>
  );
};

export default FeatureCards;
