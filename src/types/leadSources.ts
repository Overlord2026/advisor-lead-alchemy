
export interface LeadSource {
  id: string;
  name: string;
  source_type: string;
  config: Record<string, any>;
  credentials: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_sync_at: string | null;
}

export interface LeadSourceLog {
  id: string;
  lead_source_id: string;
  status: 'pending' | 'success' | 'error' | 'partial';
  message: string | null;
  records_processed: number | null;
  records_imported: number | null;
  records_failed: number | null;
  details: Record<string, any> | null;
  started_at: string;
  completed_at: string | null;
  error: string | null;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  log_id: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
