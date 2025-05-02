
import { LeadSource } from "./leadSources";

export interface PartnerApiMapping {
  id: string;
  lead_source_id: string;
  mapping: Record<string, string>;
  updated_at: string;
}

export interface PartnerWebhook {
  id: string;
  lead_source_id: string;
  event_type: string;
  target_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProspectEvent {
  id: string;
  prospect_id: string;
  event_type: string;
  occurred_at: string;
}

export interface WebhookFormData {
  event_type: string;
  target_url: string;
  is_active: boolean;
}

// Event types that can trigger webhooks
export const EVENT_TYPES = [
  { value: 'imported', label: 'Lead Imported' },
  { value: 'stage_changed', label: 'Pipeline Stage Changed' },
  { value: 'qualified', label: 'Lead Qualified' },
  { value: 'disqualified', label: 'Lead Disqualified' },
  { value: 'converted', label: 'Lead Converted' },
];
