
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SharedHeader from "../SharedHeader";

// Mock the AppContext hook
jest.mock("@/contexts/AppContext", () => ({
  useApp: jest.fn(),
}));

// Mock the useFeatureFlag hook
jest.mock("@/hooks/useFeatureFlag", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseApp = require("@/contexts/AppContext").useApp;
const mockUseFeatureFlag = require("@/hooks/useFeatureFlag").default;

describe("SharedHeader Visual Regression Tests", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseApp.mockReturnValue({
      isMobile: false,
      toggleSidebar: jest.fn(),
    });
    
    mockUseFeatureFlag.mockReturnValue(true);
  });

  test("advisor header should render without errors", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/advisor"]}>
        <SharedHeader portalType="advisor" />
      </MemoryRouter>
    );
    
    // Basic assertion to ensure component renders
    expect(container.firstChild).toBeInTheDocument();
  });
  
  test("mobile header should render without errors", () => {
    // Mock mobile environment
    mockUseApp.mockReturnValue({
      isMobile: true,
      toggleSidebar: jest.fn(),
    });
    
    const { container } = render(
      <MemoryRouter initialEntries={["/advisor"]}>
        <SharedHeader portalType="advisor" />
      </MemoryRouter>
    );
    
    // Basic assertion to ensure component renders
    expect(container.firstChild).toBeInTheDocument();
  });
});
