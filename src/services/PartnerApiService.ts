import { supabase } from "@/integrations/supabase/client";
import { PartnerApiMapping, PartnerWebhook, ProspectEvent } from "@/types/partnerApi";

export class PartnerApiService {
  /**
   * Get API mapping for a lead source
   */
  static async getApiMapping(leadSourceId: string): Promise<PartnerApiMapping | null> {
    const { data, error } = await supabase
      .from('partner_api_mappings')
      .select('*')
      .eq('lead_source_id', leadSourceId)
      .maybeSingle();
    
    if (error) {
      console.error(`Error fetching API mapping for lead source ${leadSourceId}:`, error);
      throw new Error(`Failed to fetch API mapping: ${error.message}`);
    }
    
    // Convert the JSON mapping field to Record<string, string>
    if (data) {
      return {
        ...data,
        mapping: data.mapping as unknown as Record<string, string>
      };
    }
    
    return null;
  }
  
  /**
   * Create or update API mapping for a lead source
   */
  static async saveApiMapping(leadSourceId: string, mapping: Record<string, string>): Promise<PartnerApiMapping> {
    const { data: existing } = await supabase
      .from('partner_api_mappings')
      .select('id')
      .eq('lead_source_id', leadSourceId)
      .maybeSingle();
    
    if (existing) {
      // Update existing mapping
      const { data, error } = await supabase
        .from('partner_api_mappings')
        .update({ mapping })
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating API mapping for lead source ${leadSourceId}:`, error);
        throw new Error(`Failed to update API mapping: ${error.message}`);
      }
      
      return {
        ...data,
        mapping: data.mapping as unknown as Record<string, string>
      };
    } else {
      // Create new mapping
      const { data, error } = await supabase
        .from('partner_api_mappings')
        .insert({ lead_source_id: leadSourceId, mapping })
        .select()
        .single();
      
      if (error) {
        console.error(`Error creating API mapping for lead source ${leadSourceId}:`, error);
        throw new Error(`Failed to create API mapping: ${error.message}`);
      }
      
      return {
        ...data,
        mapping: data.mapping as unknown as Record<string, string>
      };
    }
  }
  
  /**
   * Delete API mapping for a lead source
   */
  static async deleteApiMapping(id: string): Promise<void> {
    const { error } = await supabase
      .from('partner_api_mappings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting API mapping ${id}:`, error);
      throw new Error(`Failed to delete API mapping: ${error.message}`);
    }
  }
  
  /**
   * Get webhooks for a lead source
   */
  static async getWebhooks(leadSourceId: string): Promise<PartnerWebhook[]> {
    const { data, error } = await supabase
      .from('partner_webhooks')
      .select('*')
      .eq('lead_source_id', leadSourceId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching webhooks for lead source ${leadSourceId}:`, error);
      throw new Error(`Failed to fetch webhooks: ${error.message}`);
    }
    
    return data || [];
  }
  
  /**
   * Create a webhook for a lead source
   */
  static async createWebhook(
    leadSourceId: string, 
    eventType: string, 
    targetUrl: string, 
    isActive: boolean = true
  ): Promise<PartnerWebhook> {
    const { data, error } = await supabase
      .from('partner_webhooks')
      .insert({
        lead_source_id: leadSourceId,
        event_type: eventType,
        target_url: targetUrl,
        is_active: isActive
      })
      .select()
      .single();
    
    if (error) {
      console.error(`Error creating webhook for lead source ${leadSourceId}:`, error);
      throw new Error(`Failed to create webhook: ${error.message}`);
    }
    
    return data as PartnerWebhook;
  }
  
  /**
   * Update a webhook
   */
  static async updateWebhook(
    id: string,
    updates: Partial<PartnerWebhook>
  ): Promise<PartnerWebhook> {
    const { data, error } = await supabase
      .from('partner_webhooks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating webhook ${id}:`, error);
      throw new Error(`Failed to update webhook: ${error.message}`);
    }
    
    return data as PartnerWebhook;
  }
  
  /**
   * Delete a webhook
   */
  static async deleteWebhook(id: string): Promise<void> {
    const { error } = await supabase
      .from('partner_webhooks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting webhook ${id}:`, error);
      throw new Error(`Failed to delete webhook: ${error.message}`);
    }
  }
  
  /**
   * Test a webhook by sending a test event
   */
  static async testWebhook(webhookId: string): Promise<{ success: boolean; message: string }> {
    const { data, error } = await supabase.functions.invoke("partner-webhook-test", {
      method: "POST",
      body: { webhookId }
    });
    
    if (error) {
      console.error(`Error testing webhook ${webhookId}:`, error);
      throw new Error(`Failed to test webhook: ${error.message}`);
    }
    
    return data as { success: boolean; message: string };
  }
  
  /**
   * Record a prospect event
   */
  static async recordEvent(prospectId: string, eventType: string): Promise<ProspectEvent> {
    const { data, error } = await supabase
      .from('prospect_events')
      .insert({
        prospect_id: prospectId,
        event_type: eventType
      })
      .select()
      .single();
    
    if (error) {
      console.error(`Error recording event for prospect ${prospectId}:`, error);
      throw new Error(`Failed to record prospect event: ${error.message}`);
    }
    
    return data as ProspectEvent;
  }
  
  /**
   * Get events for a prospect
   */
  static async getProspectEvents(prospectId: string): Promise<ProspectEvent[]> {
    const { data, error } = await supabase
      .from('prospect_events')
      .select('*')
      .eq('prospect_id', prospectId)
      .order('occurred_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching events for prospect ${prospectId}:`, error);
      throw new Error(`Failed to fetch prospect events: ${error.message}`);
    }
    
    return data || [];
  }
}
