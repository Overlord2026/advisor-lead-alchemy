
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAvailableProviders, getConnectedCalendars } from "../../../src/utils/calendar/calendarManagement.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock email templates (in a real implementation, these would come from a database)
const availableTemplates = [
  "Right-Fit Thank-You", 
  "Post-Call Recap", 
  "Meeting Follow-up",
  "Onboarding Welcome",
  "Discovery Questions"
];

interface HealthCheckRequest {
  checkCalendar?: boolean;
  checkGmail?: boolean;
  checkDrive?: boolean;
  checkOpenAI?: boolean;
  checkTemplates?: string[];
}

// New simplified response format as per requirements
interface HealthCheckResponse {
  calendar?: string;
  gmail?: string;
  drive?: string;
  openAI?: string;
  templates?: Record<string, string>;
}

// Handle the health check request
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { checkCalendar, checkGmail, checkDrive, checkOpenAI, checkTemplates } = await req.json() as HealthCheckRequest;
    
    const response: HealthCheckResponse = {};
    
    // Check Calendar integration
    if (checkCalendar) {
      try {
        // In a real implementation, we would actually check connectivity to the calendar service
        const connectedCalendars = getConnectedCalendars();
        const providers = getAvailableProviders();
        
        response.calendar = connectedCalendars.length > 0 ? "OK" : "ERROR";
      } catch (error) {
        console.error('Calendar check error:', error);
        response.calendar = "ERROR";
      }
    }
    
    // Check Gmail integration
    if (checkGmail) {
      // Mock Gmail check - in real implementation, this would check actual Gmail connectivity
      response.gmail = Math.random() > 0.2 ? "OK" : "ERROR";
    }
    
    // Check Drive integration
    if (checkDrive) {
      // Mock Drive check - in real implementation, this would check actual Drive connectivity
      response.drive = Math.random() > 0.1 ? "OK" : "ERROR";
    }
    
    // Check OpenAI integration
    if (checkOpenAI) {
      // Mock OpenAI check - in real implementation, this would check actual OpenAI API connectivity
      response.openAI = Math.random() > 0.05 ? "OK" : "ERROR";
    }
    
    // Check if specified templates exist
    if (checkTemplates && checkTemplates.length > 0) {
      response.templates = {};
      
      checkTemplates.forEach(templateName => {
        const exists = availableTemplates.includes(templateName);
        response.templates![templateName] = exists ? "found" : "not found";
      });
    }
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in health-check function:', error);
    return new Response(JSON.stringify({
      error: `Error processing health check: ${error.message}`,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);
