
import '@testing-library/jest-dom';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

// Add custom matcher for image snapshot testing
expect.extend({ toMatchImageSnapshot });

// Mock window.matchMedia for responsive design testing
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver
});

// Mock puppeteer for visual tests in Jest environment
jest.mock('puppeteer', () => ({
  launch: jest.fn().mockImplementation(() => ({
    newPage: jest.fn().mockImplementation(() => ({
      setViewport: jest.fn(),
      evaluateOnNewDocument: jest.fn(),
      goto: jest.fn(),
      waitForSelector: jest.fn(),
      screenshot: jest.fn().mockReturnValue(Buffer.from('mock-screenshot')),
      close: jest.fn(),
    })),
    close: jest.fn(),
  })),
}));
