
import React, { useState } from 'react';
import { Toaster } from "sonner";
import ProspectDashboardHeader from '@/components/advisor/prospects/DashboardHeader';
import StatCards from '@/components/advisor/prospects/StatCards';
import ProspectPipeline from '@/components/advisor/prospects/ProspectPipeline';
import ProspectTable from '@/components/advisor/prospects/ProspectTable';

const ProspectDashboard = () => {
  const [leadSourceFilter, setLeadSourceFilter] = useState<string | null>(null);
  
  const handleLeadSourceFilter = (leadSourceId: string | null) => {
    setLeadSourceFilter(leadSourceId);
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <ProspectDashboardHeader onLeadSourceFilter={handleLeadSourceFilter} />
      <StatCards leadSourceId={leadSourceFilter} />
      <ProspectPipeline leadSourceId={leadSourceFilter} />
      <ProspectTable leadSourceId={leadSourceFilter} />
    </div>
  );
};

export default ProspectDashboard;
