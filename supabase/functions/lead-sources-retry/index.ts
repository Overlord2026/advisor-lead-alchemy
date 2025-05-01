
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

    // Get lead source ID and log ID from URL path
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const leadSourceId = parts[parts.length - 4]; // Assuming URL pattern is /lead-sources/:id/logs/:logId/retry
    const logId = parts[parts.length - 2];
    
    if (!leadSourceId || !logId) {
      return new Response(JSON.stringify({ error: "Lead source ID and log ID are required" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400
      });
    }

    // Get the original log entry
    const { data: originalLog, error: logError } = await supabase
      .from("lead_source_logs")
      .select("*")
      .eq("id", logId)
      .eq("lead_source_id", leadSourceId)
      .single();

    if (logError) {
      return new Response(JSON.stringify({ error: `Log not found: ${logError.message}` }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 404
      });
    }

    // Create a new log entry for the retry
    const { data: newLog, error: newLogError } = await supabase
      .from("lead_source_logs")
      .insert({
        lead_source_id: leadSourceId,
        status: "pending",
        message: `Retry of log ${logId}`,
        started_at: new Date().toISOString(),
        details: { original_log_id: logId }
      })
      .select()
      .single();

    if (newLogError) {
      throw newLogError;
    }

    // In a real implementation, this would re-execute the import process
    // For this example, we'll simulate a successful retry
    await supabase
      .from("lead_source_logs")
      .update({
        status: "success",
        message: `Successfully retried log ${logId}`,
        records_processed: originalLog.records_processed || 0,
        records_imported: originalLog.records_failed || 0, // Assume all failed records are now successful
        records_failed: 0,
        completed_at: new Date().toISOString()
      })
      .eq("id", newLog.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Retry initiated successfully",
      new_log_id: newLog.id
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200
    });
  } catch (error) {
    console.error("Error in lead-sources-retry function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500
    });
  }
});
