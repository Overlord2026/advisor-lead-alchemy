
import { toast } from "@/utils/toast";
import { availableIntegrations } from "./data";
import { PracticeManagementProvider } from "./types";

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
