
import { CalendarConnection, CalendarEvent, ProviderInfo } from './types';

// Mock connected calendars for demo
export const connectedCalendars: CalendarConnection[] = [
  {
    id: 'google-main',
    name: 'Google Calendar (Main)',
    provider: 'google',
    connected: true,
    lastSynced: '2025-04-28T08:45:00Z'
  }
];

// Mock calendar events
export const calendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Client Meeting - Johnson Family',
    start: new Date('2025-04-29T10:00:00'),
    end: new Date('2025-04-29T11:30:00'),
    location: 'Virtual - Zoom',
    description: 'Initial consultation with the Johnson family to discuss retirement planning options',
    attendees: ['john.johnson@example.com', 'mary.johnson@example.com'],
    calendarId: 'google-main'
  },
  {
    id: 'event-2',
    title: 'Portfolio Review - Smith Estate',
    start: new Date('2025-04-29T14:00:00'),
    end: new Date('2025-04-29T15:00:00'),
    location: 'Office - Conference Room A',
    description: 'Quarterly portfolio review with the Smith family',
    attendees: ['robert.smith@example.com'],
    calendarId: 'google-main'
  },
  {
    id: 'event-3',
    title: 'Team Strategy Meeting',
    start: new Date('2025-04-30T09:00:00'),
    end: new Date('2025-04-30T10:30:00'),
    location: 'Office - Main Conference Room',
    description: 'Weekly team strategy meeting',
    calendarId: 'google-main'
  },
  {
    id: 'event-4',
    title: 'New Client Outreach Planning',
    start: new Date('2025-04-30T13:00:00'),
    end: new Date('2025-04-30T14:00:00'),
    location: 'Office - Personal Office',
    description: 'Planning session for Q2 client acquisition strategy',
    calendarId: 'google-main'
  },
  {
    id: 'event-5',
    title: 'Estate Planning Workshop Prep',
    start: new Date('2025-05-01T11:00:00'),
    end: new Date('2025-05-01T12:30:00'),
    location: 'Virtual - Teams',
    description: 'Preparation for upcoming estate planning workshop',
    calendarId: 'google-main'
  }
];

// Available calendar providers
export const availableProviders: ProviderInfo[] = [
  {
    id: 'google',
    name: 'Google Calendar',
    logo: '/google-calendar-logo.png'
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    logo: '/outlook-logo.png'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: '/salesforce-logo.png'
  },
  {
    id: 'advyzon',
    name: 'Advyzon',
    logo: '/advyzon-logo.png'
  },
  {
    id: 'redtail',
    name: 'Redtail CRM',
    logo: '/redtail-logo.png'
  },
  {
    id: 'ghl',
    name: 'Go High Level',
    logo: '/ghl-logo.png'
  },
  {
    id: 'ical',
    name: 'iCalendar (ICS)',
    logo: '/ical-logo.png'
  }
];
