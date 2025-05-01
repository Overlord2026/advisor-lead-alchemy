
/// <reference types="vite/client" />

// Add Jest matchers type extensions
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveTextContent(text: string | RegExp): R;
    toMatchImageSnapshot(options?: any): R;
  }
}

// Add window.matchMedia mock
interface Window {
  matchMedia: (query: string) => MediaQueryList;
}

// Define puppeteer types to fix build errors
declare module 'puppeteer' {
  export interface Browser {
    close(): Promise<void>;
    newPage(): Promise<Page>;
  }
  
  export interface Page {
    setViewport(options: { width: number; height: number }): Promise<void>;
    evaluateOnNewDocument(fn: Function): Promise<void>;
    goto(url: string): Promise<void>;
    waitForSelector(selector: string): Promise<void>;
    screenshot(options?: { fullPage?: boolean }): Promise<Buffer>;
    close(): Promise<void>;
  }
  
  export function launch(options?: any): Promise<Browser>;
}

