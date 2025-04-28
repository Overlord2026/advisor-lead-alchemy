
/**
 * Utility functions for formatting dates, currency and numbers
 */

/**
 * Format a date for display
 * @param date - The date to format
 * @param format - The format to use (short, medium, long)
 * @returns The formatted date string
 */
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' | 'time' | 'datetime' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
    case 'long':
      return dateObj.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'time':
      return dateObj.toLocaleTimeString(undefined, { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    case 'datetime':
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'medium':
    default:
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
  }
}

/**
 * Format a currency value for display
 * @param value - The value to format
 * @param currency - The currency code (USD, EUR, etc.)
 * @returns The formatted currency string
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency
  }).format(value);
}

/**
 * Format a number with appropriate suffixes (K, M, B)
 * @param value - The value to format
 * @param decimals - Number of decimal places
 * @returns The formatted number
 */
export function formatNumber(value: number, decimals: number = 1): string {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(decimals) + 'B';
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(decimals) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(decimals) + 'K';
  }
  return value.toFixed(decimals);
}
