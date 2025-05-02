
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ProspectTableRow, { ProspectRowProps } from './ProspectTableRow';

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
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading prospects...</p>
      </div>
    );
  }

  if (prospects.length === 0) {
    return (
      <div className="text-center py-8">
        {searchQuery ? (
          <p className="text-muted-foreground">No prospects matching your filters. Try adjusting your search criteria.</p>
        ) : (
          <p className="text-muted-foreground">No prospects found. Add your first prospect to get started.</p>
        )}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] rounded-md border">
      <div className="relative min-w-full">
        <table className="w-full caption-bottom text-sm">
          <thead className="sticky top-0 bg-card border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-6">#</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Source</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stage</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {prospects.map((prospect, index) => (
              <ProspectTableRow 
                key={prospect.id}
                index={index + 1}
                {...prospect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
};

export default ProspectsTableContent;
