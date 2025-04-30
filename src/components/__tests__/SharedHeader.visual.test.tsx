
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import puppeteer from "puppeteer";
import SharedHeader from "../SharedHeader";
import { useApp } from "@/contexts/AppContext";

// Mock the AppContext hook
jest.mock("@/contexts/AppContext", () => ({
  useApp: jest.fn(),
}));

describe("SharedHeader Visual Regression Tests", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 });
    
    // Mock useApp for the browser environment
    await page.evaluateOnNewDocument(() => {
      (window as any).useApp = () => ({
        isMobile: false,
        toggleSidebar: () => {},
      });
    });
  });
  
  afterAll(async () => {
    await browser.close();
  });

  test("advisor header should visually match snapshot", async () => {
    // Navigate to test page with advisor header
    await page.goto("http://localhost:3000/advisor");
    
    // Wait for header to render
    await page.waitForSelector("[data-testid='shared-header-advisor']");
    
    // Take screenshot
    const screenshot = await page.screenshot();
    
    // Compare with baseline
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotsDir: "__image_snapshots__/advisor",
      customSnapshotIdentifier: "advisor-header",
    });
  });
  
  test("client header should visually match snapshot", async () => {
    // Navigate to test page with client header
    await page.goto("http://localhost:3000/client");
    
    // Wait for header to render
    await page.waitForSelector("[data-testid='shared-header-client']");
    
    // Take screenshot
    const screenshot = await page.screenshot();
    
    // Compare with baseline
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotsDir: "__image_snapshots__/client",
      customSnapshotIdentifier: "client-header",
    });
  });

  test("mobile header should visually match snapshot", async () => {
    // Set mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    
    // Mock mobile environment
    await page.evaluateOnNewDocument(() => {
      (window as any).useApp = () => ({
        isMobile: true,
        toggleSidebar: () => {},
      });
    });
    
    // Navigate to test page
    await page.goto("http://localhost:3000/advisor");
    
    // Wait for header to render
    await page.waitForSelector("[data-testid='shared-header-advisor']");
    
    // Take screenshot
    const screenshot = await page.screenshot();
    
    // Compare with baseline
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotsDir: "__image_snapshots__/mobile",
      customSnapshotIdentifier: "mobile-header",
    });
  });
});
