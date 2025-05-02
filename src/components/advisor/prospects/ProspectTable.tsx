
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ProspectService, ProspectFilter } from '@/services/ProspectService';
import { toast } from 'sonner';
import TableActions from './TableActions';
import ProspectsTableContent from './ProspectsTableContent';
import TablePagination from './TablePagination';
import { mapProspectToRowProps, getSampleProspects } from './utils/prospectMapping';
import { ProspectRowProps } from './ProspectTableRow';

interface ProspectTableProps {
  leadSourceId: string | null;
}

const ProspectTable = ({ leadSourceId }: ProspectTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prospects, setProspects] = useState<ProspectRowProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadProspects = async () => {
    setIsLoading(true);
    try {
      // Create filter object if leadSourceId is provided
      const filter: ProspectFilter = {};
      if (leadSourceId) {
        filter.lead_source_id = leadSourceId;
      }
      
      const data = await ProspectService.getProspects(filter);
      
      if (data && data.length > 0) {
        // Map the database prospects to the display format
        const mappedProspects = data.map(mapProspectToRowProps);
        setProspects(mappedProspects);
      } else {
        // Fallback to sample data if no prospects are found
        setProspects(getSampleProspects());
      }
    } catch (error) {
      console.error("Error loading prospects:", error);
      toast.error("Failed to load prospects");
      // Fall back to sample data on error
      setProspects(getSampleProspects());
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadProspects();
  }, [leadSourceId]);

  const handleProspectCreated = () => {
    loadProspects();
  };

  return (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <div>
          <TableActions 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onProspectCreated={handleProspectCreated}
          />
          
          <ProspectsTableContent 
            prospects={prospects}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
          
          <TablePagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasItems={prospects.length > 0}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectTable;
