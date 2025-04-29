
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit, MoreVertical, Filter, Search } from "lucide-react";
import { customBadgeVariants } from "@/shared/ui";
import { type Questionnaire } from "./types";

interface SentQuestionnairesProps {
  questionnaires: Questionnaire[];
  onPreview: (questionnaire: Questionnaire) => void;
  onEdit: (questionnaire: Questionnaire) => void;
}

export const SentQuestionnaires: React.FC<SentQuestionnairesProps> = ({
  questionnaires,
  onPreview,
  onEdit
}) => {
  // Helper function to get the status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return customBadgeVariants.success;
      case "in-progress":
        return customBadgeVariants.warning;
      case "pending":
        return customBadgeVariants.info;
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sent Questionnaires</h3>
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input placeholder="Search questionnaires..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prospect</TableHead>
              <TableHead>Questionnaire Type</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionnaires.map((questionnaire) => (
              <TableRow key={questionnaire.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {questionnaire.prospect?.initial}
                    </div>
                    <div>
                      <div className="font-medium">{questionnaire.prospect?.name}</div>
                      <div className="text-xs text-muted-foreground">{questionnaire.prospect?.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{questionnaire.type}</TableCell>
                <TableCell>{questionnaire.sentDate}</TableCell>
                <TableCell>
                  <Badge 
                    className={getStatusBadgeVariant(questionnaire.status)}
                    variant="outline"
                  >
                    {questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {questionnaire.completionPercentage > 0 ? (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 max-w-[150px]">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${questionnaire.completionPercentage}%` }}
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not started</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onPreview(questionnaire)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(questionnaire)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
