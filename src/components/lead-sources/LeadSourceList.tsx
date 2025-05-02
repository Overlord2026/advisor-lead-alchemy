import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Trash2, Edit, RefreshCw, 
  Check, X, Eye, FileSpreadsheet,
  Link2, Webhook
} from "lucide-react";
import { LeadSourceService } from "@/services/LeadSourceService";
import { LeadSource } from "@/types/leadSources";
import { toast } from "@/utils/toast";
import { useModal } from "@/components/ui/modal";

interface LeadSourceListProps {
  onAddClick: () => void;
  onEditClick: (leadSource: LeadSource) => void;
  onImportClick: (leadSource: LeadSource) => void;
  onViewLogsClick: (leadSource: LeadSource) => void;
  onApiMappingClick: (leadSource: LeadSource) => void;
  onWebhooksClick: (leadSource: LeadSource) => void;
}

const LeadSourceList = ({
  onAddClick,
  onEditClick,
  onImportClick,
  onViewLogsClick,
  onApiMappingClick,
  onWebhooksClick
}: LeadSourceListProps) => {
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal, onOpenChange: onDeleteModalOpenChange } = useModal();

  useEffect(() => {
    fetchLeadSources();
  }, []);

  const fetchLeadSources = async () => {
    try {
      setLoading(true);
      const data = await LeadSourceService.getLeadSources();
      setLeadSources(data);
    } catch (error) {
      toast.error("Failed to fetch lead sources");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (id: string) => {
    try {
      setTestingId(id);
      const result = await LeadSourceService.testLeadSource(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Connection test failed: ${error.message}`);
    } finally {
      setTestingId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    openDeleteModal();
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    
    try {
      await LeadSourceService.deleteLeadSource(deletingId);
      setLeadSources(leadSources.filter(source => source.id !== deletingId));
      toast.success("Lead source deleted successfully");
    } catch (error) {
      toast.error(`Failed to delete lead source: ${error.message}`);
    } finally {
      setDeletingId(null);
      closeDeleteModal();
    }
  };

  const getSourceTypeLabel = (sourceType: string) => {
    switch (sourceType) {
      case "csv":
        return { label: "CSV Import", color: "bg-blue-100 text-blue-800 border-blue-200" };
      case "api":
        return { label: "API", color: "bg-purple-100 text-purple-800 border-purple-200" };
      case "ghl":
        return { label: "Go High Level", color: "bg-orange-100 text-orange-800 border-orange-200" };
      default:
        return { label: sourceType, color: "bg-gray-100 text-gray-800 border-gray-200" };
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleDateString();
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Lead Sources</h2>
        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-2" /> Add Lead Source
        </Button>
      </div>
      
      {leadSources.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No lead sources configured yet.</p>
          <Button onClick={onAddClick} variant="outline" className="mt-4">
            <Plus className="h-4 w-4 mr-2" /> Add Your First Lead Source
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Import</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadSources.map((source) => {
                const sourceType = getSourceTypeLabel(source.source_type);
                
                return (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell>
                      <Badge className={sourceType.color}>
                        {sourceType.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {source.is_active ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          <X className="h-3 w-3 mr-1" /> Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(source.last_sync_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleTestConnection(source.id)}
                          disabled={testingId === source.id}
                        >
                          {testingId === source.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            "Test"
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onImportClick(source)}
                        >
                          <FileSpreadsheet className="h-4 w-4 mr-1" /> Import
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onApiMappingClick(source)}
                        >
                          <Link2 className="h-4 w-4 mr-1" /> API Map
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onWebhooksClick(source)}
                        >
                          <Webhook className="h-4 w-4 mr-1" /> Webhooks
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewLogsClick(source)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Logs
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onEditClick(source)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteClick(source.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p className="my-4">Are you sure you want to delete this lead source? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadSourceList;
