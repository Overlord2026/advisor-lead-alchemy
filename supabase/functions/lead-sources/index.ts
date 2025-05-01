
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

    switch (req.method) {
      case "GET": {
        // Get all lead sources or filter by ID
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        
        let query = supabase.from("lead_sources").select("*");
        
        if (id) {
          query = query.eq("id", id);
        }
        
        const { data, error } = await query.order("created_at", { ascending: false });
        
        if (error) {
          throw error;
        }
        
        return new Response(JSON.stringify({ data }), { 
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200 
        });
      }
      
      case "POST": {
        // Create new lead source
        const { name, source_type, config, credentials, is_active } = await req.json();
        
        const { data, error } = await supabase
          .from("lead_sources")
          .insert({
            name,
            source_type,
            config: config || {},
            credentials: credentials || {},
            is_active: is_active !== undefined ? is_active : true,
          })
          .select("*")
          .single();
        
        if (error) {
          throw error;
        }
        
        return new Response(JSON.stringify({ data }), { 
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 201 
        });
      }
      
      case "PUT": {
        // Update existing lead source
        const { id, name, source_type, config, credentials, is_active } = await req.json();
        
        if (!id) {
          return new Response(JSON.stringify({ error: "ID is required" }), { 
            headers: { "Content-Type": "application/json", ...corsHeaders },
            status: 400 
          });
        }
        
        const updates: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };
        
        if (name !== undefined) updates.name = name;
        if (source_type !== undefined) updates.source_type = source_type;
        if (config !== undefined) updates.config = config;
        if (credentials !== undefined) updates.credentials = credentials;
        if (is_active !== undefined) updates.is_active = is_active;
        
        const { data, error } = await supabase
          .from("lead_sources")
          .update(updates)
          .eq("id", id)
          .select("*")
          .single();
        
        if (error) {
          throw error;
        }
        
        return new Response(JSON.stringify({ data }), { 
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200 
        });
      }
      
      case "DELETE": {
        // Delete lead source
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        
        if (!id) {
          return new Response(JSON.stringify({ error: "ID is required" }), { 
            headers: { "Content-Type": "application/json", ...corsHeaders },
            status: 400 
          });
        }
        
        const { error } = await supabase
          .from("lead_sources")
          .delete()
          .eq("id", id);
        
        if (error) {
          throw error;
        }
        
        return new Response(JSON.stringify({ success: true }), { 
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200 
        });
      }
      
      default:
        return new Response(JSON.stringify({ error: "Method not allowed" }), { 
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 405 
        });
    }
  } catch (error) {
    console.error("Error processing lead-sources request:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500 
    });
  }
});
