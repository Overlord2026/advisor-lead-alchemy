
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

    if (req.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 405 
      });
    }

    // Get lead source ID from URL path
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const leadSourceId = parts[parts.length - 2]; // Assuming URL pattern is /lead-sources/:id/logs
    
    if (!leadSourceId) {
      return new Response(JSON.stringify({ error: "Lead source ID is required" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400
      });
    }

    // Get pagination parameters
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;

    // Get logs for the specified lead source
    const { data: logs, error: logsError, count } = await supabase
      .from("lead_source_logs")
      .select("*", { count: "exact" })
      .eq("lead_source_id", leadSourceId)
      .order("started_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (logsError) {
      throw logsError;
    }

    return new Response(JSON.stringify({ 
      data: logs, 
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200
    });
  } catch (error) {
    console.error("Error in lead-sources-logs function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500
    });
  }
});
