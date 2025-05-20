
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { initSalesProcessAutomation } from "@/utils/salesProcessAutomation";
import DashboardHeader from '@/components/advisor-dashboard/DashboardHeader';
import FeatureCards from '@/components/advisor-dashboard/FeatureCards';
import ProcessFlow from '@/components/advisor-dashboard/ProcessFlow';
import QuickActions from '@/components/advisor-dashboard/QuickActions';
import RecentRecordings from '@/components/advisor-dashboard/RecentRecordings';
import StatsCards from '@/components/advisor-dashboard/StatsCards';

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

      {/* Key Metrics Section */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Key Performance Metrics</h2>
        <StatsCards />
      </section>
      
      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <QuickActions />
      </section>
      
      {/* Recent Recordings */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Client Interactions</h2>
        <RecentRecordings />
      </section>
      
      {/* Feature Cards */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Platform Capabilities</h2>
        <FeatureCards />
      </section>
      
      {/* Sales Process Flow */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Sales Process Overview</h2>
        <ProcessFlow />
      </section>
    </div>
  );
};

export default AdvisorDashboard;
