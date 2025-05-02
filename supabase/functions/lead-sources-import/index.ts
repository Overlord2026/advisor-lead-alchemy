
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to send webhook notifications
async function sendWebhookNotifications(supabase, leadSourceId, eventType, payload) {
  try {
    // Find active webhooks for this lead source and event type
    const { data: webhooks, error: webhooksError } = await supabase
      .from("partner_webhooks")
      .select("*")
      .eq("lead_source_id", leadSourceId)
      .eq("event_type", eventType)
      .eq("is_active", true);

    if (webhooksError) {
      console.error(`Error fetching webhooks: ${webhooksError.message}`);
      return;
    }

    // Send notifications to all registered webhooks
    const webhookPromises = webhooks.map(async (webhook) => {
      try {
        const response = await fetch(webhook.target_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...payload,
            event_type: eventType,
            webhook_id: webhook.id,
            timestamp: new Date().toISOString()
          })
        });

        return {
          webhook_id: webhook.id,
          success: response.ok,
          status: response.status,
          response_text: await response.text().catch(() => "")
        };
      } catch (error) {
        return {
          webhook_id: webhook.id,
          success: false,
          error: error.message
        };
      }
    });

    // Wait for all webhook notifications to complete
    const results = await Promise.all(webhookPromises);
    
    // Log webhook results
    for (const result of results) {
      await supabase
        .from("lead_source_logs")
        .insert({
          lead_source_id: leadSourceId,
          status: result.success ? "success" : "error",
          message: `Webhook notification for ${eventType}: ${result.success ? "Success" : "Failed"}`,
          details: result,
          completed_at: new Date().toISOString()
        });
    }

    return results;
  } catch (error) {
    console.error(`Error sending webhook notifications: ${error.message}`);
    return [];
  }
}

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

    const { leadSourceId, data } = await req.json();

    if (!leadSourceId) {
      return new Response(JSON.stringify({ error: "Lead source ID is required" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400
      });
    }

    if (!Array.isArray(data) || data.length === 0) {
      return new Response(JSON.stringify({ error: "Import data must be a non-empty array" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 400
      });
    }

    // Get the lead source
    const { data: leadSource, error: sourceError } = await supabase
      .from("lead_sources")
      .select("*")
      .eq("id", leadSourceId)
      .single();

    if (sourceError) {
      return new Response(JSON.stringify({ error: `Lead source not found: ${sourceError.message}` }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 404
      });
    }

    // Get field mapping for this lead source
    const { data: mappingRow, error: mapError } = await supabase
      .from("partner_api_mappings")
      .select("mapping")
      .eq("lead_source_id", leadSourceId)
      .maybeSingle();
    
    // Default mapping if no custom mapping exists
    let fieldMap = {
      first_name: "firstName",
      last_name: "lastName",
      email: "email",
      phone: "phone"
    };
    
    // Use custom mapping if available
    if (mappingRow && mappingRow.mapping) {
      console.log("Using custom field mapping:", mappingRow.mapping);
      fieldMap = mappingRow.mapping as Record<string, string>;
    } else {
      console.log("No custom mapping found, using default mapping");
    }

    // Create a log entry
    const { data: log, error: logError } = await supabase
      .from("lead_source_logs")
      .insert({
        lead_source_id: leadSourceId,
        status: "pending",
        message: `Processing ${data.length} records`,
        started_at: new Date().toISOString(),
        records_processed: data.length
      })
      .select()
      .single();

    if (logError) {
      throw logError;
    }

    try {
      // Process records
      const recordsImported = [];
      const recordsFailed = [];
      const errors = [];

      for (const record of data) {
        try {
          // Extract prospect data using field mapping
          const prospect = {
            source: leadSource.name,
            lead_source_id: leadSourceId,
            metadata: record // Store the full record in metadata
          };
          
          // Apply field mapping
          for (const [systemField, partnerField] of Object.entries(fieldMap)) {
            if (partnerField && record[partnerField] !== undefined) {
              prospect[systemField] = record[partnerField];
            } else {
              // Use null as fallback for missing fields
              prospect[systemField] = null;
            }
          }

          // Insert the prospect
          const { data: insertedProspect, error: insertError } = await supabase
            .from("prospects")
            .insert(prospect)
            .select()
            .single();

          if (insertError) {
            recordsFailed.push(record);
            errors.push({ record, error: insertError.message });
          } else {
            recordsImported.push(insertedProspect);
            
            // Record 'imported' event for the prospect
            await supabase
              .from("prospect_events")
              .insert({
                prospect_id: insertedProspect.id,
                event_type: "imported"
              });
          }
        } catch (recordError) {
          recordsFailed.push(record);
          errors.push({ record, error: recordError.message });
        }
      }

      // Update the log
      await supabase
        .from("lead_source_logs")
        .update({
          status: recordsFailed.length === 0 ? "success" : "partial",
          message: `Imported ${recordsImported.length} of ${data.length} records`,
          records_imported: recordsImported.length,
          records_failed: recordsFailed.length,
          details: { errors },
          completed_at: new Date().toISOString()
        })
        .eq("id", log.id);

      // Update the last sync time for the lead source
      await supabase
        .from("lead_sources")
        .update({
          last_sync_at: new Date().toISOString()
        })
        .eq("id", leadSourceId);

      // Send webhook notifications for imported leads
      await sendWebhookNotifications(supabase, leadSourceId, "imported", {
        lead_source_id: leadSourceId,
        lead_source_name: leadSource.name,
        imported_count: recordsImported.length,
        failed_count: recordsFailed.length,
        total_count: data.length,
        prospects: recordsImported.map(p => ({ id: p.id, name: `${p.first_name} ${p.last_name}`.trim(), email: p.email }))
      });

      return new Response(JSON.stringify({ 
        success: true, 
        imported: recordsImported.length,
        failed: recordsFailed.length,
        log_id: log.id
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200
      });
    } catch (importError) {
      // Update the log with the error
      await supabase
        .from("lead_source_logs")
        .update({
          status: "error",
          message: "Import failed",
          error: importError.message,
          completed_at: new Date().toISOString()
        })
        .eq("id", log.id);

      throw importError;
    }
  } catch (error) {
    console.error("Error in lead-sources-import function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500
    });
  }
});
