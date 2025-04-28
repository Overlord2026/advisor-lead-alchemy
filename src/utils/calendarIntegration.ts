
import { toast } from "@/utils/toast";

type CalendarProvider = 'google' | 'outlook' | 'salesforce' | 'advyzon' | 'redtail' | 'ical';

interface CalendarConnection {
  id: string;
  name: string;
  provider: CalendarProvider;
  connected: boolean;
  lastSynced?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  attendees?: string[];
  calendarId: string;
}

// Mock connected calendars for demo
const connectedCalendars: CalendarConnection[] = [
  {
    id: 'google-main',
    name: 'Google Calendar (Main)',
    provider: 'google',
    connected: true,
    lastSynced: '2025-04-28T08:45:00Z'
  }
];

// Mock calendar events
const calendarEvents: CalendarEvent[] = [
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

/**
 * Get all connected calendar providers
 */
export const getConnectedCalendars = (): CalendarConnection[] => {
  return connectedCalendars;
};

/**
 * Get calendar events for a specific date range
 */
export const getCalendarEvents = (
  startDate: Date,
  endDate: Date,
  calendarIds?: string[]
): CalendarEvent[] => {
  return calendarEvents.filter(event => {
    // Filter by date range
    const eventInRange = event.start >= startDate && event.start <= endDate;
    
    // Filter by calendar IDs if provided
    const calendarMatches = !calendarIds || calendarIds.length === 0 || 
                            (calendarIds && calendarIds.includes(event.calendarId));
    
    return eventInRange && calendarMatches;
  });
};

/**
 * Connect to a calendar provider
 */
export const connectCalendarProvider = async (
  provider: CalendarProvider,
  calendarName: string
): Promise<boolean> => {
  // In a real implementation, this would authenticate with the provider's API
  // For this demo, we'll simulate a successful connection
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a unique ID for this calendar
    const calendarId = `${provider}-${Date.now()}`;
    
    // Add the new calendar to our connected calendars
    connectedCalendars.push({
      id: calendarId,
      name: calendarName,
      provider,
      connected: true,
      lastSynced: new Date().toISOString()
    });
    
    toast.success(`Successfully connected to ${calendarName}`);
    return true;
  } catch (error) {
    console.error('Error connecting to calendar provider:', error);
    toast.error(`Failed to connect to ${provider}. Please try again.`);
    return false;
  }
};

/**
 * Disconnect a calendar provider
 */
export const disconnectCalendarProvider = async (calendarId: string): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the calendar index
    const calendarIndex = connectedCalendars.findIndex(cal => cal.id === calendarId);
    
    if (calendarIndex !== -1) {
      const calendarName = connectedCalendars[calendarIndex].name;
      
      // Remove the calendar
      connectedCalendars.splice(calendarIndex, 1);
      
      toast.success(`Successfully disconnected from ${calendarName}`);
      return true;
    } else {
      toast.error('Calendar not found');
      return false;
    }
  } catch (error) {
    console.error('Error disconnecting calendar provider:', error);
    toast.error('Failed to disconnect. Please try again.');
    return false;
  }
};

/**
 * Create a new calendar event
 */
export const createCalendarEvent = async (
  event: Omit<CalendarEvent, 'id'>
): Promise<CalendarEvent | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a unique ID for this event
    const eventId = `event-${Date.now()}`;
    
    // Create the new event
    const newEvent: CalendarEvent = {
      ...event,
      id: eventId
    };
    
    // Add the event to our events array
    calendarEvents.push(newEvent);
    
    toast.success('Event created successfully');
    return newEvent;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    toast.error('Failed to create event. Please try again.');
    return null;
  }
};

/**
 * Get available calendar providers
 */
export const getAvailableProviders = (): { id: CalendarProvider; name: string; logo: string }[] => {
  return [
    {
      id: 'google',
      name: 'Google Calendar',
      logo: '/google-calendar-logo.png' // Note: This would need to be added to public folder
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
      id: 'ical',
      name: 'iCalendar (ICS)',
      logo: '/ical-logo.png'
    }
  ];
};
