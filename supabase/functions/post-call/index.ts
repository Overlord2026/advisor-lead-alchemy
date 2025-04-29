
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define response interface
interface PostCallResponse {
  recapBullets: string[];
  emailSubject: string;
  emailBody: string;
  videoScript: string;
}

// Handle the post-call follow-up request
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    
    // Validate that transcriptText is provided and is a string
    if (!requestData.hasOwnProperty('transcriptText')) {
      return new Response(
        JSON.stringify({ error: "transcriptText is required." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (typeof requestData.transcriptText !== 'string') {
      return new Response(
        JSON.stringify({ error: "transcriptText must be a string." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { transcriptText } = requestData;
    
    console.log(`Processing post-call follow-up request`);
    console.log(`Transcript text length: ${transcriptText.length} chars`);

    // Extract names from transcript
    const lines = transcriptText.split('\n');
    const names = new Set<string>();
    const nameRegex = /^([^:]+):/;
    
    lines.forEach(line => {
      const match = line.match(nameRegex);
      if (match) {
        names.add(match[1].trim());
      }
    });
    
    // Try to identify advisor and prospect names
    const nameArray = Array.from(names);
    const advisorName = nameArray[0] || "Your Advisor";
    const prospectName = nameArray.length > 1 ? nameArray[1] : "Client";
    
    // Extract key phrases for context
    const keyPhrases = extractKeyPhrases(transcriptText);
    console.log(`Extracted key phrases: ${keyPhrases.join(', ')}`);
    
    // Generate the response
    const followUpResponse: PostCallResponse = {
      recapBullets: [
        `Discussed financial goals with ${prospectName}`,
        `Reviewed current portfolio allocation`,
        `Identified concerns about retirement income`,
        `Discussed tax optimization strategies`,
        `Agreed to follow up with detailed retirement projection`
      ],
      emailSubject: `Follow-up from Our Financial Planning Discussion`,
      emailBody: `Dear ${prospectName},\n\nThank you for taking the time to meet with me today. I appreciate you sharing your financial situation and goals with me.\n\nAs we discussed, here are the key points we covered:\n\n1. Your primary goal of generating reliable retirement income\n2. Concerns about market volatility and portfolio protection\n3. Tax optimization strategies for your investment accounts\n4. The importance of estate planning in your overall financial strategy\n\nBased on our conversation, I'll prepare a detailed retirement income projection for our next meeting. This will include scenarios for different withdrawal strategies and tax considerations.\n\nIn the meantime, please don't hesitate to reach out if you have any questions or if there's anything else you'd like to discuss.\n\nI look forward to our next meeting.\n\nBest regards,\n\n${advisorName}`,
      videoScript: `Hi ${prospectName}, this is ${advisorName} following up on our conversation today.\n\nI wanted to thank you for sharing your financial concerns and goals with me. I understand that generating reliable retirement income is your top priority right now.\n\nAs promised, I'm working on those retirement projections for you, and I'll have them ready for our next meeting. The analysis will show you multiple scenarios for withdrawal strategies and how they might affect your tax situation.\n\nIn the meantime, I've sent you an email summarizing what we discussed. If you think of any other questions before our next meeting, please don't hesitate to reach out.\n\nThanks again for your time today, and I look forward to continuing our work together.`
    };

    return new Response(JSON.stringify(followUpResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in post-call function:', error);
    return new Response(JSON.stringify({
      error: `Error processing post-call follow-up request: ${error.message}`,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

// Helper function to extract key phrases from transcript
function extractKeyPhrases(transcript: string): string[] {
  // This is a simplified implementation
  // In a real-world scenario, this could use NLP or AI to extract key topics
  const financialTerms = [
    'retirement', 'investment', 'portfolio', 'risk', 'allocation', 
    'tax', 'estate', 'goals', 'planning', 'income'
  ];
  
  const phrases: string[] = [];
  const lowerTranscript = transcript.toLowerCase();
  
  financialTerms.forEach(term => {
    if (lowerTranscript.includes(term)) {
      phrases.push(term);
    }
  });
  
  return phrases;
}

serve(handler);
