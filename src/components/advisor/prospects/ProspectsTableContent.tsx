
import React from 'react';
import ProspectTableRow, { ProspectRowProps } from "./ProspectTableRow";

interface ProspectsTableContentProps {
  prospects: ProspectRowProps[];
  isLoading: boolean;
  searchQuery: string;
}

const ProspectsTableContent: React.FC<ProspectsTableContentProps> = ({ 
  prospects, 
  isLoading, 
  searchQuery 
}) => {
  // Filter prospects based on search query
  const filteredProspects = prospects.filter(prospect => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      prospect.name.toLowerCase().includes(query) || 
      prospect.email.toLowerCase().includes(query)
    );
  });
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="text-left border-b border-border">
          <tr>
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Source</th>
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground">HNW Score</th>
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Stage</th>
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Next Meeting</th>
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center py-8">Loading prospects...</td>
            </tr>
          ) : filteredProspects.length > 0 ? (
            filteredProspects.map((prospect, index) => (
              <ProspectTableRow key={index} {...prospect} />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-8">
                {searchQuery ? "No prospects match your search" : "No prospects found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProspectsTableContent;
