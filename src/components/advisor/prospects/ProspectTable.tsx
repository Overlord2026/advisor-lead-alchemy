
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ProspectService, ProspectFilter } from '@/services/ProspectService';
import { toast } from 'sonner';
import TableActions, { ProspectFilters } from './TableActions';
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
  const [filters, setFilters] = useState<ProspectFilters>({
    searchQuery: "",
    dateRange: { from: undefined, to: undefined },
    status: null,
    stage: null
  });

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

  const handleFiltersChange = (newFilters: Partial<ProspectFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  // Filter prospects based on all filters
  const filteredProspects = prospects.filter(prospect => {
    const { searchQuery, dateRange, status, stage } = filters;
    const { from, to } = dateRange;
    
    // Apply text search
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      prospect.name.toLowerCase().includes(searchLower) || 
      (prospect.email && prospect.email.toLowerCase().includes(searchLower));
    
    // Apply date range filter
    let matchesDateRange = true;
    if (from || to) {
      const prospectDate = new Date(prospect.createdAt);
      if (from && to) {
        // Adjust end date to include the entire day
        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);
        matchesDateRange = prospectDate >= from && prospectDate <= endDate;
      } else if (from) {
        matchesDateRange = prospectDate >= from;
      } else if (to) {
        // Adjust end date to include the entire day
        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);
        matchesDateRange = prospectDate <= endDate;
      }
    }

    // Apply status filter
    const matchesStatus = !status || prospect.status === status;
    
    // Apply stage filter
    const matchesStage = !stage || prospect.stage === stage;
    
    return matchesSearch && matchesDateRange && matchesStatus && matchesStage;
  });

  return (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <div>
          <TableActions 
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onProspectCreated={handleProspectCreated}
          />
          
          <ProspectsTableContent 
            prospects={filteredProspects}
            isLoading={isLoading}
            searchQuery={filters.searchQuery}
          />
          
          <TablePagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasItems={filteredProspects.length > 0}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectTable;
