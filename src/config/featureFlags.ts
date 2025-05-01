
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

// Define the default state of feature flags - ensure advisor features are enabled
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  // Navigation features - enabled by default
  useNewNavigation: true,
  useRoleBasedNavigation: true,
  
  // Shared components - enabled by default
  useSharedHeader: true,
  useNewLayoutStructure: true,
  
  // Application features - only advisor features enabled
  enableAdvisorFeatures: true,
  
  // UI/UX improvements
  enableNewDashboard: false,
  enableResponsiveDesign: true,
  
  // Integration features
  enableDataSharingBetweenApps: false,
  
  // Testing features
  debugMode: false,
};

// Environment-specific overrides - ensure advisor features are enabled
export const getEnvironmentFlags = (): Partial<FeatureFlags> => {
  return {
    enableAdvisorFeatures: true,
  };
};
