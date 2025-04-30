
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SharedHeader from "../SharedHeader";
import { useApp } from "@/contexts/AppContext";

// Mock the AppContext hook
jest.mock("@/contexts/AppContext", () => ({
  useApp: jest.fn(),
}));

describe("SharedHeader Component", () => {
  // Setup default mocks
  beforeEach(() => {
    (useApp as jest.Mock).mockReturnValue({
      isMobile: false,
      toggleSidebar: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders advisor navigation items when portalType is advisor", () => {
    render(
      <MemoryRouter>
        <SharedHeader portalType="advisor" />
      </MemoryRouter>
    );
    
    // Check for advisor-specific navigation items
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Prospects")).toBeInTheDocument();
    expect(screen.getByText("ROI Tracker")).toBeInTheDocument();
  });

  test("renders client navigation items when portalType is client", () => {
    render(
      <MemoryRouter>
        <SharedHeader portalType="client" />
      </MemoryRouter>
    );
    
    // Check for client-specific navigation items
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Schedule")).toBeInTheDocument();
  });

  test("renders prospect navigation items when portalType is prospect", () => {
    render(
      <MemoryRouter>
        <SharedHeader portalType="prospect" />
      </MemoryRouter>
    );
    
    // Check for prospect-specific navigation items
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("renders home navigation items when portalType is home", () => {
    render(
      <MemoryRouter>
        <SharedHeader portalType="home" />
      </MemoryRouter>
    );
    
    // Check for home-specific navigation items
    expect(screen.getByText("Advisor Portal")).toBeInTheDocument();
    expect(screen.getByText("Client Portal")).toBeInTheDocument();
    expect(screen.getByText("Prospect Portal")).toBeInTheDocument();
  });

  test("renders mobile menu when isMobile is true", () => {
    (useApp as jest.Mock).mockReturnValue({
      isMobile: true,
      toggleSidebar: jest.fn(),
    });

    render(
      <MemoryRouter>
        <SharedHeader portalType="advisor" />
      </MemoryRouter>
    );
    
    // Check for mobile menu button
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  test("renders logo and title correctly", () => {
    render(
      <MemoryRouter>
        <SharedHeader portalType="advisor" logoText="Custom Title" />
      </MemoryRouter>
    );
    
    // Check for logo and custom title
    expect(screen.getByAltText("Boutique Family Office")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  test("uses default logo text when not provided", () => {
    render(
      <MemoryRouter>
        <SharedHeader portalType="advisor" />
      </MemoryRouter>
    );
    
    expect(screen.getByText("Boutique Family Office")).toBeInTheDocument();
  });

  test("uses custom navigation items when provided", () => {
    const customNavItems = [
      { label: "Custom Item 1", path: "/custom1" },
      { label: "Custom Item 2", path: "/custom2" },
    ];

    render(
      <MemoryRouter>
        <SharedHeader portalType="advisor" navItems={customNavItems} />
      </MemoryRouter>
    );
    
    expect(screen.getByText("Custom Item 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });
});
