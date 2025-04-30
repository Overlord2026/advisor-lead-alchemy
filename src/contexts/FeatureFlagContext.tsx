
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

  // Load any persisted feature flag overrides from local storage on init
  useEffect(() => {
    const persistedFlags = localStorage.getItem("feature-flags");
    if (persistedFlags) {
      try {
        const parsedFlags = JSON.parse(persistedFlags);
        setFeatures(prevFlags => ({
          ...prevFlags,
          ...parsedFlags
        }));
      } catch (error) {
        console.error("Failed to parse persisted feature flags", error);
        localStorage.removeItem("feature-flags");
      }
    }
  }, []);

  // Persist feature flag changes to local storage
  useEffect(() => {
    localStorage.setItem("feature-flags", JSON.stringify(features));
  }, [features]);

  const isFeatureEnabled = (featureName: keyof FeatureFlags) => {
    return features[featureName] || false;
  };

  const toggleFeature = (featureName: keyof FeatureFlags) => {
    setFeatures(prevFlags => ({
      ...prevFlags,
      [featureName]: !prevFlags[featureName]
    }));
  };

  const setFeatureState = (featureName: keyof FeatureFlags, state: boolean) => {
    setFeatures(prevFlags => ({
      ...prevFlags,
      [featureName]: state
    }));
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
