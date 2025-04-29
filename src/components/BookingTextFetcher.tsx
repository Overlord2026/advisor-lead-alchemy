
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Define the available connectors
const connectors = [
  { value: 'gmail', label: 'Gmail' },
  { value: 'outlook', label: 'Outlook' },
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'advizon', label: 'Advyzon' },
  { value: 'wealthfront', label: 'Wealthfront' },
  { value: 'googleCalendar', label: 'Google Calendar' },
  { value: 'office365Calendar', label: 'Office 365 Calendar' }
];

const BookingTextFetcher = () => {
  const [connector, setConnector] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookingText, setBookingText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingText = async () => {
    if (!connector) {
      toast.error("Please select a connector");
      return;
    }
    
    if (!searchQuery) {
      toast.error("Please enter a search query");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-booking', {
        body: {
          connector,
          searchQuery
        }
      });
      
      if (error) {
        console.error('Error fetching booking text:', error);
        setError(error.message || 'Failed to fetch booking text');
        toast.error('Failed to fetch booking text');
      } else if (data) {
        setBookingText(data.bookingText || '');
        toast.success('Booking text retrieved successfully');
      }
    } catch (err) {
      console.error('Exception fetching booking text:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast.error('An error occurred while fetching booking text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookingText();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Booking Text Fetcher</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="connector" className="text-sm font-medium">Connector</label>
            <Select 
              value={connector} 
              onValueChange={setConnector}
            >
              <SelectTrigger id="connector" className="w-full">
                <SelectValue placeholder="Select a connector" />
              </SelectTrigger>
              <SelectContent>
                {connectors.map((conn) => (
                  <SelectItem key={conn.value} value={conn.value}>
                    {conn.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="searchQuery" className="text-sm font-medium">Search Query</label>
            <Input 
              id="searchQuery"
              placeholder="e.g., subject:Second Opinion Service Call"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              'Fetch Booking Text'
            )}
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
            {error}
          </div>
        )}
        
        {bookingText && (
          <div className="mt-6">
            <h3 className="font-medium text-lg mb-2">Booking Text</h3>
            <Textarea 
              value={bookingText}
              readOnly
              className="min-h-[200px] font-mono text-sm"
              rows={10}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        This utility fetches booking text from various connectors in a standardized format.
      </CardFooter>
    </Card>
  );
};

export default BookingTextFetcher;
