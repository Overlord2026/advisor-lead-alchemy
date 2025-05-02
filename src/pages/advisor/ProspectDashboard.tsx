
import React from 'react';
import { Toaster } from "sonner";
import ProspectDashboardHeader from '@/components/advisor/prospects/DashboardHeader';
import StatCards from '@/components/advisor/prospects/StatCards';
import ProspectPipeline from '@/components/advisor/prospects/ProspectPipeline';
import ProspectTable from '@/components/advisor/prospects/ProspectTable';

const ProspectDashboard = () => {
  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <ProspectDashboardHeader />
      <StatCards />
      <ProspectPipeline />
      <ProspectTable />
    </div>
  );
};

export default ProspectDashboard;
