
import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_FEATURE_FLAGS, FeatureFlags } from "@/config/featureFlags";

interface FeatureFlagContextType {
  features: FeatureFlags;
  isFeatureEnabled: (featureName: keyof FeatureFlags) => boolean;
  toggleFeature: (featureName: keyof FeatureFlags) => void;
  setFeatureState: (featureName: keyof FeatureFlags, state: boolean) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<FeatureFlags>(DEFAULT_FEATURE_FLAGS);

  // Clear ALL cached feature flags and load fresh defaults
  useEffect(() => {
    // First clear the entire cached flags
    localStorage.removeItem("feature-flags");
    
    // Force advisor-only features
    const advisorOnlyFlags: FeatureFlags = {
      ...DEFAULT_FEATURE_FLAGS,
      enableAdvisorFeatures: true,
    };
    
    setFeatures(advisorOnlyFlags);
    localStorage.setItem("feature-flags", JSON.stringify(advisorOnlyFlags));
  }, []);

  const isFeatureEnabled = (featureName: keyof FeatureFlags) => {
    // Special case: always enable advisor features, never enable client features
    if (featureName === "enableAdvisorFeatures") return true;
    
    return features[featureName] || false;
  };

  const toggleFeature = (featureName: keyof FeatureFlags) => {
    // Prevent toggling advisor features off
    if (featureName === "enableAdvisorFeatures") return;
    
    setFeatures(prevFlags => {
      const newFlags = {
        ...prevFlags,
        [featureName]: !prevFlags[featureName]
      };
      localStorage.setItem("feature-flags", JSON.stringify(newFlags));
      return newFlags;
    });
  };

  const setFeatureState = (featureName: keyof FeatureFlags, state: boolean) => {
    // Prevent setting advisor features to false
    if (featureName === "enableAdvisorFeatures" && !state) return;
    
    setFeatures(prevFlags => {
      const newFlags = {
        ...prevFlags,
        [featureName]: state
      };
      localStorage.setItem("feature-flags", JSON.stringify(newFlags));
      return newFlags;
    });
  };

  return (
    <FeatureFlagContext.Provider 
      value={{ 
        features, 
        isFeatureEnabled, 
        toggleFeature, 
        setFeatureState 
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagProvider");
  }
  return context;
};
