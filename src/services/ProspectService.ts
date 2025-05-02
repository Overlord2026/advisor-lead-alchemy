
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Prospect = Tables<"prospects">;
export type NewProspect = Omit<Prospect, "id" | "created_at" | "updated_at">;

export class ProspectService {
  /**
   * Fetches all prospects
   */
  static async getProspects() {
    const { data, error } = await supabase
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  }

  /**
   * Fetches a single prospect by ID
   */
  static async getProspectById(id: string) {
    const { data, error } = await supabase
      .from("prospects")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }

  /**
   * Creates a new prospect
   */
  static async createProspect(prospect: NewProspect) {
    const { data, error } = await supabase
      .from("prospects")
      .insert([{
        ...prospect,
        status: prospect.status || "new",
        stage: prospect.stage || "Initial Contact",
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Updates an existing prospect
   */
  static async updateProspect(id: string, prospect: Partial<Prospect>) {
    const { data, error } = await supabase
      .from("prospects")
      .update(prospect)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}
