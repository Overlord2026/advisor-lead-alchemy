import React from "react";
import { useFeatureFlags } from "@/contexts/FeatureFlagContext";
import { FeatureFlags } from "@/config/featureFlags";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
const FeatureFlagToggler = () => {
  const {
    features,
    toggleFeature
  } = useFeatureFlags();
  const [isVisible, setIsVisible] = React.useState(false);

  // Only show in development or when debug mode is enabled
  if (process.env.NODE_ENV !== 'development' && !features.debugMode) {
    return null;
  }
  const featureEntries = Object.entries(features) as [keyof FeatureFlags, boolean][];
  if (!isVisible) {
    return;
  }
  return <Card className="fixed bottom-4 right-4 p-4 shadow-xl w-80 max-h-[80vh] overflow-auto z-50" data-testid="feature-flag-panel">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Feature Flags</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700" aria-label="Close feature flag panel">
          <X size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        {featureEntries.map(([feature, enabled]) => <div key={feature} className="flex items-center justify-between py-2 border-b border-gray-100" data-testid={`feature-flag-${feature}`}>
            <div>
              <span className="text-sm font-medium">{formatFeatureName(feature)}</span>
              <Badge variant={enabled ? "default" : "outline"} className="ml-2">
                {enabled ? "On" : "Off"}
              </Badge>
            </div>
            <Switch checked={enabled} onCheckedChange={() => toggleFeature(feature)} aria-label={`Toggle ${feature}`} />
          </div>)}
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        These settings are saved to local storage and will persist across page refreshes.
      </p>
    </Card>;
};

// Helper function to format feature flag names for display
const formatFeatureName = (feature: string): string => {
  return feature.replace(/([A-Z])/g, ' $1') // Add space before capital letters
  .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
};
export default FeatureFlagToggler;