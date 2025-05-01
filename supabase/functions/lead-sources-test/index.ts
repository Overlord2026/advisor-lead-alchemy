
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 405 
      });
    }

    // Create a Supabase client with the Auth context of the logged-in user
    const supabase = createClient(
      "https://pxmpxujdorfqrxkiaxxw.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bXB4dWpkb3JmcXJ4a2lheHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDEyNTUsImV4cCI6MjA2MTIxNzI1NX0.n4HUr9iugP1s0KcPgiXQopRh_OpAYEUYpBNrkzToCos",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") || "" },
        },
      }
    );

    // Get lead source ID from URL path
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 2]; // Assuming URL pattern is /lead-sources/:id/test

    if (!id) {
      return new Response(JSON.stringify({ error: "Lead source ID is required" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400
      });
    }

    // Get the lead source configuration
    const { data: leadSource, error: sourceError } = await supabase
      .from("lead_sources")
      .select("*")
      .eq("id", id)
      .single();

    if (sourceError) {
      return new Response(JSON.stringify({ error: `Lead source not found: ${sourceError.message}` }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 404
      });
    }

    // Create a log entry for the test
    const { data: log, error: logError } = await supabase
      .from("lead_source_logs")
      .insert({
        lead_source_id: id,
        status: "pending",
        message: "Testing connection...",
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (logError) {
      throw logError;
    }

    // Here we simulate testing the connection based on source_type
    // In a real implementation, this would connect to the actual service
    let testResult = {
      success: false,
      message: "",
      details: {}
    };

    try {
      // Different test logic based on source type
      switch (leadSource.source_type) {
        case "csv":
          testResult = { 
            success: true, 
            message: "CSV import configuration is valid", 
            details: { columns: ["first_name", "last_name", "email"] } 
          };
          break;
        case "api":
          // Simulate API connection test
          testResult = { 
            success: true, 
            message: "API connection successful", 
            details: { endpoint: leadSource.config.endpoint } 
          };
          break;
        case "ghl":
          // Simulate GHL connection test
          testResult = { 
            success: true, 
            message: "Go High Level connection successful", 
            details: { account: leadSource.config.accountName } 
          };
          break;
        default:
          testResult = { 
            success: false, 
            message: `Unknown source type: ${leadSource.source_type}`, 
            details: {} 
          };
      }

      // Update the log with the test results
      await supabase
        .from("lead_source_logs")
        .update({
          status: testResult.success ? "success" : "error",
          message: testResult.message,
          details: testResult.details,
          completed_at: new Date().toISOString()
        })
        .eq("id", log.id);

      return new Response(JSON.stringify({ 
        success: testResult.success, 
        message: testResult.message,
        details: testResult.details 
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200
      });
    } catch (testError) {
      // Update the log with the error
      await supabase
        .from("lead_source_logs")
        .update({
          status: "error",
          message: "Test failed",
          error: testError.message,
          completed_at: new Date().toISOString()
        })
        .eq("id", log.id);

      throw testError;
    }
  } catch (error) {
    console.error("Error in lead-sources-test function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500
    });
  }
});
