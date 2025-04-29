import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define response interface with all required fields
interface CallPrepResponse {
  summaryBullets: string[];
  emailSubject: string;
  emailBody: string;
  videoScript: string;
  
  // Keep the original fields for backward compatibility
  summary?: string;
  agenda?: string[];
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

  try {
    const { bookingText } = await req.json();
    
    // Validate input using the exact error message format requested
    if (!bookingText || bookingText.trim() === '') {
      return new Response(
        JSON.stringify({ 
          error: "bookingText is empty; cannot extract prospect details." 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing call prep request`);
    console.log(`Booking text: ${bookingText}`);

    // Extract information from booking text
    const nameMatch = bookingText.match(/Invitee: ([^\n]+)/);
    const emailMatch = bookingText.match(/Email: ([^\n]+)/);
    const timeMatch = bookingText.match(/Time: ([^\n]+)/);
    const goalsMatch = bookingText.match(/Goals: ([^\n]+)/);
    const assetsMatch = bookingText.match(/Assets: ([^\n$]+)/);

    // Check for missing key information and use defaults if necessary
    const prospectName = nameMatch ? nameMatch[1] : "Prospect";
    const prospectEmail = emailMatch ? emailMatch[1] : "prospect@example.com";
    const meetingTime = timeMatch ? timeMatch[1] : "Upcoming meeting";
    const goals = goalsMatch ? goalsMatch[1] : "financial planning";
    const assets = assetsMatch ? assetsMatch[1] : "unspecified amount";

    // Create the meeting summary
    const meetingSummary = `Meeting with ${prospectName} (${prospectEmail}) at ${meetingTime}. They have ${assets} in investable assets and are interested in ${goals}.`;
    
    // Generate the response with all required fields
    const prepResponse: CallPrepResponse = {
      // New required fields
      summaryBullets: [
        `Client: ${prospectName} has ${assets} in investable assets`,
        `Primary goal: ${goals}`,
        `Meeting scheduled for: ${meetingTime}`,
        `Risk profile assessment needed`,
        `Prepare retirement income analysis`
      ],
      emailSubject: `Follow-up: Our Discussion About ${goals} - Next Steps`,
      emailBody: `Dear ${prospectName},\n\nThank you for taking the time to meet with me today to discuss your financial goals around ${goals}.\n\nBased on your current assets of ${assets} and retirement objectives, I've outlined a preliminary strategy that focuses on generating sustainable income while preserving your principal.\n\nI've attached a summary document with the options we discussed, including:\n\n1. Dividend-focused portfolio allocation\n2. Municipal bond ladder strategy\n3. Projected income scenarios\n\nI'll follow up early next week to schedule our next meeting where we can review these options in more detail.\n\nPlease don't hesitate to reach out if you have any questions in the meantime.\n\nBest regards,\n\nYour Financial Advisor`,
      videoScript: `Hi ${prospectName}, this is Your Financial Advisor following up on our conversation about your retirement income goals.\n\nI wanted to personally thank you for sharing your financial situation with me and trusting us with your ${assets} in investable assets.\n\nBased on our discussion about ${goals}, I've prepared three potential strategies that could help you generate the reliable income you're looking for while preserving your principal.\n\nI'm particularly excited about the dividend growth approach we discussed, which has helped several of my clients in similar situations achieve 4-5% annual income with moderate growth potential.\n\nI've sent you an email with more details, and I look forward to our next conversation where we can dive deeper into these options.\n\nThanks again, and please call me directly if you have any questions before our next meeting.`,
      
      // Keep original fields for backward compatibility
      summary: meetingSummary,
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
