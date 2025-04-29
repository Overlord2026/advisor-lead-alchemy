
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAvailableProviders, getConnectedCalendars } from "../../../src/utils/calendar/calendarManagement.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConnectorsRequest {
  connectors: string[];
}

// Handle connector health check requests
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { connectors } = await req.json() as ConnectorsRequest;
    
    if (!connectors || !Array.isArray(connectors)) {
      return new Response(
        JSON.stringify({ error: "connectors must be an array of strings" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Checking health for connectors:`, connectors);
    
    // Create response object with health status for each connector
    const response: Record<string, string> = {};
    
    // Get available calendar providers and connected calendars for calendar checks
    const calendarProviders = getAvailableProviders();
    const connectedCalendars = getConnectedCalendars();
    
    // Get practice management integrations
    const practiceManagementIntegrations = [
      { provider: 'advyzon', connected: Math.random() > 0.3 },
      { provider: 'salesforce', connected: Math.random() > 0.3 },
      { provider: 'wealthfront', connected: Math.random() > 0.3 },
      { provider: 'ghl', connected: true },
    ];
    
    // Check each connector
    for (const connector of connectors) {
      // Normalize connector name to lowercase for case-insensitive matching
      const normalizedConnector = connector.toLowerCase();
      
      switch (normalizedConnector) {
        // Email connectors
        case 'gmail':
        case 'outlook':
          // Simulated check with higher success rate (90%)
          response[connector] = Math.random() > 0.1 ? "OK" : "ERROR";
          break;
          
        // Calendar connectors  
        case 'googlecalendar':
        case 'office365calendar':
          // Check if this calendar provider exists and is connected
          const calendarProvider = normalizedConnector.includes('google') ? 'google' : 'office365';
          const isProviderAvailable = calendarProviders.some(p => p.id.includes(calendarProvider));
          const isCalendarConnected = connectedCalendars.some(c => c.provider.includes(calendarProvider));
          
          response[connector] = (isProviderAvailable && isCalendarConnected) ? "OK" : "ERROR";
          break;
          
        // Practice management connectors  
        case 'advizon':
        case 'salesforce':
        case 'wealthfront':
          // Check if this integration exists and is connected
          const integration = practiceManagementIntegrations.find(i => 
            i.provider.toLowerCase().includes(normalizedConnector.replace('wealthfront', 'wealthbox'))
          );
          
          response[connector] = integration?.connected ? "OK" : "ERROR";
          break;
          
        // Document storage connectors  
        case 'drive':
          // Simulated check (85% success rate)
          response[connector] = Math.random() > 0.15 ? "OK" : "ERROR";
          break;
          
        // AI connectors  
        case 'openai':
          // Simulated check with high reliability (95% success rate)
          response[connector] = Math.random() > 0.05 ? "OK" : "ERROR";
          break;
          
        default:
          // Unknown connector
          response[connector] = "ERROR";
      }
    }
    
    console.log(`Health check results:`, response);
    
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in diagnostics-connectors function:', error);
    return new Response(
      JSON.stringify({ error: `Error processing connector health check: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
