
// Define the feature flag interface
export interface FeatureFlags {
  // Navigation features
  useNewNavigation: boolean;
  useRoleBasedNavigation: boolean;
  
  // Shared components
  useSharedHeader: boolean;
  useNewLayoutStructure: boolean;
  
  // Application features
  enableAdvisorFeatures: boolean;
  
  // UI/UX improvements
  enableNewDashboard: boolean;
  enableResponsiveDesign: boolean;
  
  // Integration features
  enableDataSharingBetweenApps: boolean;
  
  // Testing features
  debugMode: boolean;
}

// Define the default state of feature flags
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  // Navigation features - enabled by default
  useNewNavigation: true,
  useRoleBasedNavigation: true,
  
  // Shared components - enabled by default
  useSharedHeader: true,
  useNewLayoutStructure: true,
  
  // Application features - only advisor features enabled
  enableAdvisorFeatures: true,
  
  // UI/UX improvements - disabled by default (for gradual rollout)
  enableNewDashboard: false,
  enableResponsiveDesign: true,
  
  // Integration features - disabled by default (for testing)
  enableDataSharingBetweenApps: false,
  
  // Testing features - disabled by default
  debugMode: false,
};

// Environment-specific overrides
export const getEnvironmentFlags = (): Partial<FeatureFlags> => {
  return {};
};
