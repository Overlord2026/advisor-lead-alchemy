
import { toast } from "@/utils/toast";

export type PracticeManagementProvider = 
  | 'advyzon'
  | 'redtail'
  | 'salesforce'
  | 'wealthbox'
  | 'practifi'
  | 'ghl';

export interface IntegrationStatus {
  id: string;
  name: string;
  provider: PracticeManagementProvider;
  logoUrl: string;
  connected: boolean;
  lastSynced?: string;
  category: 'crm' | 'calendar' | 'recording' | 'document' | 'all';
}

export interface IntegrationFeature {
  name: string;
  supported: boolean;
  description: string;
}
