
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { initSalesProcessAutomation } from "@/utils/salesProcessAutomation";
import DashboardHeader from '@/components/advisor-dashboard/DashboardHeader';
import FeatureCards from '@/components/advisor-dashboard/FeatureCards';
import ProcessFlow from '@/components/advisor-dashboard/ProcessFlow';

const AdvisorDashboard = () => {
  useEffect(() => {
    // Initialize sales process automation
    initSalesProcessAutomation();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Toaster />
      
      {/* Main Heading */}
      <DashboardHeader 
        title="Sales Process Automation System" 
        subtitle="A comprehensive platform designed to streamline your entire sales workflow from lead generation to client onboarding."
      />

      {/* Feature Cards */}
      <FeatureCards />
      
      {/* Sales Process Flow */}
      <ProcessFlow />
    </div>
  );
};

export default AdvisorDashboard;
