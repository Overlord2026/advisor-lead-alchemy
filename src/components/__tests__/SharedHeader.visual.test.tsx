
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SharedHeader from "../SharedHeader";

// Mock the AppContext hook
jest.mock("@/contexts/AppContext", () => ({
  useApp: jest.fn(),
}));

const mockUseApp = require("@/contexts/AppContext").useApp;

describe("SharedHeader Visual Regression Tests", () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseApp.mockReturnValue({
      isMobile: false,
      toggleSidebar: jest.fn(),
    });
  });

  test("advisor header should render without errors", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/advisor"]}>
        <SharedHeader />
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
        <SharedHeader />
      </MemoryRouter>
    );
    
    // Basic assertion to ensure component renders
    expect(container.firstChild).toBeInTheDocument();
  });
});
