
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

    const supabase = createClient(
      "https://pxmpxujdorfqrxkiaxxw.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bXB4dWpkb3JmcXJ4a2lheHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDEyNTUsImV4cCI6MjA2MTIxNzI1NX0.n4HUr9iugP1s0KcPgiXQopRh_OpAYEUYpBNrkzToCos",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") || "" },
        },
      }
    );

    // Apply RLS policies for partner_api_mappings
    await supabase.rpc('apply_rls_policy', {
      table_name: 'partner_api_mappings',
      policy_name: 'own_data',
      using_expr: 'lead_source_id = auth.uid()',
      with_check_expr: 'lead_source_id = auth.uid()',
    });

    // Apply RLS policies for partner_webhooks
    await supabase.rpc('apply_rls_policy', {
      table_name: 'partner_webhooks',
      policy_name: 'own_data',
      using_expr: 'lead_source_id = auth.uid()',
      with_check_expr: 'lead_source_id = auth.uid()',
    });

    // Apply RLS policies for prospect_events
    await supabase.rpc('apply_rls_policy', {
      table_name: 'prospect_events',
      policy_name: 'own_data',
      using_expr: 'prospect_id IN (SELECT id FROM public.prospects WHERE lead_source_id = auth.uid())',
      with_check_expr: 'prospect_id IN (SELECT id FROM public.prospects WHERE lead_source_id = auth.uid())',
    });

    // Apply RLS policies for prospects
    await supabase.rpc('apply_rls_policy', {
      table_name: 'prospects',
      policy_name: 'own_data',
      using_expr: 'lead_source_id = auth.uid()',
      with_check_expr: 'lead_source_id = auth.uid()',
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200
    });
  } catch (error) {
    console.error("Error applying RLS policies:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500
    });
  }
});
