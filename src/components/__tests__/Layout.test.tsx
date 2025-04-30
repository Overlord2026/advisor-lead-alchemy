
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../Layout";
import SharedHeader from "../SharedHeader";
import { useApp } from "@/contexts/AppContext";

// Mock the dependencies
jest.mock("@/contexts/AppContext", () => ({
  useApp: jest.fn(),
}));

jest.mock("../SharedHeader", () => jest.fn());

jest.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar">{children}</div>,
  SidebarContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-content">{children}</div>,
  SidebarGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group">{children}</div>,
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group-content">{children}</div>,
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group-label">{children}</div>,
  SidebarHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-header">{children}</div>,
  SidebarMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu">{children}</div>,
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu-button">{children}</div>,
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu-item">{children}</div>,
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-provider">{children}</div>,
  SidebarTrigger: () => <div data-testid="sidebar-trigger">Trigger</div>,
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

jest.mock("@/components/NotificationCenter", () => ({
  NotificationCenter: () => <div data-testid="notification-center">Notifications</div>,
}));

// Mock ADVISOR_NAV_ITEMS
jest.mock("@/constants/navigation", () => ({
  ADVISOR_NAV_ITEMS: [
    { label: "Dashboard", path: "/advisor", icon: () => <span>DashboardIcon</span> },
    { label: "Prospects", path: "/advisor/prospects", icon: () => <span>ProspectsIcon</span> },
  ],
}));

describe("Layout Component Integration", () => {
  beforeEach(() => {
    (useApp as jest.Mock).mockReturnValue({
      toggleSidebar: jest.fn(),
      isMobile: false,
    });
    
    (SharedHeader as jest.Mock).mockImplementation(({ portalType }) => {
      return <div data-testid="mocked-shared-header" data-portal-type={portalType}>Mocked SharedHeader</div>;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with all required components", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div data-testid="test-content">Test Content</div>
        </Layout>
      </MemoryRouter>
    );
    
    // Check for SharedHeader with advisor portal type
    const sharedHeader = screen.getByTestId("mocked-shared-header");
    expect(sharedHeader).toBeInTheDocument();
    expect(sharedHeader).toHaveAttribute("data-portal-type", "advisor");
    
    // Check for child content
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toHaveTextContent("Test Content");
    
    // Check for sidebar components
    expect(screen.getByTestId("sidebar-provider")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
  });

  test("properly passes props to SharedHeader", () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    );
    
    expect(SharedHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        portalType: "advisor"
      }),
      expect.anything()
    );
  });
});
