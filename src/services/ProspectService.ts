
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface Prospect {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  stage: string;
  hnw_score: string | null;
  lead_source_id: string | null;
  next_meeting: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}

// Type for filtering prospects
export interface ProspectFilter {
  lead_source_id?: string;
  status?: string;
  stage?: string;
  created_at_start?: string;
  created_at_end?: string;
}

export class ProspectService {
  static async getProspects(filter: ProspectFilter = {}): Promise<Prospect[]> {
    try {
      let query = supabase.from("prospects").select("*");
      
      // Apply lead source filter if provided
      if (filter.lead_source_id) {
        query = query.eq("lead_source_id", filter.lead_source_id);
      }
      
      // Apply status filter if provided
      if (filter.status) {
        query = query.eq("status", filter.status);
      }
      
      // Apply stage filter if provided
      if (filter.stage) {
        query = query.eq("stage", filter.stage);
      }
      
      // Apply date range filter if provided
      if (filter.created_at_start) {
        query = query.gte("created_at", filter.created_at_start);
      }
      
      if (filter.created_at_end) {
        query = query.lte("created_at", filter.created_at_end);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform the Json type from Supabase to Record<string, any>
      return (data || []).map(item => ({
        ...item,
        metadata: item.metadata as Record<string, any>
      }));
    } catch (error) {
      console.error("Error fetching prospects:", error);
      throw error;
    }
  }

  static async createProspect(prospect: Partial<Prospect>): Promise<Prospect> {
    try {
      const { data, error } = await supabase
        .from("prospects")
        .insert(prospect)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return {
        ...data,
        metadata: data.metadata as Record<string, any>
      };
    } catch (error) {
      console.error("Error creating prospect:", error);
      throw error;
    }
  }

  static async updateProspect(id: string, updates: Partial<Prospect>): Promise<Prospect> {
    try {
      const { data, error } = await supabase
        .from("prospects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return {
        ...data,
        metadata: data.metadata as Record<string, any>
      };
    } catch (error) {
      console.error("Error updating prospect:", error);
      throw error;
    }
  }

  static async deleteProspect(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("prospects")
        .delete()
        .eq("id", id);
        
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting prospect:", error);
      throw error;
    }
  }
}
