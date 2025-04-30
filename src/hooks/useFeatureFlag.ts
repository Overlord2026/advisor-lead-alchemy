
import { useFeatureFlags } from "@/contexts/FeatureFlagContext";
import { FeatureFlags } from "@/config/featureFlags";

/**
 * A hook to easily check if a specific feature is enabled
 * 
 * @param featureName - The name of the feature flag to check
 * @returns boolean - Whether the feature is enabled
 * 
 * @example
 * const isNewNavigationEnabled = useFeatureFlag('useNewNavigation');
 * 
 * if (isNewNavigationEnabled) {
 *   // Render new navigation
 * } else {
 *   // Render old navigation
 * }
 */
export const useFeatureFlag = (featureName: keyof FeatureFlags): boolean => {
  const { isFeatureEnabled } = useFeatureFlags();
  return isFeatureEnabled(featureName);
};

export default useFeatureFlag;
