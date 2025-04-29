
import { toast } from "../toast";
import { CalendarConnection, CalendarEvent, CalendarProvider } from "./types";
import { calendarEvents, connectedCalendars, availableProviders } from "./mockData";

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
export const getAvailableProviders = () => {
  // Import directly from mockData instead of using require()
  return availableProviders;
};
