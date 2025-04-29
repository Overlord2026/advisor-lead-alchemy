
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle the questionnaire recommendation requests
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log(`Processing questionnaire recommendation request:`, requestData);
    
    // Validate summaryBullets is provided and is an array
    if (!requestData.hasOwnProperty('summaryBullets')) {
      return new Response(
        JSON.stringify({ error: "summaryBullets is required." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!Array.isArray(requestData.summaryBullets)) {
      return new Response(
        JSON.stringify({ error: "summaryBullets must be an array of strings." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate all summary bullets are strings
    for (const bullet of requestData.summaryBullets) {
      if (typeof bullet !== 'string') {
        return new Response(
          JSON.stringify({ error: "summaryBullets must be an array of strings." }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate responseData is provided and is an object
    if (!requestData.hasOwnProperty('responseData') || typeof requestData.responseData !== 'object' || requestData.responseData === null) {
      return new Response(
        JSON.stringify({ error: "responseData is required and must be an object." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { summaryBullets, responseData } = requestData;
    
    // Generate recommendations based on the summary bullets and response data
    const recommendations = analyzeAndRecommend(summaryBullets, responseData);
    console.log(`Generated recommendations:`, recommendations);
    
    return new Response(
      JSON.stringify(recommendations),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in questionnaire-recommend function:', error);
    return new Response(
      JSON.stringify({ error: `Error processing questionnaire recommendation request: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

// Function to analyze summary bullets and response data and generate recommendations
function analyzeAndRecommend(summaryBullets: string[], responseData: Record<string, any>): Array<{questionId: string, action: 'add' | 'remove', explanation: string}> {
  const recommendations = [];
  
  // Identify key topics from summary bullets
  const topics = extractTopics(summaryBullets);
  console.log(`Extracted topics:`, topics);
  
  // Identify gaps in information based on standard topics for financial questionnaires
  if (topics.includes('retirement')) {
    // If they mentioned retirement as a goal but haven't answered retirement timeline questions
    if (!responseData.hasOwnProperty('Q5') && !topics.includes('timeline')) {
      recommendations.push({
        questionId: "Q5",
        action: "add",
        explanation: "Client mentioned retirement goals but timeline information is missing. Adding question about expected retirement age would help with planning."
      });
    }
  }
  
  if (topics.includes('assets') && !topics.includes('risk')) {
    // If they mentioned assets but no risk tolerance information
    recommendations.push({
      questionId: "Q7",
      action: "add",
      explanation: "Client disclosed asset amounts but risk tolerance information is needed to develop appropriate investment strategy."
    });
  }
  
  // Check for irrelevant questions based on responses
  if (responseData.Q2 === "No") {
    recommendations.push({
      questionId: "Q2",
      action: "remove",
      explanation: "Client indicated no interest in this area, so follow-up questions on this topic can be removed to streamline the questionnaire."
    });
  }
  
  // Recommend removing duplicate or redundant questions
  const redundantPairs = findRedundantQuestions(responseData);
  for (const [q1, q2] of redundantPairs) {
    recommendations.push({
      questionId: q2,
      action: "remove",
      explanation: `Question appears redundant with ${q1} based on client responses. Removing to improve questionnaire flow.`
    });
  }
  
  return recommendations;
}

// Extract key financial topics from summary bullets
function extractTopics(bullets: string[]): string[] {
  const topicKeywords = {
    'retirement': ['retire', 'retirement', 'pension'],
    'assets': ['assets', '$', 'money', 'savings', 'portfolio'],
    'income': ['income', 'salary', 'earnings'],
    'risk': ['risk', 'tolerance', 'conservative', 'aggressive'],
    'timeline': ['timeline', 'years', 'age', 'when']
  };
  
  const detectedTopics = new Set<string>();
  
  bullets.forEach(bullet => {
    const lowerBullet = bullet.toLowerCase();
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => lowerBullet.includes(keyword))) {
        detectedTopics.add(topic);
      }
    });
  });
  
  return Array.from(detectedTopics);
}

// Find potentially redundant questions based on similar responses
function findRedundantQuestions(responseData: Record<string, any>): [string, string][] {
  const redundantPairs: [string, string][] = [];
  
  // This is a simplified logic that would be more sophisticated in a real system
  // It's checking for questions that might be very similar based on having the same answers
  const questionIds = Object.keys(responseData);
  
  // Simple heuristic for demo purposes - in real life this would use more advanced techniques
  for (let i = 0; i < questionIds.length; i++) {
    for (let j = i + 1; j < questionIds.length; j++) {
      const q1 = questionIds[i];
      const q2 = questionIds[j];
      
      // Consider questions with identical answers as potentially redundant
      // This is a very simplified example - real logic would be more sophisticated
      if (responseData[q1] === responseData[q2] && 
          // Only suggest removing follow-up questions (higher numbers)
          parseInt(q1.substring(1)) < parseInt(q2.substring(1))) {
        redundantPairs.push([q1, q2]);
      }
    }
  }
  
  return redundantPairs;
}

serve(handler);
