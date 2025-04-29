
import { toast } from "@/utils/toast";

export type PracticeManagementProvider = 
  | 'advyzon'
  | 'redtail'
  | 'salesforce'
  | 'wealthbox'
  | 'practifi'
  | 'ghl';

interface IntegrationStatus {
  id: string;
  name: string;
  provider: PracticeManagementProvider;
  logoUrl: string;
  connected: boolean;
  lastSynced?: string;
  category: 'crm' | 'calendar' | 'recording' | 'document' | 'all';
}

interface IntegrationFeature {
  name: string;
  supported: boolean;
  description: string;
}

// Mock data for available practice management systems
const availableIntegrations: IntegrationStatus[] = [
  {
    id: 'advyzon-1',
    name: 'Advyzon',
    provider: 'advyzon',
    logoUrl: '/advyzon-logo.png',
    connected: false,
    category: 'all'
  },
  {
    id: 'redtail-1',
    name: 'Redtail CRM',
    provider: 'redtail',
    logoUrl: '/redtail-logo.png',
    connected: false,
    category: 'crm'
  },
  {
    id: 'salesforce-1',
    name: 'Salesforce',
    provider: 'salesforce',
    logoUrl: '/salesforce-logo.png',
    connected: false,
    category: 'crm'
  },
  {
    id: 'wealthbox-1',
    name: 'Wealthbox',
    provider: 'wealthbox',
    logoUrl: '/wealthbox-logo.png',
    connected: false,
    category: 'crm'
  },
  {
    id: 'practifi-1',
    name: 'Practifi',
    provider: 'practifi',
    logoUrl: '/practifi-logo.png',
    connected: false,
    category: 'crm'
  },
  {
    id: 'ghl-1',
    name: 'Go High Level',
    provider: 'ghl',
    logoUrl: '/ghl-logo.png',
    connected: true,
    lastSynced: '2025-04-28T15:30:00Z',
    category: 'all'
  }
];

// Integration features by provider
const integrationFeaturesByProvider: Record<PracticeManagementProvider, IntegrationFeature[]> = {
  advyzon: [
    { name: 'Client Data Sync', supported: true, description: 'Sync client profiles and account information' },
    { name: 'Document Sharing', supported: true, description: 'Share documents between platforms' },
    { name: 'Portfolio Import', supported: true, description: 'Import portfolio data for analysis' },
    { name: 'Recording Integration', supported: true, description: 'Store meeting recordings with client profiles' },
    { name: 'Task Management', supported: true, description: 'Create and manage tasks across platforms' }
  ],
  redtail: [
    { name: 'Client Data Sync', supported: true, description: 'Sync client profiles and contact information' },
    { name: 'Document Sharing', supported: true, description: 'Share documents between platforms' },
    { name: 'Task Management', supported: true, description: 'Create and manage tasks across platforms' },
    { name: 'Recording Integration', supported: false, description: 'Store meeting recordings with client profiles' },
    { name: 'Portfolio Import', supported: false, description: 'Import portfolio data for analysis' }
  ],
  salesforce: [
    { name: 'Client Data Sync', supported: true, description: 'Sync client profiles and contact information' },
    { name: 'Task Management', supported: true, description: 'Create and manage tasks across platforms' },
    { name: 'Opportunity Tracking', supported: true, description: 'Track sales opportunities' },
    { name: 'Document Sharing', supported: true, description: 'Share documents between platforms' },
    { name: 'Custom Workflow', supported: true, description: 'Create custom automation workflows' }
  ],
  wealthbox: [
    { name: 'Client Data Sync', supported: true, description: 'Sync client profiles and contact information' },
    { name: 'Task Management', supported: true, description: 'Create and manage tasks across platforms' },
    { name: 'Document Sharing', supported: true, description: 'Share documents between platforms' },
    { name: 'Recording Integration', supported: true, description: 'Store meeting recordings with client profiles' },
    { name: 'Project Management', supported: true, description: 'Manage client-related projects' }
  ],
  practifi: [
    { name: 'Client Data Sync', supported: true, description: 'Sync client profiles and contact information' },
    { name: 'Task Management', supported: true, description: 'Create and manage tasks across platforms' },
    { name: 'Team Collaboration', supported: true, description: 'Collaborate with team members' },
    { name: 'Document Sharing', supported: false, description: 'Share documents between platforms' },
    { name: 'Recording Integration', supported: false, description: 'Store meeting recordings with client profiles' }
  ],
  ghl: [
    { name: 'Lead Generation', supported: true, description: 'Capture and manage leads' },
    { name: 'Calendar Integration', supported: true, description: 'Sync calendar and appointments' },
    { name: 'Email Campaigns', supported: true, description: 'Run email marketing campaigns' },
    { name: 'SMS Campaigns', supported: true, description: 'Run SMS marketing campaigns' },
    { name: 'Funnel Builder', supported: true, description: 'Create marketing funnels' }
  ]
};

/**
 * Get all available integrations
 */
export const getAvailableIntegrations = (category?: 'crm' | 'calendar' | 'recording' | 'document' | 'all'): IntegrationStatus[] => {
  if (category) {
    return availableIntegrations.filter(integration => 
      integration.category === category || integration.category === 'all'
    );
  }
  return availableIntegrations;
};

/**
 * Get integration features for a specific provider
 */
export const getIntegrationFeatures = (provider: PracticeManagementProvider): IntegrationFeature[] => {
  return integrationFeaturesByProvider[provider] || [];
};

/**
 * Connect to a practice management provider
 */
export const connectProvider = async (
  provider: PracticeManagementProvider,
  credentials: Record<string, string>
): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Find the provider in our list
    const integrationIndex = availableIntegrations.findIndex(i => i.provider === provider);
    
    if (integrationIndex !== -1) {
      // Update the connection status
      availableIntegrations[integrationIndex].connected = true;
      availableIntegrations[integrationIndex].lastSynced = new Date().toISOString();
      
      toast.success(`Successfully connected to ${availableIntegrations[integrationIndex].name}`);
      return true;
    }
    
    toast.error(`Provider ${provider} not found`);
    return false;
  } catch (error) {
    console.error('Error connecting to provider:', error);
    toast.error(`Failed to connect to ${provider}. Please try again.`);
    return false;
  }
};

/**
 * Disconnect from a practice management provider
 */
export const disconnectProvider = async (providerId: string): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the provider in our list
    const integrationIndex = availableIntegrations.findIndex(i => i.id === providerId);
    
    if (integrationIndex !== -1) {
      const providerName = availableIntegrations[integrationIndex].name;
      
      // Update the connection status
      availableIntegrations[integrationIndex].connected = false;
      availableIntegrations[integrationIndex].lastSynced = undefined;
      
      toast.success(`Successfully disconnected from ${providerName}`);
      return true;
    }
    
    toast.error('Provider not found');
    return false;
  } catch (error) {
    console.error('Error disconnecting provider:', error);
    toast.error('Failed to disconnect. Please try again.');
    return false;
  }
};

/**
 * Sync data with a practice management provider
 */
export const syncProviderData = async (
  providerId: string,
  dataType: 'clients' | 'documents' | 'tasks' | 'portfolios' | 'all'
): Promise<number> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find the provider
    const integration = availableIntegrations.find(i => i.id === providerId);
    
    if (!integration || !integration.connected) {
      toast.error('Provider not connected. Please connect first.');
      return 0;
    }
    
    // Mock successful sync of random number of items
    const itemCount = Math.floor(Math.random() * 20) + 5;
    
    // Update last synced timestamp
    integration.lastSynced = new Date().toISOString();
    
    toast.success(`Successfully synced ${itemCount} ${dataType} from ${integration.name}`);
    return itemCount;
  } catch (error) {
    console.error('Error syncing data:', error);
    toast.error('Failed to sync data. Please try again.');
    return 0;
  }
};
