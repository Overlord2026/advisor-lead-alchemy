
import { supabase } from "@/integrations/supabase/client";

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

export class ProspectService {
  static async getProspects(leadSourceId: string | null = null): Promise<Prospect[]> {
    try {
      let query = supabase.from("prospects").select();
      
      // Apply lead source filter if provided
      if (leadSourceId) {
        query = query.eq("lead_source_id", leadSourceId);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
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
      
      return data;
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
      
      return data;
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
