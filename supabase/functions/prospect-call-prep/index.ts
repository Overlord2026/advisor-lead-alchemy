
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define response interface
interface CallPrepResponse {
  summary: string;
  agenda: string[];
  riskProfile?: string;
  wealthProfile?: string;
  recommendedProducts?: string[];
  talkingPoints?: string[];
}

// Handle the prospect call prep request
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pathParts = url.pathname.split('/');
  
  // Extract prospect ID from URL path
  // Expected format: /prospect/:id/call-prep
  const prospectId = pathParts[2];

  if (!prospectId) {
    return new Response(
      JSON.stringify({ error: 'Prospect ID is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { bookingText } = await req.json();
    
    if (!bookingText) {
      return new Response(
        JSON.stringify({ error: 'Booking text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing call prep for prospect ID: ${prospectId}`);
    console.log(`Booking text: ${bookingText}`);

    // Extract information from booking text
    const nameMatch = bookingText.match(/Invitee: ([^\n]+)/);
    const emailMatch = bookingText.match(/Email: ([^\n]+)/);
    const timeMatch = bookingText.match(/Time: ([^\n]+)/);
    const goalsMatch = bookingText.match(/Goals: ([^\n]+)/);
    const assetsMatch = bookingText.match(/Assets: ([^\n$]+)/);

    // Prepare call prep response with extracted info
    const prospectName = nameMatch ? nameMatch[1] : "Unknown";
    const prospectEmail = emailMatch ? emailMatch[1] : "Unknown";
    const meetingTime = timeMatch ? timeMatch[1] : "Unknown";
    const goals = goalsMatch ? goalsMatch[1] : "Unknown";
    const assets = assetsMatch ? assetsMatch[1] : "Unknown";

    // For this demo, generate a response based on the extracted info
    // In a real implementation, this might involve AI analysis, database lookups, etc.
    const prepResponse: CallPrepResponse = {
      summary: `Meeting with ${prospectName} (${prospectEmail}) at ${meetingTime}. They have ${assets} in assets and are interested in ${goals}.`,
      agenda: [
        "Introduction and rapport building",
        "Discussion about retirement goals",
        "Portfolio review and recommendations",
        "Next steps and action items"
      ],
      riskProfile: "Moderate",
      wealthProfile: `Client has ${assets} in investable assets focusing on retirement income`,
      recommendedProducts: [
        "Dividend Growth Portfolio",
        "Municipal Bond Ladder",
        "Retirement Income Strategy Session"
      ],
      talkingPoints: [
        `Ask about specific timeline for retirement`,
        `Discuss current asset allocation and alignment with ${goals}`,
        `Inquire about other income sources in retirement`,
        `Explain tax implications of different withdrawal strategies`
      ]
    };

    return new Response(JSON.stringify(prepResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in prospect-call-prep function:', error);
    return new Response(JSON.stringify({
      error: `Error processing call prep request: ${error.message}`,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);
