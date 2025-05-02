
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileSpreadsheet } from "lucide-react";
import AddProspectModal from './AddProspectModal';
import SearchBar from './SearchBar';

interface TableActionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onProspectCreated: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onProspectCreated 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold">Prospect List</h3>
      <div className="flex items-center space-x-2">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
        <Link to="/advisor/lead-sources" className="flex items-center text-sm text-primary hover:underline">
          <FileSpreadsheet className="h-4 w-4 mr-1" />
          Manage Lead Sources
        </Link>
        <AddProspectModal onSuccess={onProspectCreated} />
      </div>
    </div>
  );
};

export default TableActions;
