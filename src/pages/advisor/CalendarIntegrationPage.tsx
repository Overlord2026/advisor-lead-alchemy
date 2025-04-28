
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, MapPin, Users, Plus, Check, CalendarDays, Calendar as CalendarIcon2, ChevronLeft, ChevronRight, Trash2, Settings, ExternalLink } from "lucide-react";
import { addDays, format, startOfWeek, endOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from "date-fns";
import { toast } from "@/utils/toast";
import {
  getConnectedCalendars,
  getCalendarEvents,
  connectCalendarProvider,
  getAvailableProviders,
  disconnectCalendarProvider,
  createCalendarEvent
} from "@/utils/calendarIntegration";

const CalendarIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState("view-calendar");
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [connectedCalendars, setConnectedCalendars] = useState<any[]>([]);
  const [availableProviders, setAvailableProviders] = useState<any[]>([]);
  const [isAddCalendarOpen, setIsAddCalendarOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    description: '',
    calendarId: ''
  });
  
  // Load calendar data
  useEffect(() => {
    const calendars = getConnectedCalendars();
    setConnectedCalendars(calendars);
    setSelectedCalendars(calendars.map(cal => cal.id));
    setAvailableProviders(getAvailableProviders());
    
    loadEvents();
  }, [currentDate, selectedCalendars]);
  
  const loadEvents = () => {
    let startDate, endDate;
    
    if (viewMode === 'month') {
      startDate = startOfMonth(currentDate);
      endDate = endOfMonth(currentDate);
    } else {
      startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
      endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
    }
    
    const calendarEvents = getCalendarEvents(startDate, endDate, selectedCalendars);
    setEvents(calendarEvents);
  };
  
  const handlePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    } else {
      setCurrentDate(prevDate => subWeeks(prevDate, 1));
    }
  };
  
  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    } else {
      setCurrentDate(prevDate => addWeeks(prevDate, 1));
    }
  };
  
  const handleAddCalendar = async (provider: string, name: string) => {
    // In a real app, this would integrate with the calendar provider's API
    const success = await connectCalendarProvider(provider as any, name);
    
    if (success) {
      // Refresh connected calendars
      setConnectedCalendars(getConnectedCalendars());
      setIsAddCalendarOpen(false);
    }
  };
  
  const handleRemoveCalendar = async (calendarId: string) => {
    const success = await disconnectCalendarProvider(calendarId);
    
    if (success) {
      // Refresh connected calendars and update selected calendars
      const updatedCalendars = getConnectedCalendars();
      setConnectedCalendars(updatedCalendars);
      setSelectedCalendars(prevSelected => 
        prevSelected.filter(id => id !== calendarId)
      );
    }
  };
  
  const handleCalendarToggle = (calendarId: string) => {
    setSelectedCalendars(prev => {
      if (prev.includes(calendarId)) {
        return prev.filter(id => id !== calendarId);
      } else {
        return [...prev, calendarId];
      }
    });
  };
  
  const handleCreateEvent = async () => {
    const { title, date, startTime, endTime, location, description, calendarId } = newEventData;
    
    if (!title || !date || !startTime || !endTime || !calendarId) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Convert date and time strings to Date objects
    const startDateTime = new Date(`${format(date, 'yyyy-MM-dd')}T${startTime}`);
    const endDateTime = new Date(`${format(date, 'yyyy-MM-dd')}T${endTime}`);
    
    const eventData = {
      title,
      start: startDateTime,
      end: endDateTime,
      location,
      description,
      calendarId
    };
    
    const newEvent = await createCalendarEvent(eventData);
    
    if (newEvent) {
      setIsAddEventOpen(false);
      // Reset form
      setNewEventData({
        title: '',
        date: new Date(),
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        description: '',
        calendarId: connectedCalendars[0]?.id || ''
      });
      
      // Reload events
      loadEvents();
    }
  };
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };
  
  const renderMonthCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <Button variant="outline" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
          <Button variant="outline" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="calendar-grid">
          {dayNames.map(day => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
          
          {dateRange.map((date, i) => {
            const dayEvents = events.filter(event => 
              isSameDay(parseISO(event.start.toString()), date)
            );
            
            const isToday = isSameDay(date, new Date());
            const isCurrMonth = isSameMonth(date, currentDate);
            
            return (
              <div 
                key={i} 
                className={`calendar-day ${!isCurrMonth ? 'calendar-other-month' : ''}`}
              >
                <div className="calendar-day-header">
                  {isToday ? (
                    <span className="calendar-date-today">{date.getDate()}</span>
                  ) : (
                    <span>{date.getDate()}</span>
                  )}
                </div>
                
                <div>
                  {dayEvents.slice(0, 3).map((event, eventIdx) => {
                    const colorClasses = [
                      'calendar-event-blue', 
                      'calendar-event-green', 
                      'calendar-event-purple', 
                      'calendar-event-yellow', 
                      'calendar-event-red'
                    ];
                    const colorClass = colorClasses[eventIdx % colorClasses.length];
                    
                    return (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div 
                            className={`calendar-event ${colorClass}`}
                            onClick={() => handleEventClick(event)}
                          >
                            {event.title}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="calendar-event-popover w-80">
                          <h4>{event.title}</h4>
                          <div className="calendar-event-popover-detail">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                            </span>
                          </div>
                          {event.location && (
                            <div className="calendar-event-popover-detail">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={() => handleEventClick(event)}
                          >
                            View Details
                          </Button>
                        </PopoverContent>
                      </Popover>
                    );
                  })}
                  
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      + {dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderWeekCalendar = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    const dateRange = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <Button variant="outline" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </h2>
          <Button variant="outline" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 p-4">
          {dateRange.map((date, i) => {
            const isToday = isSameDay(date, new Date());
            const dayEvents = events.filter(event => 
              isSameDay(parseISO(event.start.toString()), date)
            );
            
            return (
              <div key={i} className="border rounded-lg p-2">
                <div className={`text-center mb-2 font-medium ${isToday ? 'bg-primary text-primary-foreground rounded-md' : ''}`}>
                  <div>{format(date, 'E')}</div>
                  <div>{format(date, 'd')}</div>
                </div>
                
                <div className="space-y-2">
                  {dayEvents.map((event) => {
                    const colorClasses = [
                      'calendar-event-blue', 
                      'calendar-event-green', 
                      'calendar-event-purple', 
                      'calendar-event-yellow', 
                      'calendar-event-red'
                    ];
                    const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
                    
                    return (
                      <div 
                        key={event.id}
                        className={`calendar-event ${colorClass}`}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="text-xs font-medium">{format(new Date(event.start), 'h:mm a')}</div>
                        <div className="truncate">{event.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendar Integration</h1>
          <p className="text-muted-foreground">
            Connect and manage your calendars from various platforms
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsAddCalendarOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Connect Calendar
          </Button>
          <Button 
            onClick={() => setIsAddEventOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="view-calendar">View Calendar</TabsTrigger>
          <TabsTrigger value="manage-connections">Manage Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view-calendar" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'month' ? "default" : "outline"} 
                onClick={() => setViewMode('month')}
                size="sm"
              >
                Month
              </Button>
              <Button 
                variant={viewMode === 'week' ? "default" : "outline"} 
                onClick={() => setViewMode('week')}
                size="sm"
              >
                Week
              </Button>
            </div>
            
            <Button 
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
              size="sm"
            >
              Today
            </Button>
          </div>
          
          <div className="flex gap-4">
            <div className="w-2/3">
              {viewMode === 'month' ? renderMonthCalendar() : renderWeekCalendar()}
            </div>
            
            <div className="w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>My Calendars</CardTitle>
                  <CardDescription>
                    Select which calendars to display
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {connectedCalendars.length === 0 ? (
                    <div className="text-center py-6">
                      <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-2 text-lg font-medium">No calendars connected</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Connect a calendar to get started
                      </p>
                      <Button
                        onClick={() => setIsAddCalendarOpen(true)}
                        className="mt-4"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Connect Calendar
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {connectedCalendars.map(calendar => (
                        <div key={calendar.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`calendar-${calendar.id}`}
                              checked={selectedCalendars.includes(calendar.id)}
                              onChange={() => handleCalendarToggle(calendar.id)}
                              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={`calendar-${calendar.id}`} className="flex flex-col">
                              <span>{calendar.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {calendar.provider.charAt(0).toUpperCase() + calendar.provider.slice(1)}
                              </span>
                            </label>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveCalendar(calendar.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    Your schedule for the next few days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {events.length === 0 ? (
                    <div className="text-center py-6">
                      <CalendarIcon2 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        No upcoming events
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {events
                        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                        .slice(0, 5)
                        .map(event => (
                          <div 
                            key={event.id} 
                            className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleEventClick(event)}
                          >
                            <h4 className="font-medium truncate">{event.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>
                                {format(new Date(event.start), 'MMM d, h:mm a')}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                          </div>
                        ))
                      }
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="manage-connections" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProviders.map(provider => (
              <Card key={provider.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {provider.name}
                  </CardTitle>
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <img 
                      src={provider.logo} 
                      alt={provider.name} 
                      className="provider-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {connectedCalendars.some(cal => cal.provider === provider.id) ? (
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="connected-calendar-badge">
                          <Check className="h-3 w-3" />
                          Connected
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.info("Settings functionality coming soon!")}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => {
                            const calendarToRemove = connectedCalendars.find(cal => cal.provider === provider.id);
                            if (calendarToRemove) {
                              handleRemoveCalendar(calendarToRemove.id);
                            }
                          }}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your {provider.name} calendar to sync events.
                      </p>
                      
                      <Button 
                        className="w-full"
                        onClick={() => handleAddCalendar(provider.id, `${provider.name} Calendar`)}
                      >
                        Connect
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Connected Calendars</h3>
            
            {connectedCalendars.length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No calendars connected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect a calendar provider from the options above
                </p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4">Calendar Name</th>
                      <th className="text-left py-3 px-4">Provider</th>
                      <th className="text-left py-3 px-4">Last Synced</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connectedCalendars.map(calendar => (
                      <tr key={calendar.id} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{calendar.name}</td>
                        <td className="py-3 px-4">
                          {calendar.provider.charAt(0).toUpperCase() + calendar.provider.slice(1)}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {calendar.lastSynced ? format(new Date(calendar.lastSynced), 'MMM d, yyyy h:mm a') : 'Never'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toast.info("Settings functionality coming soon!")}
                            className="mr-2"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleRemoveCalendar(calendar.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Calendar Dialog */}
      <Dialog open={isAddCalendarOpen} onOpenChange={setIsAddCalendarOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Calendar</DialogTitle>
            <DialogDescription>
              Select a calendar provider to connect to your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            {availableProviders.map(provider => (
              <div
                key={provider.id}
                className="provider-card flex flex-col items-center space-y-3 p-4 cursor-pointer"
                onClick={() => handleAddCalendar(provider.id, `${provider.name} Calendar`)}
              >
                <img 
                  src={provider.logo} 
                  alt={provider.name} 
                  className="provider-logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <span className="text-sm font-medium">{provider.name}</span>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCalendarOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in your calendar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                id="eventTitle"
                placeholder="Enter event title"
                value={newEventData.title}
                onChange={(e) => setNewEventData({...newEventData, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="eventDate">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="eventDate"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newEventData.date ? format(newEventData.date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newEventData.date}
                    onSelect={(date) => date && setNewEventData({...newEventData, date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newEventData.startTime}
                  onChange={(e) => setNewEventData({...newEventData, startTime: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEventData.endTime}
                  onChange={(e) => setNewEventData({...newEventData, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location (optional)"
                value={newEventData.location}
                onChange={(e) => setNewEventData({...newEventData, location: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter description (optional)"
                value={newEventData.description}
                onChange={(e) => setNewEventData({...newEventData, description: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="calendarSelect">Calendar</Label>
              <select
                id="calendarSelect"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newEventData.calendarId}
                onChange={(e) => setNewEventData({...newEventData, calendarId: e.target.value})}
              >
                <option value="">Select a calendar</option>
                {connectedCalendars.map(cal => (
                  <option key={cal.id} value={cal.id}>{cal.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Event Detail Dialog */}
      <Dialog open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {format(new Date(selectedEvent.start), 'EEEE, MMMM d, yyyy')}
                    </p>
                    <p className="text-muted-foreground">
                      {format(new Date(selectedEvent.start), 'h:mm a')} - {format(new Date(selectedEvent.end), 'h:mm a')}
                    </p>
                  </div>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p>{selectedEvent.location}</p>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      {selectedEvent.attendees.map((attendee: string, index: number) => (
                        <p key={index} className="text-sm">{attendee}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEventDetailOpen(false)}>
                Close
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => toast.info("External calendar view not available in demo")}
              >
                <ExternalLink className="h-4 w-4" />
                Open in Calendar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CalendarIntegrationPage;
