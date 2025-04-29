
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { initSalesProcessAutomation } from "@/utils/salesProcessAutomation";
import DashboardHeader from '@/components/advisor-dashboard/DashboardHeader';
import CompanyInfo from '@/components/advisor-dashboard/CompanyInfo';
import FeatureCards from '@/components/advisor-dashboard/FeatureCards';
import ProcessFlow from '@/components/advisor-dashboard/ProcessFlow';
import StatsCards from '@/components/advisor-dashboard/StatsCards';
import ClientsOverview from '@/components/advisor-dashboard/ClientsOverview';

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

      {/* Company Information */}
      <CompanyInfo />

      {/* Client Wealth Management Section */}
      <ClientsOverview />

      {/* Main Feature Cards */}
      <FeatureCards />

      {/* Process Flow Section */}
      <ProcessFlow />

      {/* Demo Data Stats */}
      <StatsCards />
    </div>
  );
};

export default AdvisorDashboard;
