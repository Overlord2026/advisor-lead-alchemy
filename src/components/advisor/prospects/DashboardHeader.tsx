
import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, UserPlus, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddProspectModal from './AddProspectModal';
import { Link } from 'react-router-dom';
import { LeadSourceService } from '@/services/LeadSourceService';
import { LeadSource } from '@/types/leadSources';
import { toast } from 'sonner';

interface ProspectDashboardHeaderProps {
  onLeadSourceFilter?: (leadSourceId: string | null) => void;
}

const ProspectDashboardHeader = ({ onLeadSourceFilter }: ProspectDashboardHeaderProps) => {
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [selectedLeadSource, setSelectedLeadSource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchLeadSources = async () => {
      try {
        setIsLoading(true);
        const sources = await LeadSourceService.getLeadSources();
        setLeadSources(sources);
      } catch (error) {
        console.error('Error fetching lead sources:', error);
        toast.error('Failed to load lead sources');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeadSources();
  }, []);
  
  const handleLeadSourceChange = (value: string) => {
    const leadSourceId = value === 'all' ? null : value;
    setSelectedLeadSource(leadSourceId);
    
    if (onLeadSourceFilter) {
      onLeadSourceFilter(leadSourceId);
    }
  };

  return (
    <div className="bg-gradient-to-r from-navy-dark via-navy-light to-navy-dark border-b border-gold/20 p-8 mb-8 -mx-6 mt-[-24px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Prospect Management</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Track, manage and convert your prospects into clients with powerful automation tools
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/advisor/lead-sources" className="inline-flex items-center text-sm gap-2 text-muted-foreground hover:text-gold transition-colors">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Lead Sources</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Select 
                disabled={isLoading || leadSources.length === 0}
                value={selectedLeadSource || 'all'}
                onValueChange={handleLeadSourceChange}
              >
                <SelectTrigger className="w-[180px] h-9 bg-navy-subtle border-gold/20">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {leadSources.map(source => (
                    <SelectItem key={source.id} value={source.id}>{source.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2 border-gold/20 hover:bg-gold/10">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            
            <AddProspectModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectDashboardHeader;
