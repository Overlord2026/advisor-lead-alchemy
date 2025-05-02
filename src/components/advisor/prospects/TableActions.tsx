
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileSpreadsheet } from "lucide-react";
import AddProspectModal from './AddProspectModal';
import SearchBar from './SearchBar';
import DateRangeFilter, { DateRange } from './filters/DateRangeFilter';
import StatusFilter from './filters/StatusFilter';
import StageFilter from './filters/StageFilter';

export interface ProspectFilters {
  searchQuery: string;
  dateRange: DateRange;
  status: string | null;
  stage: string | null;
}

interface TableActionsProps {
  filters: ProspectFilters;
  onFiltersChange: (filters: Partial<ProspectFilters>) => void;
  onProspectCreated: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ 
  filters, 
  onFiltersChange, 
  onProspectCreated 
}) => {
  const { searchQuery, dateRange, status, stage } = filters;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Prospect List</h3>
        <div className="flex items-center space-x-2">
          <Link to="/advisor/lead-sources" className="flex items-center text-sm text-primary hover:underline">
            <FileSpreadsheet className="h-4 w-4 mr-1" />
            Manage Lead Sources
          </Link>
          <AddProspectModal onSuccess={onProspectCreated} />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar 
          value={searchQuery} 
          onChange={(value) => onFiltersChange({ searchQuery: value })} 
          placeholder="Search name, email..."
          className="w-full sm:w-64"
        />
        
        <div className="flex flex-wrap gap-2">
          <DateRangeFilter 
            dateRange={dateRange} 
            onDateRangeChange={(range) => onFiltersChange({ dateRange: range })} 
          />
          
          <StatusFilter 
            selectedStatus={status} 
            onStatusChange={(value) => onFiltersChange({ status: value })}
          />
          
          <StageFilter 
            selectedStage={stage} 
            onStageChange={(value) => onFiltersChange({ stage: value })}
          />

          {(dateRange.from || dateRange.to || status || stage) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9"
              onClick={() => onFiltersChange({
                dateRange: { from: undefined, to: undefined },
                status: null,
                stage: null
              })}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableActions;
