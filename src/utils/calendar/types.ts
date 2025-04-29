
/**
 * Type definitions for calendar integrations
 */

export type CalendarProvider = 'google' | 'outlook' | 'salesforce' | 'advyzon' | 'redtail' | 'ical' | 'ghl';

export interface CalendarConnection {
  id: string;
  name: string;
  provider: CalendarProvider;
  connected: boolean;
  lastSynced?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  attendees?: string[];
  calendarId: string;
}

export interface ProviderInfo {
  id: CalendarProvider;
  name: string;
  logo: string;
}
