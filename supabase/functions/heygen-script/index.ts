
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle the heygen script formatting request
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    
    // Validate that emailBody is provided and is a non-empty string
    if (!requestData.hasOwnProperty('emailBody')) {
      return new Response(
        JSON.stringify({ error: "emailBody is required." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (typeof requestData.emailBody !== 'string') {
      return new Response(
        JSON.stringify({ error: "emailBody must be a string." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { emailBody } = requestData;
    
    // Check if emailBody is empty
    if (!emailBody.trim()) {
      return new Response(
        JSON.stringify({ error: "emailBody cannot be empty." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Processing HeyGen script format request`);
    console.log(`Email body length: ${emailBody.length} chars`);

    // Format the email into a HeyGen-ready script
    const videoScript = formatEmailToVideoScript(emailBody);
    console.log(`Formatted script: ${videoScript}`);

    return new Response(
      JSON.stringify({ videoScript }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in heygen-script function:', error);
    return new Response(
      JSON.stringify({ error: `Error processing HeyGen script request: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

// Helper function to format email content into a video script
function formatEmailToVideoScript(emailBody: string): string {
  // Remove email formatting elements like signatures
  let script = emailBody
    .replace(/\r\n/g, '\n')  // Normalize line breaks
    .replace(/^>.*$/gm, '')  // Remove quoted text lines
    .split('\n')
    .filter(line => !line.match(/^(From|To|Subject|Date|Sent|Cc|Bcc):/i))  // Remove email headers
    .join(' ')
    .replace(/\s{2,}/g, ' ');  // Replace multiple spaces with a single space
  
  // Extract the first name if a greeting is present
  const nameMatch = script.match(/^(Dear|Hi|Hello|Hey)\s+([A-Za-z]+)/i);
  const firstName = nameMatch ? nameMatch[2] : '';
  
  // Start with a friendly greeting using the first name
  let videoScript = '';
  if (firstName) {
    videoScript = `Hey ${firstName}, `;
    
    // Remove the greeting from the script to avoid repetition
    script = script.replace(/^(Dear|Hi|Hello|Hey)\s+[A-Za-z]+[,.]?\s+/i, '');
  }
  
  // Condense the content to make it more conversational and shorter
  videoScript += script
    .replace(/(\.|!|\?)\s+/g, '$1 ')  // Normalize spacing after punctuation
    .replace(/\b(I wanted to|I am writing to|I hope this email finds you well|Thank you for your email)\b/gi, '')
    .replace(/\b(please find attached|see attachment|attached is|attached please find)\b/gi, 'I\'ve sent you')
    .replace(/\b(don't hesitate to|please feel free to)\b/gi, 'feel free to')
    .replace(/\b(I look forward to)\b/gi, 'looking forward to')
    .trim();
  
  // Add a time constraint note for HeyGen
  videoScript += " [<60s]";
  
  // Add a call-to-action if not already present
  if (!videoScript.match(/\b(call|contact|reach out|email|reply|respond)\b/i)) {
    videoScript += ", CTA: please let me know your thoughts";
  }
  
  return videoScript;
}

serve(handler);
