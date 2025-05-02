
import React from 'react';
import { FileSpreadsheet, UserPlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddProspectModal from './AddProspectModal';
import { Link } from 'react-router-dom';

const ProspectDashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prospect Management</h1>
        <p className="text-muted-foreground">
          Track, manage and convert your prospects into clients
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link to="/advisor/lead-sources" className="inline-flex items-center text-sm gap-2 text-muted-foreground hover:text-foreground">
          <FileSpreadsheet className="h-4 w-4" />
          <span>Lead Sources</span>
        </Link>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
        
        <AddProspectModal />
      </div>
    </div>
  );
};

export default ProspectDashboardHeader;
