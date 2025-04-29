
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { initSalesProcessAutomation } from "@/utils/salesProcessAutomation";
import DashboardHeader from '@/components/advisor-dashboard/DashboardHeader';
import CompanyInfo from '@/components/advisor-dashboard/CompanyInfo';
import FeatureCards from '@/components/advisor-dashboard/FeatureCards';
import ProcessFlow from '@/components/advisor-dashboard/ProcessFlow';
import StatsCards from '@/components/advisor-dashboard/StatsCards';
import ClientsOverview from '@/components/advisor-dashboard/ClientsOverview';
import GhlIntegrationSection from '@/components/advisor-dashboard/GhlIntegrationSection';
import PracticeManagementSection from '@/components/advisor-dashboard/PracticeManagementSection';

const AdvisorDashboard = () => {
  useEffect(() => {
    // Initialize sales process automation
    initSalesProcessAutomation();
  }, []);

  return (
    <div className="space-y-10">
      <Toaster />
      
      {/* Header Section */}
      <DashboardHeader />

      {/* Main Feature Cards - Moved up for better visibility */}
      <FeatureCards />

      {/* Client Wealth Management Section */}
      <ClientsOverview />

      {/* Practice Management Integration Section - NEW */}
      <div id="practice-management">
        <PracticeManagementSection />
      </div>
      
      {/* GHL Integration Section */}
      <div id="ghl-integration">
        <GhlIntegrationSection />
      </div>

      {/* Process Flow Section */}
      <ProcessFlow />

      {/* Demo Data Stats */}
      <StatsCards />
      
      {/* Company Information - Moved to bottom as reference info */}
      <CompanyInfo />
    </div>
  );
};

export default AdvisorDashboard;
