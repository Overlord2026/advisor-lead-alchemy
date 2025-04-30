
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
  matchMedia: ((query: string) => MediaQueryList) & ((query: string) => MediaQueryList);
}
