
import { availableIntegrations } from "./data";
import { IntegrationFeature, IntegrationStatus, PracticeManagementProvider } from "./types";
import { integrationFeaturesByProvider } from "./data";

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
