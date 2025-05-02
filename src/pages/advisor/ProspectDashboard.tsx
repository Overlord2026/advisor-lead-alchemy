
import React, { useState } from 'react';
import { Toaster } from "sonner";
import ProspectDashboardHeader from '@/components/advisor/prospects/DashboardHeader';
import StatCards from '@/components/advisor/prospects/StatCards';
import ProspectPipeline from '@/components/advisor/prospects/ProspectPipeline';
import ProspectTable from '@/components/advisor/prospects/ProspectTable';
import { ProspectFilter } from '@/services/ProspectService';

const ProspectDashboard = () => {
  const [filter, setFilter] = useState<ProspectFilter>({});
  
  const handleLeadSourceFilter = (leadSourceId: string | null) => {
    if (leadSourceId) {
      setFilter({ lead_source_id: leadSourceId });
    } else {
      setFilter({});
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <ProspectDashboardHeader onLeadSourceFilter={handleLeadSourceFilter} />
      <StatCards leadSourceId={filter.lead_source_id || null} />
      <ProspectPipeline leadSourceId={filter.lead_source_id || null} />
      <ProspectTable leadSourceId={filter.lead_source_id || null} />
    </div>
  );
};

export default ProspectDashboard;
