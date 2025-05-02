
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationEllipsis 
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages?: number;
  hasItems: boolean;
}

const TablePagination: React.FC<TablePaginationProps> = ({ 
  currentPage, 
  setCurrentPage, 
  totalPages = 10,
  hasItems
}) => {
  if (!hasItems) return null;
  
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink 
            isActive={currentPage === 1} 
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
        
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink isActive={true}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink 
              isActive={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
