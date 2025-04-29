
/**
 * Re-export all calendar integration functionality from modularized files
 * This maintains backward compatibility with existing imports
 */

export * from './calendar/types';
export * from './calendar/calendarManagement';
export * from './calendar/ghlIntegration';
export { availableProviders, connectedCalendars, calendarEvents } from './calendar/mockData';
