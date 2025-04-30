
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FeatureFlagToggler from "../FeatureFlagToggler";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";

// Mock the environment to be development
const originalNodeEnv = process.env.NODE_ENV;
beforeAll(() => {
  process.env.NODE_ENV = 'development';
});

afterAll(() => {
  process.env.NODE_ENV = originalNodeEnv;
});

describe("FeatureFlagToggler Component", () => {
  test("renders toggle button initially", () => {
    render(
      <FeatureFlagProvider>
        <FeatureFlagToggler />
      </FeatureFlagProvider>
    );

    expect(screen.getByTestId("feature-flag-toggle-button")).toBeInTheDocument();
    expect(screen.queryByTestId("feature-flag-panel")).not.toBeInTheDocument();
  });

  test("opens panel when toggle button is clicked", () => {
    render(
      <FeatureFlagProvider>
        <FeatureFlagToggler />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId("feature-flag-toggle-button"));
    expect(screen.getByTestId("feature-flag-panel")).toBeInTheDocument();
  });

  test("toggles feature flag when switch is clicked", () => {
    // We know the useNewNavigation flag is enabled by default
    render(
      <FeatureFlagProvider>
        <FeatureFlagToggler />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId("feature-flag-toggle-button"));
    
    // Get the useNewNavigation switch and verify it's initially on
    const featureFlag = screen.getByTestId("feature-flag-useNewNavigation");
    const initialBadge = featureFlag.querySelector(".bg-primary");
    expect(initialBadge).toBeTruthy();
    
    // Click the switch
    const switchElement = featureFlag.querySelector('button[role="switch"]');
    fireEvent.click(switchElement);
    
    // Verify the badge shows "Off" now
    const updatedBadge = featureFlag.querySelector(".border");
    expect(updatedBadge).toBeTruthy();
  });
});
