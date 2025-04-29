
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

interface IntegrationStatus {
  name: string;
  status: 'operational' | 'degraded' | 'offline';
  details?: string;
  lastChecked: string;
}

interface TemplateCheckResult {
  name: string;
  exists: boolean;
}

interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'critical';
  message: string;
  timestamp: string;
  integrations: IntegrationStatus[];
  templates?: TemplateCheckResult[];
}

// Handle the health check request
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { checkCalendar, checkGmail, checkDrive, checkOpenAI, checkTemplates } = await req.json() as HealthCheckRequest;
    
    const timestamp = new Date().toISOString();
    const integrations: IntegrationStatus[] = [];
    let overallStatus: 'healthy' | 'degraded' | 'critical' = 'healthy';
    let offlineCount = 0;
    let checkedCount = 0;
    
    // Check Calendar integration
    if (checkCalendar) {
      checkedCount++;
      try {
        // In a real implementation, we would actually check connectivity to the calendar service
        const connectedCalendars = getConnectedCalendars();
        const providers = getAvailableProviders();
        
        integrations.push({
          name: 'Calendar',
          status: connectedCalendars.length > 0 ? 'operational' : 'degraded',
          details: connectedCalendars.length > 0 
            ? `${connectedCalendars.length} calendar(s) connected` 
            : 'No calendars connected',
          lastChecked: timestamp
        });
      } catch (error) {
        console.error('Calendar check error:', error);
        integrations.push({
          name: 'Calendar',
          status: 'offline',
          details: `Error: ${error.message}`,
          lastChecked: timestamp
        });
        offlineCount++;
      }
    }
    
    // Check Gmail integration
    if (checkGmail) {
      checkedCount++;
      // Mock Gmail check - in real implementation, this would check actual Gmail connectivity
      const gmailStatus = Math.random() > 0.2 ? 'operational' : 'degraded';
      integrations.push({
        name: 'Gmail',
        status: gmailStatus,
        details: gmailStatus === 'operational' ? 'Connected to Gmail API' : 'Limited access to Gmail API',
        lastChecked: timestamp
      });
      
      if (gmailStatus === 'degraded') {
        if (overallStatus === 'healthy') overallStatus = 'degraded';
      }
    }
    
    // Check Drive integration
    if (checkDrive) {
      checkedCount++;
      // Mock Drive check - in real implementation, this would check actual Drive connectivity
      const driveStatus = Math.random() > 0.1 ? 'operational' : 'offline';
      integrations.push({
        name: 'Drive',
        status: driveStatus,
        details: driveStatus === 'operational' ? 'Connected to Drive API' : 'Unable to access Drive API',
        lastChecked: timestamp
      });
      
      if (driveStatus === 'offline') {
        offlineCount++;
      }
    }
    
    // Check OpenAI integration
    if (checkOpenAI) {
      checkedCount++;
      // Mock OpenAI check - in real implementation, this would check actual OpenAI API connectivity
      const openAIStatus = Math.random() > 0.05 ? 'operational' : 'degraded';
      integrations.push({
        name: 'OpenAI',
        status: openAIStatus,
        details: openAIStatus === 'operational' ? 'Connected to OpenAI API' : 'Rate limited by OpenAI API',
        lastChecked: timestamp
      });
      
      if (openAIStatus === 'degraded') {
        if (overallStatus === 'healthy') overallStatus = 'degraded';
      }
    }
    
    let templateResults: TemplateCheckResult[] = [];
    
    // Check if specified templates exist
    if (checkTemplates && checkTemplates.length > 0) {
      templateResults = checkTemplates.map(templateName => {
        const exists = availableTemplates.includes(templateName);
        return {
          name: templateName,
          exists
        };
      });
      
      // Count missing templates
      const missingTemplates = templateResults.filter(t => !t.exists).length;
      
      if (missingTemplates > 0 && missingTemplates < templateResults.length) {
        if (overallStatus === 'healthy') overallStatus = 'degraded';
      } else if (missingTemplates === templateResults.length) {
        offlineCount++;
      }
    }
    
    // Determine overall status
    if (offlineCount > 0) {
      overallStatus = offlineCount === checkedCount ? 'critical' : 'degraded';
    }
    
    // Generate appropriate message based on status
    let statusMessage = 'All systems operational';
    if (overallStatus === 'degraded') {
      statusMessage = 'Some services are experiencing issues';
    } else if (overallStatus === 'critical') {
      statusMessage = 'Critical services are offline';
    }
    
    // Construct the response
    const response: HealthCheckResponse = {
      status: overallStatus,
      message: statusMessage,
      timestamp,
      integrations,
    };
    
    // Include template check results if requested
    if (checkTemplates && checkTemplates.length > 0) {
      response.templates = templateResults;
    }
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in health-check function:', error);
    return new Response(JSON.stringify({
      status: 'critical',
      message: `Error processing health check: ${error.message}`,
      timestamp: new Date().toISOString(),
      integrations: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);
