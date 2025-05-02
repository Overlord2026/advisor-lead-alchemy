
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

    const { webhookId } = await req.json();

    if (!webhookId) {
      return new Response(JSON.stringify({ error: "Webhook ID is required" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400
      });
    }

    // Get the webhook
    const { data: webhook, error: webhookError } = await supabase
      .from("partner_webhooks")
      .select("*")
      .eq("id", webhookId)
      .single();

    if (webhookError) {
      return new Response(JSON.stringify({ error: `Webhook not found: ${webhookError.message}` }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 404
      });
    }

    // Get the lead source
    const { data: leadSource, error: leadSourceError } = await supabase
      .from("lead_sources")
      .select("*")
      .eq("id", webhook.lead_source_id)
      .single();

    if (leadSourceError) {
      return new Response(JSON.stringify({ error: `Lead source not found: ${leadSourceError.message}` }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 404
      });
    }

    try {
      // Send a test event to the webhook
      const response = await fetch(webhook.target_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_type: webhook.event_type,
          test: true,
          lead_source_id: leadSource.id,
          lead_source_name: leadSource.name,
          timestamp: new Date().toISOString()
        })
      });

      // Log the webhook test
      await supabase
        .from("lead_source_logs")
        .insert({
          lead_source_id: webhook.lead_source_id,
          status: response.ok ? "success" : "error",
          message: `Test webhook for event type ${webhook.event_type}: ${response.ok ? "Success" : "Failed"}`,
          details: { 
            webhook_id: webhook.id,
            event_type: webhook.event_type,
            status_code: response.status,
            status_text: response.statusText,
            is_test: true
          },
          completed_at: new Date().toISOString()
        });

      if (!response.ok) {
        return new Response(JSON.stringify({ 
          success: false, 
          message: `Webhook test failed: ${response.status} ${response.statusText}` 
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200 // Still return 200 to client, but with success:false
        });
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: `Webhook test successful. Event '${webhook.event_type}' sent to ${webhook.target_url}`
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200
      });
    } catch (fetchError) {
      // Log the webhook test failure
      await supabase
        .from("lead_source_logs")
        .insert({
          lead_source_id: webhook.lead_source_id,
          status: "error",
          message: `Test webhook for event type ${webhook.event_type}: Failed to connect`,
          details: { 
            webhook_id: webhook.id,
            event_type: webhook.event_type,
            error: fetchError.message,
            is_test: true
          },
          completed_at: new Date().toISOString()
        });

      return new Response(JSON.stringify({ 
        success: false, 
        message: `Failed to connect to webhook endpoint: ${fetchError.message}`
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200 // Still return 200 to client
      });
    }
  } catch (error) {
    console.error("Error in partner-webhook-test function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500
    });
  }
});
