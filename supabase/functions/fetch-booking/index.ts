
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define supported connectors
type Connector = 'gmail' | 'outlook' | 'salesforce' | 'advizon' | 'wealthfront' | 'office365Calendar' | 'googleCalendar';

// Interface for the request payload
interface FetchBookingRequest {
  connector: Connector;
  searchQuery: string;
}

// Interface for the response
interface FetchBookingResponse {
  bookingText: string;
}

// Mock connector adapters (in a real implementation, these would connect to actual APIs)
const connectorAdapters = {
  // Email connectors
  gmail: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Gmail with query: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return `Invitee: John Smith
Email: john.smith@example.com
Time: April 30, 2025 at 2:00 PM EST
Location: Zoom
Zoom link: https://zoom.us/j/123456789
Phone: (555) 123-4567
Goals: Retirement planning and portfolio review
Assets: $750,000
Notes: First time meeting, referred by Jane Doe`;
  },
  
  outlook: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Outlook with query: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return `Invitee: Sarah Johnson
Email: sarah.j@example.com
Time: May 2, 2025 at 11:30 AM EST
Location: Zoom
Zoom link: https://zoom.us/j/987654321
Phone: (555) 987-6543
Goals: College funding for children
Assets: $425,000
Notes: Has two children ages 12 and 15`;
  },
  
  // CRM connectors
  salesforce: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Salesforce with query: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In this case, Salesforce returns JSON which we convert to the standard format
    const sfResponse = {
      contactName: "Michael Brown",
      contactEmail: "mbrown@example.com",
      appointmentDateTime: "2025-05-05T15:00:00-04:00",
      meetingPlatform: "Teams",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/123456789",
      contactPhone: "5551237890",
      opportunityType: "Retirement Planning",
      aum: 825000,
      additionalNotes: "Looking to review current retirement strategy"
    };
    
    // Format response to match the standard format
    return `Invitee: ${sfResponse.contactName}
Email: ${sfResponse.contactEmail}
Time: ${new Date(sfResponse.appointmentDateTime).toLocaleString()}
Location: ${sfResponse.meetingPlatform}
Zoom link: ${sfResponse.meetingLink}
Phone: ${sfResponse.contactPhone}
Goals: ${sfResponse.opportunityType}
Assets: $${sfResponse.aum.toLocaleString()}
Notes: ${sfResponse.additionalNotes}`;
  },
  
  // Financial advisor platforms
  advizon: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Advizon with query: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    // Advizon returns a different format that we normalize
    const advyzonResponse = {
      client: {
        name: "Robert Garcia",
        emailAddress: "rgarcia@example.com",
        phoneNumber: "5559871234"
      },
      appointment: {
        startTime: "2025-05-10T10:00:00-04:00",
        meetingType: "Virtual",
        conferenceDetails: {
          provider: "Zoom",
          link: "https://zoom.us/j/12345678901"
        }
      },
      portfolioValue: 1250000,
      clientGoals: ["Tax planning", "Estate planning"],
      advisorNotes: "Annual review meeting, prepare tax loss harvesting recommendations"
    };
    
    return `Invitee: ${advyzonResponse.client.name}
Email: ${advyzonResponse.client.emailAddress}
Time: ${new Date(advyzonResponse.appointment.startTime).toLocaleString()}
Location: ${advyzonResponse.appointment.conferenceDetails.provider}
Zoom link: ${advyzonResponse.appointment.conferenceDetails.link}
Phone: ${advyzonResponse.client.phoneNumber}
Goals: ${advyzonResponse.clientGoals.join(", ")}
Assets: $${advyzonResponse.portfolioValue.toLocaleString()}
Notes: ${advyzonResponse.advisorNotes}`;
  },
  
  wealthfront: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Wealthfront with query: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 850));
    
    // Wealthfront returns XML-like data that we normalize
    const wfData = `
      <meeting>
        <prospect>
          <name>Elizabeth Wilson</name>
          <email>ewilson@example.com</email>
          <phone>(555) 456-7890</phone>
        </prospect>
        <schedule>
          <date>2025-05-15</date>
          <time>13:45:00</time>
          <timezone>America/New_York</timezone>
        </schedule>
        <virtualMeeting>
          <provider>Zoom</provider>
          <url>https://zoom.us/j/9876543210</url>
        </virtualMeeting>
        <investmentInfo>
          <investableAssets>980000</investableAssets>
          <primaryObjective>Sustainable retirement income</primaryObjective>
        </investmentInfo>
        <comments>Concerned about market volatility, seeking stable income options</comments>
      </meeting>
    `;
    
    // In a real implementation, we'd parse the XML properly
    // For this mock, we'll simulate the parsed data
    
    return `Invitee: Elizabeth Wilson
Email: ewilson@example.com
Time: May 15, 2025 at 1:45 PM EST
Location: Zoom
Zoom link: https://zoom.us/j/9876543210
Phone: (555) 456-7890
Goals: Sustainable retirement income
Assets: $980,000
Notes: Concerned about market volatility, seeking stable income options`;
  },
  
  // Calendar connectors
  googleCalendar: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Google Calendar with query or ID: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 650));
    
    return `Invitee: David Lee
Email: dlee@example.com
Time: May 8, 2025 at 3:30 PM EST
Location: Zoom
Zoom link: https://zoom.us/j/123498765
Phone: (555) 234-5678
Goals: Investment review and rebalancing
Assets: $550,000
Notes: Current client, quarterly review meeting`;
  },
  
  office365Calendar: async (searchQuery: string): Promise<string> => {
    console.log(`Searching Office 365 Calendar with query or ID: ${searchQuery}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return `Invitee: Patricia Martinez
Email: pmartinez@example.com
Time: May 12, 2025 at 10:15 AM EST
Location: Zoom
Zoom link: https://zoom.us/j/567891234
Phone: (555) 345-6789
Goals: Retirement planning and long-term care
Assets: $875,000
Notes: New prospect, interested in estate planning as well`;
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { connector, searchQuery } = await req.json() as FetchBookingRequest;
    
    console.log(`Processing booking fetch request for connector: ${connector}`);
    
    // Validate input
    if (!connector) {
      return new Response(
        JSON.stringify({ error: "connector parameter is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!searchQuery) {
      return new Response(
        JSON.stringify({ error: "searchQuery parameter is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if the connector is supported
    if (!connectorAdapters[connector as keyof typeof connectorAdapters]) {
      return new Response(
        JSON.stringify({ error: `Connector "${connector}" is not supported` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Call the appropriate connector adapter
    const adapter = connectorAdapters[connector as keyof typeof connectorAdapters];
    const bookingText = await adapter(searchQuery);
    
    // Return the booking text in the standardized format
    const response: FetchBookingResponse = {
      bookingText
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in fetch-booking function:', error);
    return new Response(JSON.stringify({
      error: `Error processing fetch booking request: ${error.message}`,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);
