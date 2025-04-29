
import { IntegrationFeature, IntegrationStatus, PracticeManagementProvider } from "./types";

// Mock data for available practice management systems
export const availableIntegrations: IntegrationStatus[] = [
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
export const integrationFeaturesByProvider: Record<PracticeManagementProvider, IntegrationFeature[]> = {
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
