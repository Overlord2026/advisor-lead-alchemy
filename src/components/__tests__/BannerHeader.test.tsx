
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BannerHeader from "../BannerHeader";
import SharedHeader from "../SharedHeader";

// Mock the SharedHeader component
jest.mock("../SharedHeader", () => jest.fn());

describe("BannerHeader Component Integration", () => {
  beforeEach(() => {
    (SharedHeader as jest.Mock).mockImplementation(({ portalType }) => {
      return <div data-testid="mocked-shared-header" data-portal-type={portalType}>Mocked SharedHeader</div>;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SharedHeader with advisor portal type", () => {
    render(
      <MemoryRouter>
        <BannerHeader />
      </MemoryRouter>
    );
    
    const sharedHeader = screen.getByTestId("mocked-shared-header");
    expect(sharedHeader).toBeInTheDocument();
    expect(sharedHeader).toHaveAttribute("data-portal-type", "advisor");
  });

  test("correctly passes props to SharedHeader", () => {
    render(
      <MemoryRouter>
        <BannerHeader />
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
