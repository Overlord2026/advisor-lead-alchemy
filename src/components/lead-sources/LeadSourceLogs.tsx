
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  ChevronLeft, 
  ChevronRight, 
  X,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "@/utils/toast";
import { LeadSource, LeadSourceLog, PaginatedResponse } from "@/types/leadSources";
import { LeadSourceService } from "@/services/LeadSourceService";

interface LeadSourceLogsProps {
  leadSource: LeadSource;
  onClose: () => void;
}

const LeadSourceLogs = ({ leadSource, onClose }: LeadSourceLogsProps) => {
  const [logs, setLogs] = useState<LeadSourceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [retryingLogId, setRetryingLogId] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [pagination.page]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await LeadSourceService.getLeadSourceLogs(
        leadSource.id,
        pagination.page,
        pagination.limit
      );
      
      setLogs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error("Failed to fetch logs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (logId: string) => {
    try {
      setRetryingLogId(logId);
      const result = await LeadSourceService.retryImport(leadSource.id, logId);
      
      if (result.success) {
        toast.success("Retry initiated successfully");
        fetchLogs(); // Refresh the logs
      } else {
        toast.error("Failed to retry import");
      }
    } catch (error) {
      toast.error(`Retry failed: ${error.message}`);
    } finally {
      setRetryingLogId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const formatDuration = (start: string, end: string | null) => {
    if (!end) return "In progress";
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate.getTime() - startDate.getTime();
    
    if (durationMs < 1000) {
      return `${durationMs}ms`;
    } else if (durationMs < 60000) {
      return `${Math.round(durationMs / 1000)}s`;
    } else {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.round((durationMs % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Success
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Error
          </Badge>
        );
      case "partial":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Partial
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  if (loading && logs.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Import History - {leadSource.name}</h2>
          <p className="text-sm text-muted-foreground">
            View import logs and retry failed imports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchLogs}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4 mr-2" /> Close
          </Button>
        </div>
      </div>
      
      {logs.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-muted/20">
          <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No import history found.</p>
          <p className="text-sm text-muted-foreground">Import records will appear here once you start importing data.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">
                    {formatDate(log.started_at)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(log.status)}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs">
                      {log.records_imported || 0}/{log.records_processed || 0}
                      {log.records_failed ? ` (${log.records_failed} failed)` : ""}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDuration(log.started_at, log.completed_at)}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {log.message || (log.error ? `Error: ${log.error}` : "")}
                  </TableCell>
                  <TableCell className="text-right">
                    {(log.status === "error" || log.status === "partial") && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRetry(log.id)}
                        disabled={retryingLogId === log.id}
                      >
                        {retryingLogId === log.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Retry"
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button 
                variant="outline" 
                size="icon"
                disabled={pagination.page === 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button 
                variant="outline" 
                size="icon"
                disabled={pagination.page === pagination.pages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadSourceLogs;
