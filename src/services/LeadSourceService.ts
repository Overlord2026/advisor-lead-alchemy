
import { supabase } from "@/integrations/supabase/client";
import { LeadSource, LeadSourceLog, ImportResult, PaginatedResponse } from "@/types/leadSources";

export class LeadSourceService {
  /**
   * Fetch all lead sources
   */
  static async getLeadSources(): Promise<LeadSource[]> {
    const { data, error } = await supabase.functions.invoke<{ data: LeadSource[] }>("lead-sources");
    
    if (error) {
      console.error("Error fetching lead sources:", error);
      throw new Error(`Failed to fetch lead sources: ${error.message}`);
    }
    
    return data?.data || [];
  }
  
  /**
   * Get a specific lead source by ID
   */
  static async getLeadSource(id: string): Promise<LeadSource> {
    const { data, error } = await supabase.functions.invoke<{ data: LeadSource[] }>("lead-sources", {
      query: { id }
    });
    
    if (error) {
      console.error(`Error fetching lead source ${id}:`, error);
      throw new Error(`Failed to fetch lead source: ${error.message}`);
    }
    
    if (!data?.data || data.data.length === 0) {
      throw new Error("Lead source not found");
    }
    
    return data.data[0];
  }
  
  /**
   * Create a new lead source
   */
  static async createLeadSource(leadSource: Partial<LeadSource>): Promise<LeadSource> {
    const { data, error } = await supabase.functions.invoke<{ data: LeadSource }>("lead-sources", {
      method: "POST",
      body: leadSource
    });
    
    if (error) {
      console.error("Error creating lead source:", error);
      throw new Error(`Failed to create lead source: ${error.message}`);
    }
    
    return data?.data as LeadSource;
  }
  
  /**
   * Update an existing lead source
   */
  static async updateLeadSource(id: string, updates: Partial<LeadSource>): Promise<LeadSource> {
    const { data, error } = await supabase.functions.invoke<{ data: LeadSource }>("lead-sources", {
      method: "PUT",
      body: { id, ...updates }
    });
    
    if (error) {
      console.error(`Error updating lead source ${id}:`, error);
      throw new Error(`Failed to update lead source: ${error.message}`);
    }
    
    return data?.data as LeadSource;
  }
  
  /**
   * Delete a lead source
   */
  static async deleteLeadSource(id: string): Promise<void> {
    const { error } = await supabase.functions.invoke("lead-sources", {
      method: "DELETE",
      query: { id }
    });
    
    if (error) {
      console.error(`Error deleting lead source ${id}:`, error);
      throw new Error(`Failed to delete lead source: ${error.message}`);
    }
  }
  
  /**
   * Test a lead source connection
   */
  static async testLeadSource(id: string): Promise<{ success: boolean; message: string; details: Record<string, any> }> {
    const { data, error } = await supabase.functions.invoke<{ success: boolean; message: string; details: Record<string, any> }>(
      "lead-sources-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        responseType: "json",
        body: { id }
      }
    );
    
    if (error) {
      console.error(`Error testing lead source ${id}:`, error);
      throw new Error(`Failed to test lead source: ${error.message}`);
    }
    
    return data || { success: false, message: "Unknown error", details: {} };
  }
  
  /**
   * Import data from a lead source
   */
  static async importLeadSource(leadSourceId: string, data: any[]): Promise<ImportResult> {
    const { data: result, error } = await supabase.functions.invoke<ImportResult>("lead-sources-import", {
      method: "POST",
      body: { leadSourceId, data }
    });
    
    if (error) {
      console.error(`Error importing from lead source ${leadSourceId}:`, error);
      throw new Error(`Failed to import data: ${error.message}`);
    }
    
    return result as ImportResult;
  }
  
  /**
   * Get logs for a lead source
   */
  static async getLeadSourceLogs(
    leadSourceId: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<PaginatedResponse<LeadSourceLog>> {
    const { data, error } = await supabase.functions.invoke<PaginatedResponse<LeadSourceLog>>("lead-sources-logs", {
      query: { 
        page: page.toString(), 
        limit: limit.toString() 
      }
    });
    
    if (error) {
      console.error(`Error fetching logs for lead source ${leadSourceId}:`, error);
      throw new Error(`Failed to fetch lead source logs: ${error.message}`);
    }
    
    return data || { data: [], pagination: { total: 0, page, limit, pages: 0 } };
  }
  
  /**
   * Retry a failed import
   */
  static async retryImport(leadSourceId: string, logId: string): Promise<{ success: boolean; new_log_id: string }> {
    const { data, error } = await supabase.functions.invoke<{ success: boolean; new_log_id: string }>("lead-sources-retry", {
      method: "POST",
      body: { leadSourceId, logId }
    });
    
    if (error) {
      console.error(`Error retrying import for log ${logId}:`, error);
      throw new Error(`Failed to retry import: ${error.message}`);
    }
    
    return data as { success: boolean; new_log_id: string };
  }
}
